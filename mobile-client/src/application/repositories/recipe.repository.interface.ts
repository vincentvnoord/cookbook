
export const IRecipeRepositoryToken = Symbol.for("IRecipeRepository");

export interface IRecipeRepository {
    getRecipes(): Promise<Recipe[]>;
    getRecipeById(id: string): Promise<Recipe>;
    addRecipe(recipe: Recipe): Promise<void>;
    getRecipeFromUrl(url: string): Promise<Recipe>;
}