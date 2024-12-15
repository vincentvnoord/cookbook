import { StyleSheet, Image, Platform, View, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { PlusIcon } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

export default function RecipeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView className='flex flex-col gap-4'>
        <View className='flex flex-row justify-between pr-2'>
          <ThemedText type="title">Cookbook</ThemedText>
          <PlusIcon size={24} color={"black"} />
        </View>
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
    </ParallaxScrollView>
  );
}

const RecipePreview = ({ recipe }: { recipe: Recipe }) => {
  return (
    <ThemedView className='flex flex-row items-center gap-3'>
      <View className='w-16 rounded-lg h-16 bg-gray-200 overflow-hidden justify-center items-center relative'>
        <Image className='object-cover w-full h-full' source={require('@/assets/images/lasagna.jpg')} />
      </View>
      <ThemedView className='flex-grow'>
        <Text className="text-lg">{recipe.title}</Text>
        <Text className='text-sm opacity-50'>{recipe.url}</Text>
      </ThemedView>
    </ThemedView>
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
