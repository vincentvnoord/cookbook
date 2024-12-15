import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";


export default function RecipeScreen() {
    const { id } = useLocalSearchParams();

    return (
        <View className="pt-12">
            <Text>Recipe Screen, ID: {id}</Text>
        </View>
    )
}