import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HomeIcon } from "lucide-react-native";
import { Text, View } from "react-native";

export default function ProfileScreen() {
    return (
        <ThemedView>
            <ThemedText type="title">Profile</ThemedText>
            <View className="h-full w-full justify-center items-center">
                <HomeIcon className="text-black" color={"black"} size={64} />
            </View>
        </ThemedView>
    );
}