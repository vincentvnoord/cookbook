export type TRecipe = {
    url?: string;
    title: string;
    ingredients: string[];
    instructions: TRecipeInstruction[];
}

export type TRecipeInstruction = {
    text: string;
}
