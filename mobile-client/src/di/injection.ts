import { DependencyContainer } from "./container";
import { IRecipeRepository, IRecipeRepositoryToken } from "../application/repositories/recipe.repository.interface";
import { RecipeRepositoryMock } from "../infrastructure/repositories/recipes/recipemock.repository";

const dependencies = new DependencyContainer();

if (process.env.NODE_ENV === 'development') {
    dependencies.register<IRecipeRepository>(IRecipeRepositoryToken, new RecipeRepositoryMock());
}

if (process.env.NODE_ENV === 'production') {
}

export default dependencies;