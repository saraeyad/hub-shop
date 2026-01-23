export type FavoriteItem = {
  productId: number;
  name: string;
  image: string;
  price: number;
  discountPercentage?: number;
  addedAt: string;
};

export type Favorites = {
  items: FavoriteItem[];
};
