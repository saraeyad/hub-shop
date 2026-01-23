import type { Product } from "../entities/Product";
import type { ProductDto } from "../dto/Product";

export function toProduct(products: ProductDto[]): Product[] {
  return products.map((product) => ({
    id: product.id,
    name: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    image: product.thumbnail,

    // derived fields
    isAvailable: product.stock > 0,
    hasDiscounts: product.discountPercentage > 0,
    discountPercentage: product.discountPercentage,
    rating: product.rating,
    tags: product.tags,
    reviews: product.reviews.map((review) => ({
      rating: review.rating,
      comment: review.comment,
      date: review.date,
      reviewer: {
        name: review.reviewerName,
        email: review.reviewerEmail,
      },
    })),
  }));
}
