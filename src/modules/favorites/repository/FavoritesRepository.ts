import type { FavoriteItem, Favorites } from "../entities/Favorite";

export interface FavoritesRepository {
  getAll: () => Favorites;
  add: (item: FavoriteItem) => void;
  remove: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}
