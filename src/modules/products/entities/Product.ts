export type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  isAvailable: boolean;
  hasDiscounts: boolean;
  discountPercentage?: number;
  rating: number;
  tags: string[];
  reviews: Review[];
};

export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewer: {
    name: string;
    email: string;
  };
};
