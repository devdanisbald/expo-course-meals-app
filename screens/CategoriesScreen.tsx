import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CategoryGridTile from '../components/CategoryGridTile';

import { CATEGORIES } from '../data/dummy-data';

const CategoriesScreen = ({  }) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <CategoryGridTile 
            title={itemData.item.title}
            color={itemData.item.color}
            // @ts-ignore
            onPress={() => navigation.navigate('MealsOverview' , {
              categoryId: itemData.item.id,
            }) }
          />
        );
      }}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;
