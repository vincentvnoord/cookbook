import { IRecipeRepository } from "@/src/application/repositories/recipe.repository.interface";
import { DEV_API_URL } from "@/src/constants/api";

const instructions = [
    "Preheat the oven to 350°F. Bring a large pot of salted water to a boil. Add the lasagna noodles and cook until al dente (firm) according to package directions. Drain, rinse under cold water, and set aside.",
    "Meanwhile, in a large skillet or Dutch oven, brown the beef, sausage, onion, and garlic over medium-high heat until no pink remains. Drain any fat.",
    "Stir in the pasta sauce, tomato paste, Italian seasoning, ½ teaspoon of salt, and ¼ teaspoon of black pepper. Simmer uncovered over medium heat for 5 minutes or until slightly thickened. Taste and season with additional salt if desired.",
    "In a separate medium bowl, combine 1 ½ cups mozzarella cheese, ¼ cup parmesan cheese, ricotta, parsley, egg, and ¼ teaspoon salt.",
    "Spread 1 cup of the meat sauce in a 9x13 pan or casserole dish. Top it with 3 lasagna noodles. Layer with ⅓ of the ricotta cheese mixture and 1 cup of meat sauce. Repeat twice more. Finish with 3 noodles topped with remaining sauce.",
    "Cover with foil and bake for 45 minutes.",
    "Remove the foil and sprinkle the top of the lasagna with the remaining 2 ½ cups mozzarella cheese and ¼ cup parmesan cheese. Bake uncovered for an additional 15 minutes or until browned and bubbly. Broil for 2-3 minutes if desired.",
    "Rest for at least 15 minutes before cutting."
];

const recipes = new Map<string, Recipe>();
recipes.set("1", {
    id: "1",
    name: "Test Recipe",
    url: "http://test.com",
    ingredients: [
        "12 lasagna noodles (uncooked)",
        "4 cups shredded mozzarella cheese (divided)",
        "3/4 teaspoon salt",
        "1/2 pound lean ground beef",
        "1/2 pound italian sausage",
        "1 yellow onion",
        "2 cloves garlic",
    ],
    instructions: instructions
})

export class RecipeRepositoryMock implements IRecipeRepository {
    async getRecipeFromUrl(url: string): Promise<Recipe> {
        const response = await fetch(`${DEV_API_URL}?url=${encodeURIComponent(url)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get recipe from URL");
        }

        const recipe: Recipe = await response.json();
        console.log("RECIPE RESPONSE: ", recipe);
        return {
            id: "_",
            name: recipe.name,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            image: recipe.image,
        };
    }

    async addRecipe(recipe: Recipe): Promise<void> {
        if (recipes.has(recipe.id)) {
            throw new Error("Recipe ID already exists in test dictionary");
        }

        recipes.set(recipe.id, recipe);
    }

    getRecipes(): Promise<Recipe[]> {
        return new Promise((resolve, reject) => {
            resolve(Array.from(recipes.values()));
        })
    }

    getRecipeById(id: string): Promise<Recipe> {
        return new Promise((resolve, reject) => {
            resolve(recipes.get(id) as Recipe)
        });
    }
}