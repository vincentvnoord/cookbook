import { addRecipeUseCase } from "@/src/application/use-cases/recipes/add-recipe.use-case";

export const addRecipeController = async (recipe: Recipe): Promise<void> => {
    await addRecipeUseCase(recipe);
}