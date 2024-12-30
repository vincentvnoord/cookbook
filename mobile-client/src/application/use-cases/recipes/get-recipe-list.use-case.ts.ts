import dependencies from "@/src/di/injection";
import { IRecipeRepository, IRecipeRepositoryToken } from "../../repositories/recipe.repository.interface";

export async function getRecipeListUseCase() {
    const repository = dependencies.get<IRecipeRepository>(IRecipeRepositoryToken);
    return repository.getRecipes();
}