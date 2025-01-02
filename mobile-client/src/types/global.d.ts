import { TRecipe, TRecipeInstruction } from "./recipe";

declare global {
    type Recipe = TRecipe;
    type RecipeInstruction = TRecipeInstruction;
}