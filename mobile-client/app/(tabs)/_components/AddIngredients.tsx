import React, { useState, useEffect, useRef, SetStateAction } from "react";
import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Pressable } from "react-native";


export const AddIngredients = ({ initialIngredients, onIngredientsChange }: { initialIngredients?: string[], onIngredientsChange: (ingredients: string[]) => void; }) => {
    const [ingredients, setIngredients] = useState<string[]>(initialIngredients ?? []);
    const [newIngredient, setNewIngredient] = useState("");
    const [focusedIngredient, setFocusedIngredient] = useState(-1);

    const onNewIngredientChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        e.preventDefault();
        const text = e.nativeEvent.text;
        const newIngredients = [...ingredients, text];
        setIngredients(newIngredients);
        onIngredientsChange(newIngredients);

        setNewIngredient("");
        setFocusedIngredient(ingredients.length);
    }

    useEffect(() => {
        setIngredients(initialIngredients ?? []);
    }, [initialIngredients]);

    return (
        <>
            <View className="flex items-center flex-wrap flex-row gap-1">
                {ingredients.map((ingredient, index) => (<Ingredient key={index} focusedIngredient={focusedIngredient} index={index} ingredients={ingredients} setIngredients={setIngredients} />))}
            </View>
            <TextInput onChange={onNewIngredientChange} value={newIngredient} className="border-b" placeholder="New Ingredient" />
        </>
    )
}

const Ingredient = ({ index, focusedIngredient, ingredients, setIngredients }:
    {
        index: number,
        focusedIngredient: number,
        ingredients: string[],
        setIngredients: React.Dispatch<SetStateAction<string[]>>
    }) => {
    const input = useRef<TextInput>(null);

    useEffect(() => {
        if (focusedIngredient === index) {
            input.current?.focus();
        }
    }, [focusedIngredient, index]);

    const onIngredientChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = e.nativeEvent.text;
        ingredients[index] = text;
        setIngredients([...ingredients]);
    }

    const onIngredientBlur = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        e.preventDefault();
    }

    return (
        <Pressable onPress={() => { setIngredients(ingredients.filter((_, i) => i !== index)) }}>
            <View className="bg-slate-200 px-2 rounded-lg">
                <TextInput ref={input} value={ingredients[index]} onChange={onIngredientChange} />
            </View>
        </Pressable>
    )
}