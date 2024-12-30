import dependencies from "@/src/di/injection";
import { IRecipeRepository, IRecipeRepositoryToken } from "../../repositories/recipe.repository.interface";

export async function getRecipeFromUrlUseCase(url: string) {
    const repository = dependencies.get<IRecipeRepository>(IRecipeRepositoryToken);
    return repository.getRecipeFromUrl(url);
}