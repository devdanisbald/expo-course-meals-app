import { FC } from "react";
import { View, Text, StyleSheet } from 'react-native';

interface IProps {
  duration: string;
  complexity: string;
  affordability: string;
  style?: any;
  textStyle?: any;
}
const MealDetails: FC<IProps> = ({
  duration,
  complexity,
  affordability,
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.details, ...(style ? [style] : [])]}>
      <Text style={[styles.detailItem, ...(textStyle ? [textStyle] : [])]}>{duration}m</Text>
      <Text style={[styles.detailItem, ...(textStyle ? [textStyle] : [])]}>
        {complexity.toUpperCase()}
      </Text>
      <Text style={[styles.detailItem, ...(textStyle ? [textStyle] : [])]}>
        {affordability.toUpperCase()}
      </Text>
    </View>
  );
}

export default MealDetails;

const styles = StyleSheet.create({
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
