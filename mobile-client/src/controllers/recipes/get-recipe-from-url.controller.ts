import { getRecipeFromUrlUseCase } from "@/src/application/use-cases/recipes/get-recipe-from-url.use-case";

function presenter(recipe: Recipe) {
    return {
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
    }
}

export const getRecipeFromUrlController = async (url: string): Promise<ReturnType<typeof presenter>> => {
    const recipe = await getRecipeFromUrlUseCase(url);
    return presenter(recipe);
}