package scraper

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gocolly/colly"
)

type Recipe struct {
	Name         string   `json:"name"`
	Ingredients  []string `json:"recipeIngredient"`
	Instructions []struct {
		Text string `json:"text"`
	} `json:"recipeInstructions"`
}

func toStringSlice(input interface{}) []string {
	var result []string
	switch v := input.(type) {
	case []interface{}:
		for _, item := range v {
			if str, ok := item.(string); ok {
				result = append(result, str)
			}
		}
	}
	return result
}

func ScrapeRecipe(url string) (*Recipe, error) {
	c := colly.NewCollector()

	c.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"

	c.OnRequest(func(r *colly.Request) {
		r.Headers.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
		r.Headers.Set("Accept-Language", "en-US,en;q=0.5")
		r.Headers.Set("Referer", "https://www.example.com")
	})

	var recipe Recipe
	foundRecipe := false

	c.OnHTML("script[type='application/ld+json']", func(e *colly.HTMLElement) {
		var singleData map[string]interface{}
		var arrayData []map[string]interface{}

		// Log the raw JSON for debugging
		fmt.Println("Raw JSON:", e.Text)

		// Try to unmarshal as an array
		err := json.Unmarshal([]byte(e.Text), &arrayData)
		if err == nil {
			// If unmarshaling as an array works
			for _, item := range arrayData {
				if processRecipe(item, &recipe, &foundRecipe) {
					return
				}
			}
		} else {
			// If unmarshaling as an array fails, try to unmarshal as a single object
			err = json.Unmarshal([]byte(e.Text), &singleData)
			if err == nil {
				// Check if @graph exists
				if graph, ok := singleData["@graph"].([]interface{}); ok {
					for _, graphItem := range graph {
						if graphObject, ok := graphItem.(map[string]interface{}); ok {
							if processRecipe(graphObject, &recipe, &foundRecipe) {
								return
							}
						}
					}
				} else {
					// Process the single object directly if not in @graph
					processRecipe(singleData, &recipe, &foundRecipe)
				}
			}
		}

		if err != nil {
			log.Println("JSON Parsing Error:", err)
		}
	})

	// Visit the recipe page
	err := c.Visit(url)
	if err != nil {
		return nil, err
	}

	// Display the extracted recipe details
	fmt.Println("Recipe Name:", recipe.Name)
	fmt.Println("Ingredients:", recipe.Ingredients)
	for _, instruction := range recipe.Instructions {
		fmt.Println("Instruction:", instruction.Text)
	}

	return &recipe, nil
}

// processRecipe extracts recipe details if the object contains @type Recipe
func processRecipe(data map[string]interface{}, recipe *Recipe, foundRecipe *bool) bool {
	if *foundRecipe {
		return true
	}

	if data["@type"] == "Recipe" {
		recipe.Name = data["name"].(string)
		recipe.Ingredients = toStringSlice(data["recipeIngredient"])

		// Handle recipe instructions
		if instructions, ok := data["recipeInstructions"].([]interface{}); ok {
			for _, instruction := range instructions {
				if step, ok := instruction.(map[string]interface{}); ok {
					if text, exists := step["text"].(string); exists {
						recipe.Instructions = append(recipe.Instructions, struct {
							Text string `json:"text"`
						}{Text: text})
					}
				}
			}
		}

		*foundRecipe = true
		return true
	}

	return false
}
