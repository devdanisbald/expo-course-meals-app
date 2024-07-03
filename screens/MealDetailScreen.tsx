import { useContext, useLayoutEffect, FC, useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import MealDetails from '../components/MealDetails'; 
import List from '../components/MealDetails/List';
import Subtitle from '../components/MealDetails/Subtitle';
import IconButton from "../components/IconButton";

import { FavoritesContext } from "../store/context/favorites-context";

import { MEALS } from '../data/dummy-data';
import Meal from "../models/meal";

// Define your screen's ParamList if using StackNavigator
type RootStackParamList = {
  Home: { userId: string };
  Details: { postId: number };
  // ...
};

// Define the screen's props interface
interface ScreenProps {
  route: RouteProp<RootStackParamList, 'MealDetail'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'MealDetail'>;
}


const MealDetailScreen: FC<ScreenProps> = ({ route, navigation }) => {
  const favoriteMealsCtx = useContext(FavoritesContext);
  const [selectedMeal, setSelectedMeal] = useState<Meal>();
  const [mealIsFavorite, setMealIsFavorite] = useState<boolean>(false);

  const changeFavoriteStatusHandler = () => {
    if (selectedMeal === undefined) return;
    if (mealIsFavorite) {
      favoriteMealsCtx.removeFavorite(selectedMeal?.id);
    } else {
      favoriteMealsCtx.addFavorite(selectedMeal?.id);
    }
    setMealIsFavorite(!mealIsFavorite);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? 'star' : 'star-outline'}
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        )
      }
    });
  }, [navigation, changeFavoriteStatusHandler]);

  useEffect(() => {
    const mealId = route?.params?.mealId || "";
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);
    if (selectedMeal === undefined) {
      // @ts-ignore
      navigation.navigate("MealsCategories");
    }
    setSelectedMeal(selectedMeal);
    if (favoriteMealsCtx.ids.includes(mealId)) setMealIsFavorite(true);
  }, [])

  if (selectedMeal === undefined) return null;

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal?.imageUrl }} />
      <Text style={styles.title}>{selectedMeal?.title}</Text>
      
      {selectedMeal && 
        <MealDetails
          duration={selectedMeal?.duration}
          complexity={selectedMeal?.complexity}
          affordability={selectedMeal?.affordability}
          textStyle={styles.detailText}
        />}
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  },
});
