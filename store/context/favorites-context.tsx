import { useState, FC, createContext, ReactNode } from 'react';

export const FavoritesContext = createContext({
  ids: [] as string[],
  addFavorite: (id: string) => {},
  removeFavorite: (id: string) => {}
});

interface IProps {
  children: ReactNode
}
const FavoritesContextProvider: FC<IProps> = ({children}) => {
  const [favoriteMealIds, setFavoriteMealIds] = useState<string[]>([]);

  const addFavorite = (id:string) => {
    setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
  }

  const removeFavorite = (id:string) => {
    setFavoriteMealIds((currentFavIds) => currentFavIds.filter((mealId) => mealId !== id));
  }

  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>)
}

export default FavoritesContextProvider;
