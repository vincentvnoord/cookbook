import { StyleSheet, Image, Platform, View, Text, Button, Animated } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { PlusIcon } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';

export default function RecipeListScreen() {
  return (
    <ThemedView className='p-6 pt-16 h-full flex flex-col gap-2'>
      <View className='flex flex-row justify-between pr-2'>
        <ThemedText type="title">Cookbook</ThemedText>
        <PlusIcon className='p-2' onPress={() => { console.log("Clicked add new recipe") }} size={24} color={"black"} />
      </View>
      <Animated.ScrollView>
        <ThemedView className='flex flex-col gap-4'>
          <View className='flex flex-col gap-3'>
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
            <RecipePreview recipe={{ title: 'Heerlijke lasagne', ingredients: [], instructions: [], url: "bestrecipes.com" }} />
          </View>
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const RecipePreview = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Link href={{ pathname: `/recipes/[id]`, params: { id: 'test' } }}>
      <ThemedView className='flex flex-row items-center gap-3'>
        <View className='w-16 rounded-lg h-16 bg-gray-200 overflow-hidden justify-center items-center relative'>
          <Image className='object-cover w-full h-full' source={require('@/assets/images/lasagna.jpg')} />
        </View>
        <ThemedView className='flex-grow'>
          <Text className="text-lg">{recipe.title}</Text>
          <Text className='text-sm opacity-50'>{recipe.url}</Text>
        </ThemedView>
      </ThemedView>
    </Link>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
