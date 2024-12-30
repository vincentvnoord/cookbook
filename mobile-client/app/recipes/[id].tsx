import { getRecipeDetailsController } from "@/src/controllers/recipes/get-recipe-details.controller";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { Clock, Edit, MinusIcon, PlusIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Animated, Button, Image, Pressable, Text, View, Modal, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { EditableElement } from "./_components/EditableElement";
import React from "react";

export default function RecipeScreen() {
    const { id, title, image } = useLocalSearchParams();
    const navigation = useNavigation();

    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        navigation.setOptions({
            title: title,
        })

        const getDetails = async () => {
            const recipe = await getRecipeDetailsController(id as string);
            setRecipe(recipe);
        }

        getDetails();
    }, [id]);

    return (
        <Animated.ScrollView>
            <View className="flex-1 pb-32 bg-white">
                <View className="w-full max-h-48 bg-slate-300 justify-center items-center rounded-b-3xl shadow-lg shadow-black overflow-hidden">
                    <Image className="object-cover w-full h-full" source={typeof image === 'string' ? { uri: image } : undefined} />
                </View>
                <View className="p-6 flex-grow flex flex-col gap-4">
                    <View className="flex justify-between items-center flex-row w-full gap-4">
                        <View className="flex flex-row gap-2">
                            <Clock size={24} color={"black"} />
                            <EditableElement editElement={<Text>120 minutes</Text>}>
                                <Text className="text-lg opacity-80">120 minutes</Text>
                            </EditableElement>
                        </View>
                        <EditableElement editElement={<EditableServings initialServings={4} />}>
                            <View className="flex z-50 p-2 rounded-lg flex-row gap-2">
                                <Text className="text-lg opacity-80">{4} servings</Text>
                            </View>
                        </EditableElement>
                    </View>

                    <View className="w-full gap-2">
                        <Text className="text-xl font-semibold">Ingredients</Text>
                        <View className="flex items-center flex-wrap flex-row gap-1">
                            {recipe?.ingredients.map((ingredient, index) => <Ingredient key={index} ingredient={ingredient} />)}
                        </View>
                    </View>

                    <View className="flex flex-grow w-full gap-2">
                        <Text className="text-xl font-semibold">Directions</Text>
                        <View className="flex flex-grow flex-col">
                            {recipe?.instructions.map((step, index) => <InstructionStep key={index} index={index + 1} step={step} />)}
                        </View>
                    </View>
                </View>
            </View>
        </Animated.ScrollView>
    )
}

const EditableServings = ({ initialServings }: { initialServings: number }) => {
    const [servings, setServings] = useState(initialServings);

    const removeServing = () => {
        setServings((prev) => Math.max(prev - 1, 1));
    };

    const addServing = () => {
        setServings((prev) => Math.min(prev + 1, 10));
    };

    return (
        <View onTouchStart={() => console.log("touch start")} className="flex items-center rounded-lg flex-col gap-2">
            <Text className="text-xl font-semibold opacity-80">Servings</Text>
            <View className="flex flex-row items-center gap-4 p-3">
                <TouchableOpacity activeOpacity={0.5} onPress={removeServing}>
                    <MinusIcon size={48} strokeWidth={1} color={"black"} />
                </TouchableOpacity>
                <Text className="text-5xl opacity-80">{servings}</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={addServing}>
                    <PlusIcon size={48} color={"black"} strokeWidth={1} />
                </TouchableOpacity>
            </View>
        </View>
    );
};


const Ingredient = ({ ingredient }: { ingredient: string }) => {

    return (
        <MotiView
            from={{ opacity: 0, translateY: 100 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', duration: 1000 }}
        >
            <EditableElement editElement={<EditableServings initialServings={4} />}>
                <View className="p-2 bg-gray-200 rounded-lg">
                    <Text className="">{ingredient}</Text>
                </View>
            </EditableElement>
        </MotiView>
    )
}

const InstructionStep = ({ index, step }: { index: number, step: string }) => {
    return (
        <EditableElement editElement={<Text>{step}</Text>}>
            <MotiView
                from={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', duration: 2000, delay: 100 * index }}
            >
                <View className="flex flex-row gap-2 border-b border-gray-200 py-2 pr-3">
                    <Text className="text-yellow-500 text-3xl font-semibold">{index}</Text>
                    <Text className="text-lg">{step}</Text>
                </View>
            </MotiView>
        </EditableElement>
    )
}