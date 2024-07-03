import { FC } from "react";
import { View, FlatList, StyleSheet } from 'react-native';

import MealItem from './MealItem';
import Meal from "../../models/meal";

interface IProps {
  items: Meal[]
}

const MealsList: FC<IProps> = ({items}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <MealItem 
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            affordability={item.affordability}
            complexity={item.complexity}
            duration={item.duration}
          />
        )}
      />
    </View>
  );
}

export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
