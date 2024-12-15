package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/vincentvnoord/recipe-app/scraper"
)

func ScrapeRecipeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Scraping recipe...")
	url := r.URL.Query().Get("url")
	if url == "" {
		w.Header().Set("Content-Type", "application/json")
		http.Error(w, "Please provide a URL", http.StatusBadRequest)
		return
	}

	recipe, err := scraper.ScrapeRecipe(url)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	responseData, err := json.Marshal(recipe)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(responseData)
}
