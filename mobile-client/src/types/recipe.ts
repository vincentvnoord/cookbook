export type TRecipe = {
    id: string;
    name: string;
    ingredients: string[];
    instructions: string[];
    url?: string;
}

export type TRecipeInstruction = {
    text: string;
}
