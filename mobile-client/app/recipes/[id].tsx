import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { Clock } from "lucide-react-native";
import { useEffect } from "react";
import { Animated, Image, Text, View } from "react-native";

const instructions = [
    "Preheat the oven to 350°F. Bring a large pot of salted water to a boil. Add the lasagna noodles and cook until al dente (firm) according to package directions. Drain, rinse under cold water, and set aside.",
    "Meanwhile, in a large skillet or Dutch oven, brown the beef, sausage, onion, and garlic over medium-high heat until no pink remains. Drain any fat.",
    "Stir in the pasta sauce, tomato paste, Italian seasoning, ½ teaspoon of salt, and ¼ teaspoon of black pepper. Simmer uncovered over medium heat for 5 minutes or until slightly thickened. Taste and season with additional salt if desired.",
    "In a separate medium bowl, combine 1 ½ cups mozzarella cheese, ¼ cup parmesan cheese, ricotta, parsley, egg, and ¼ teaspoon salt.",
    "Spread 1 cup of the meat sauce in a 9x13 pan or casserole dish. Top it with 3 lasagna noodles. Layer with ⅓ of the ricotta cheese mixture and 1 cup of meat sauce. Repeat twice more. Finish with 3 noodles topped with remaining sauce.",
    "Cover with foil and bake for 45 minutes.",
    "Remove the foil and sprinkle the top of the lasagna with the remaining 2 ½ cups mozzarella cheese and ¼ cup parmesan cheese. Bake uncovered for an additional 15 minutes or until browned and bubbly. Broil for 2-3 minutes if desired.",
    "Rest for at least 15 minutes before cutting."
];


export default function RecipeScreen() {
    const { id, title, image } = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: title,
        })

    }, [id]);

    return (
        <Animated.ScrollView>
            <View className="flex-1 pb-32 bg-white">
                <View className="w-full max-h-48 bg-slate-300 justify-center items-center rounded-b-3xl shadow-lg shadow-black overflow-hidden">
                    <Image className="object-cover w-full h-full" source={typeof image === 'string' ? { uri: image } : undefined} />
                </View>
                <View className="p-6 flex-grow flex flex-col gap-4">
                    <View className="flex flex-row w-full gap-4">
                        <View className="flex-col gap-2">
                            <View className="flex flex-row gap-2">
                                <Clock size={24} color={"black"} />
                                <Text className="text-lg opacity-80">120 minutes</Text>
                            </View>
                        </View>
                    </View>

                    <View className="w-full gap-2">
                        <Text className="text-xl font-semibold">Ingredients</Text>
                        <View className="flex items-center flex-wrap flex-row gap-1">
                            <Ingredient ingredient="12 lasagna noodles (uncooked)" />
                            <Ingredient ingredient="4 cups shredded mozzarella cheese (divided)" />
                            <Ingredient ingredient="3/4 teaspoon salt" />
                            <Ingredient ingredient="1/2 pound lean ground beef" />
                            <Ingredient ingredient="1/2 pound italian sausage" />
                            <Ingredient ingredient="1 yellow onion" />
                            <Ingredient ingredient="2 cloves garlic" />
                        </View>
                    </View>

                    <View className="flex flex-grow w-full gap-2">
                        <Text className="text-xl font-semibold">Directions</Text>
                        <View className="flex flex-grow flex-col">
                            {instructions.map((step, index) => <InstructionStep key={index} index={index + 1} step={step} />)}
                        </View>
                    </View>
                </View>
            </View>
        </Animated.ScrollView>
    )
}

const Ingredient = ({ ingredient }: { ingredient: string }) => {

    return (
        <View className="p-2 bg-gray-200 rounded-lg">
            <Text className="">{ingredient}</Text>
        </View>
    )
}

const InstructionStep = ({ index, step }: { index: number, step: string }) => {
    return (
        <View className="flex flex-row gap-2 border-b border-gray-200 py-2">
            <Text className="text-yellow-500 text-3xl font-semibold">{index}</Text>
            <Text className="text-lg">{step}</Text>
        </View>
    )
}