import { getRecipeDetailsUseCase } from "@/src/application/use-cases/recipes/get-recipe-details.use-case";

function presenter(recipe: Recipe) {
    return {
        id: recipe.id,
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        url: recipe.url
    }
}

export const getRecipeDetailsController = async (id: string): Promise<ReturnType<typeof presenter>> => {
    const recipe = await getRecipeDetailsUseCase(id);
    return presenter(recipe);
}