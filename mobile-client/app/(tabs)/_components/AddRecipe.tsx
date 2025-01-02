import { Modal, View, Text, TextInput, Button, TouchableWithoutFeedback, Animated, Pressable, NativeSyntheticEvent, TextInputChangeEventData, Image } from "react-native";
import { Easing } from "react-native-reanimated";
import { CheckIcon, Loader, LoaderCircle, PlusIcon, XIcon } from "lucide-react-native";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { AddIngredients } from "./AddIngredients";
import { AddInstructions } from "./AddInstructions";
import { getRecipeFromUrlController } from "@/src/controllers/recipes/get-recipe-from-url.controller";
import { MotiView } from "moti";
import { cn } from "@/src/utils/tailwind";

type ExtractedRecipe = {
    name: string,
    ingredients: string[],
    instructions: string[],
    image?: string
}

export function AddRecipe({ addRecipe }: { addRecipe: (recipe: Recipe) => void }) {
    const [extracting, setExtracting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [extractedRecipe, setExtractedRecipe] = useState<ExtractedRecipe | null>(null);
    const [name, setName] = useState(extractedRecipe?.name ?? "");
    const [url, setUrl] = useState("");
    const [ingredients, setIngredients] = useState<string[]>(extractedRecipe?.ingredients ?? []);
    const [instructions, setInstructions] = useState<string[]>(extractedRecipe?.instructions ?? []);
    const [image, setImage] = useState("");

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

        setExtracting(true);
        try {
            const recipe = await getRecipeFromUrlController(url);
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
            image: image ? image : undefined,
            url: extractedRecipe ? url : undefined
        })

        clearFields();
    }

    const clearFields = () => {
        setName("");
        setUrl("");
        setIngredients([]);
        setInstructions([]);
        setImage("");
    }

    useEffect(() => {
        if (extractedRecipe) {
            setName(extractedRecipe.name);
            setIngredients(extractedRecipe.ingredients);
            setInstructions(extractedRecipe.instructions);
            setImage(extractedRecipe.image ?? "");
            setExtracting(false);
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
                                <Text className="text-3xl font-bold">New Recipe</Text>
                                <View className="flex flex-col gap-2">
                                    <TextInput value={url} onChange={onUrlChange} className="border-b" placeholder="URL (webpage)" />
                                    <CoolButton className="justify-center relative flex flex-row" disabled={extracting || url == ""} onPress={extractRecipeFromUrl}>
                                        <MotiView animate={extracting ? { opacity: 0 } : { opacity: 1 }} transition={{ type: "timing", duration: 100 }} >
                                            <Text className="text-white font-bold">
                                                Extract Recipe
                                            </Text>
                                        </MotiView>
                                        {/* Loader Circle with Rotation and Fade In/Out */}
                                        {
                                            extracting &&
                                            <MotiView
                                                from={{ translateY: 10, opacity: 0 }} // Initial state
                                                animate={{ translateY: 0, opacity: 1 }} // Final state
                                                className="absolute w-full h-full top-1/2 left-0 flex flex-row items-center justify-center"
                                                transition={{
                                                    type: "timing",
                                                    duration: 100,
                                                }}
                                                exit={{ translateY: 10, opacity: 0 }}
                                            >
                                                <MotiView
                                                    from={{ rotate: "0deg" }} // Initial state
                                                    className="absolute w-full h-full top-0 bottom-0 left-0 flex flex-row items-center justify-center"
                                                    animate={{
                                                        rotate: "360deg", // Add rotation
                                                    }}
                                                    transition={{
                                                        type: "timing",
                                                        duration: 1000,
                                                        loop: true,
                                                        repeatReverse: false,
                                                        easing: Easing.linear
                                                    }}
                                                >
                                                    <LoaderCircle size={24} color={"white"} />
                                                </MotiView>
                                            </MotiView>
                                        }
                                    </CoolButton>
                                </View>

                                <View className="flex flex-col gap-2">
                                    <View className="w-full flex flex-row gap-2">
                                        <View className="flex-grow">
                                            <Text className="text-lg">Name</Text>
                                            <TextInput value={name} onChange={onNameChange} className="border-b" placeholder="Name" />
                                        </View>
                                        <View className='w-32 rounded-lg h-32 bg-gray-200 overflow-hidden justify-center items-center relative'>
                                            <Image className='object-cover w-full h-full' source={{ uri: image ?? "" }} />
                                        </View>
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
                    <View className="flex flex-row justify-evenly pb-4">
                        <CoolButton className="rounded-full shadow bg-white border-slate-100" disabled={false} onPress={() => { setModalVisible(false); clearFields(); }}>
                            <XIcon size={60} color={"red"} />
                        </CoolButton>
                        <CoolButton className="rounded-full shadow border bg-white border-slate-100" disabled={extracting} onPress={() => { setModalVisible(false); submitAdd() }}>
                            <CheckIcon size={60} color={"green"} />
                        </CoolButton>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const CoolButton = ({ children, className, disabled = false, ...props }: { children: React.ReactNode, className?: string, disabled?: boolean, [key: string]: any }) => {
    const classes = cn("bg-blue-500 text-white p-3 rounded-lg", className);
    console.log(classes);
    return (
        <Pressable onPress={() => {
            if (disabled)
                return

            props.onPress(); console.log("pressed")
        }}>
            <MotiView animate={disabled ? { opacity: 0.5 } : { opacity: 1 }} transition={{ type: "timing", duration: 200 }} className={classes}>
                {children}
            </MotiView>
        </Pressable>
    )
}