export type ProductDto = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  stock: number;
  discountPercentage: number;
  rating: number;
  tags: string[];
  reviews: ReviewDto[];
};

export type ReviewDto = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};
