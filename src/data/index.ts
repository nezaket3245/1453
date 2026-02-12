/**
 * Data Barrel Export
 * 
 * Centralized re-export of all data modules for clean imports:
 * import { stores, testimonials, productCategories } from "@/data";
 */

export { stores, getPrimaryStore, standardWorkingHours, formatWorkingHoursDisplay, getSchemaOpeningHours } from "./stores";
export type { Store, WorkingHours } from "./stores";

export { testimonials, getTestimonialsByProduct, getAverageRating } from "./testimonials";

export { productCategories, getCategoryById, getCategoryBySlug, getCategoryOptions } from "./categories";
export type { ProductCategoryData } from "./categories";
