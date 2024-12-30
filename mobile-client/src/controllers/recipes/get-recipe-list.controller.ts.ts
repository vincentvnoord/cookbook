import { getRecipeDetailsUseCase } from "@/src/application/use-cases/recipes/get-recipe-details.use-case";
import { getRecipeListUseCase } from "@/src/application/use-cases/recipes/get-recipe-list.use-case.ts";

function presenter(recipes: Recipe[]) {
    return recipes.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.name,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            url: recipe.url
        }
    })
}

export const getRecipeListController = async (): Promise<ReturnType<typeof presenter>> => {
    const recipe = await getRecipeListUseCase();
    return presenter(recipe);
}