import type { Category } from "../entities/Category";
import type { CategoryDto } from "../dto/Category";

export function toCategory(categories: CategoryDto[]): Category[] {
  return categories.map((category) => ({
    id: category.slug,
    name: category.name,
    slug: category.slug,
    url: category.url,
    displayName: formatCategoryName(category.name),
  }));
}

function formatCategoryName(name: string): string {
  // Convert from kebab-case or regular format to Title Case
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
