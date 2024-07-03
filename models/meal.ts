interface Meal {
  id: string;
  categoryIds: string;
  title: string;
  affordability: string;
  complexity: string;
  imageUrl: string;
  duration: string;
  ingredients: string;
  steps: string;
  isGlutenFree: string;
  isVegan: string;
  isVegetarian: string;
  isLactoseFree: string;
}

export interface IMeal extends Meal {}

class Meal {
  constructor(
    id: string,
    categoryIds: string,
    title: string,
    affordability: string,
    complexity: string,
    imageUrl: string,
    duration: string,
    ingredients: string,
    steps: string,
    isGlutenFree: string,
    isVegan: string,
    isVegetarian: string,
    isLactoseFree: string
  ) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.title = title;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
    this.steps = steps;
    this.duration = duration;
    this.complexity = complexity;
    this.affordability = affordability;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegetarian = isVegetarian;
    this.isLactoseFree = isLactoseFree;
  }
}

export default Meal;
