import { useLayoutEffect } from "react";
import { FC } from "react";
import { View, StyleSheet, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MealItem from "../components/MealsList/MealItem";
import { CATEGORIES } from "../data/dummy-data";
// Define your screen's ParamList if using StackNavigator
type RootStackParamList = {
  Home: { userId: string };
  Details: { postId: number };
  // ...
};

// Define the screen's props interface
interface ScreenProps {
  route: RouteProp<RootStackParamList, 'MealsOverview'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'MealsOverview'>;
}
import { MEALS } from '../data/dummy-data';

const MealsOverviewScreen: FC<ScreenProps> = ({ route, navigation }) => {
  const categoryId = route?.params?.categoryId || "";

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(categoryId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <MealItem
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            affordability={item.affordability}
            complexity={item.complexity}
            duration={item.duration }
          />
        )}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
