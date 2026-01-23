import type { FavoritesRepository } from "./FavoritesRepository";
import type { FavoriteItem, Favorites } from "../entities/Favorite";

const STORAGE_KEY = "favorites";

const getFavorites = (): Favorites => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const saveFavorites = (favorites: Favorites): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    window.dispatchEvent(new Event("favoritesUpdated"));
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
};

export const localStorageFavorites = (): FavoritesRepository => ({
  getAll: getFavorites,
  add: (item: FavoriteItem) => {
    const favorites = getFavorites();
    if (!favorites.items.some((i) => i.productId === item.productId)) {
      favorites.items.push(item);
      saveFavorites(favorites);
    }
  },
  remove: (productId: number) => {
    const favorites = getFavorites();
    favorites.items = favorites.items.filter((i) => i.productId !== productId);
    saveFavorites(favorites);
  },
  isFavorite: (productId: number) => getFavorites().items.some((i) => i.productId === productId),
});
