import { Modal, View, Text, TextInput, Button, TouchableWithoutFeedback, Animated, Pressable, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PlusIcon } from "lucide-react-native";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { AddIngredients } from "./AddIngredients";
import { AddInstructions } from "./AddInstructions";
import { getRecipeFromUrlController } from "@/src/controllers/recipes/get-recipe-from-url.controller";

type ExtractedRecipe = {
    name: string,
    ingredients: string[],
    instructions: string[]
}

export function AddRecipe({ addRecipe }: { addRecipe: (recipe: Recipe) => void }) {
    const [modalVisible, setModalVisible] = useState(false);

    const [extractedRecipe, setExtractedRecipe] = useState<ExtractedRecipe | null>(null);
    const [name, setName] = useState(extractedRecipe?.name ?? "");
    const [url, setUrl] = useState("");
    const [ingredients, setIngredients] = useState<string[]>(extractedRecipe?.ingredients ?? ["Flour", "Sugar", "Eggs"]);
    const [instructions, setInstructions] = useState<string[]>(extractedRecipe?.instructions ?? ["Warm up the oven on 200 degrees", "Put the cake in the oven", "Wait for 30 minutes"]);

    const onNameChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        e.preventDefault();
        const text = e.nativeEvent.text;
        setName(text);
    }

    const onUrlChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        e.preventDefault();
        const text = e.nativeEvent.text;
        setUrl(text);
    }

    const extractRecipeFromUrl = async () => {
        if (url === "") {
            return;
        }

        try {
            const recipe = await getRecipeFromUrlController(url);
            console.log(recipe);
            setExtractedRecipe(recipe);
        } catch (error) {
            console.error('Failed to extract recipe', error);
        }
    }

    const submitAdd = () => {
        if (name === "") {
            return;
        }

        addRecipe({
            id: "2",
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            url: extractedRecipe ? url : ""
        })

        setName("");
        setUrl("");
        setIngredients([]);
        setInstructions([]);
    }

    useEffect(() => {
        if (extractedRecipe) {
            setName(extractedRecipe.name);
            setIngredients(extractedRecipe.ingredients);
            setInstructions(extractedRecipe.instructions);
        }
    }, [extractedRecipe]);

    return (
        <View>
            <Pressable onPress={() => { setModalVisible(true) }}>
                <PlusIcon size={24} color={"black"} />
            </Pressable>
            <Modal onRequestClose={() => setModalVisible(false)} animationType="slide" visible={modalVisible}>
                <View className="flex gap-4 flex-col h-full justify-between p-3">
                    <Animated.ScrollView>
                        <View className="flex p-3 flex-col justify-between">
                            <View className="flex flex-col gap-4">
                                <Text className="text-3xl font-bold">Add Recipe</Text>
                                <View className="flex flex-col gap-2">
                                    <TextInput value={url} onChange={onUrlChange} className="border-b" placeholder="URL (webpage)" />
                                    <Button onPress={extractRecipeFromUrl} title="Extract Recipe" />
                                </View>

                                <View className="flex flex-col gap-2">
                                    <View>
                                        <Text className="text-lg">Name</Text>
                                        <TextInput value={name} onChange={onNameChange} className="border-b" placeholder="Name" />
                                    </View>

                                    <View className="flex flex-col gap-1">
                                        <Text className="text-lg">Ingredients</Text>
                                        <AddIngredients onIngredientsChange={setIngredients} initialIngredients={ingredients} />
                                    </View>

                                    <View className="flex flex-col gap-1">
                                        <Text className="text-lg">Instructions</Text>
                                        <AddInstructions onInstructionsChange={setInstructions} initialInstruction={instructions} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Animated.ScrollView>
                    <View className="flex flex-row justify-between">
                        <CoolButton onPress={() => { setModalVisible(false) }}>
                            Cancel
                        </CoolButton>
                        <CoolButton onPress={() => { setModalVisible(false); submitAdd() }}>
                            Add
                        </CoolButton>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const CoolButton = ({ children, ...props }: { children: React.ReactNode, [key: string]: any }) => {


    return (
        <Pressable onPress={() => { props.onPress(); console.log("pressed") }}>
            <View className="bg-blue-500 p-3 rounded-lg">
                <Text>{children}</Text>
            </View>
        </Pressable>
    )
}