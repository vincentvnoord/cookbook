import { StyleSheet, Image, Platform, View, Text, Button, Animated } from 'react-native';

import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { Link } from 'expo-router';
import { AddRecipe } from './_components/AddRecipe';
import { useEffect, useState } from 'react';
import { getRecipeListController } from '@/src/controllers/recipes/get-recipe-list.controller.ts';
import { addRecipeController } from '@/src/controllers/recipes/add-recipe.controller';

export default function RecipeListScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      const recipes = await getRecipeListController();
      setRecipes(recipes);
    }

    getRecipes();
  }, []);

  const addRecipe = async (recipe: Recipe) => {
    setRecipes([recipe, ...recipes]);
    console.log('Added recipe', recipe);
    try {
      await addRecipeController(recipe);
    } catch (error) {
      console.error('Failed to add recipe', error);
    }
  }

  return (
    <ThemedView className='p-6 pt-16 h-full flex flex-col gap-2'>
      <View className='flex flex-row justify-between pr-2'>
        <ThemedText type="title">Cookbook</ThemedText>
        <AddRecipe addRecipe={addRecipe} />
      </View>
      <Animated.ScrollView>
        <ThemedView className='flex flex-col gap-4'>
          <View className='flex flex-col gap-3'>
            {
              recipes.map((recipe, index) => (
                <RecipePreview key={index} recipe={recipe} />
              ))
            }
          </View>
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const RecipePreview = ({ recipe }: { recipe: Recipe }) => {
  const imgSource = 'https://bakerbynature.com/wp-content/uploads/2020/07/The-Best-Homemade-Lasagna-Recipe-54432111123456789-1-of-1-500x500.jpg';

  return (
    <Link href={`/recipes/${recipe.id}?title=${recipe.name}&image=${imgSource}`}>
      <ThemedView className='flex flex-row items-center gap-3'>
        <View className='w-16 rounded-lg h-16 bg-gray-200 overflow-hidden justify-center items-center relative'>
          <Image className='object-cover w-full h-full' source={{ uri: imgSource }} />
        </View>
        <ThemedView className='flex-grow'>
          <Text className="text-lg">{recipe.name}</Text>
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
