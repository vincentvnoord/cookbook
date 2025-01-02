export type TRecipe = {
    id: string;
    name: string;
    ingredients: string[];
    instructions: string[];
    image?: string;
    url?: string;
}

export type TRecipeInstruction = {
    text: string;
}
