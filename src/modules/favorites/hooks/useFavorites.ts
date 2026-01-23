import { useCallback } from "react";
import { useFavoritesContext } from "../index";
import type { FavoriteItem } from "../entities/Favorite";

export const useFavorites = () => {
  const { repository, favorites, refreshFavorites } = useFavoritesContext();

  const addItem = useCallback((item: FavoriteItem) => {
    repository.add(item);
    refreshFavorites();
  }, [repository, refreshFavorites]);

  const removeItem = useCallback((productId: number) => {
    repository.remove(productId);
    refreshFavorites();
  }, [repository, refreshFavorites]);

  const isFavorite = useCallback((productId: number) => 
    favorites.items.some((i) => i.productId === productId), [favorites]);

  return {
    addItem,
    removeItem,
    isFavorite,
    getAll: () => favorites,
    count: favorites.items.length,
  };
};
