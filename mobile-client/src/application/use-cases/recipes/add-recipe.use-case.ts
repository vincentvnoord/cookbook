import dependencies from "@/src/di/injection";
import { IRecipeRepository, IRecipeRepositoryToken } from "../../repositories/recipe.repository.interface";

export async function addRecipeUseCase(recipe: Recipe) {
    const repository = dependencies.get<IRecipeRepository>(IRecipeRepositoryToken);
    return repository.addRecipe(recipe);
}