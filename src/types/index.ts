/**
 * Type Definitions for the Application
 */

// Navigation Types
export interface NavLink {
    label: string;
    href: string;
    isActive?: boolean;
    children?: NavLink[];
}

// Product Types
export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    longDescription?: string;
    features: string[];
    benefits?: string[];
    image: string;
    gallery?: string[];
    category: ProductCategory;
    technicalSpecs?: ProductSpecification[];
    relatedProducts?: string[];
}

export interface ProductImage {
    src: string;
    alt: string;
    width: number;
    height: number;
    isPrimary?: boolean;
}

export interface ProductSpecification {
    label: string;
    value: string;
    unit?: string;
}

export interface PriceRange {
    min: number;
    max: number;
    currency: string;
}

export type ProductCategory =
    | "pvc-pencere"
    | "cam-balkon"
    | "aluminyum"
    | "sineklik"
    | "panjur"
    | "dusakabin";

// Service Types
export interface Service {
    id: string;
    slug: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    features: string[];
    image: string;
}

// Testimonial Types
export interface Testimonial {
    id: string;
    name: string;
    location: string;
    rating: number;
    comment: string;
    date: string;
    avatar?: string;
    product?: string;
}

// FAQ Types
export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category?: string;
}

// Gallery Types
export interface GalleryItem {
    id: string;
    title: string;
    description?: string;
    image: ProductImage;
    category: ProductCategory;
    location?: string;
    date?: string;
}

// Blog Types
export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    featuredImage: ProductImage;
    author: string;
    publishedAt: string;
    updatedAt?: string;
    tags: string[];
    readingTime: number;
}

// SEO Types
export interface SEOData {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
}

// Breadcrumb Types
export interface BreadcrumbItem {
    label: string;
    href: string;
    isCurrent?: boolean;
}

// Component Props Types
export interface ButtonProps {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    ariaLabel?: string;
}

export interface CardProps {
    variant?: "default" | "glass" | "elevated";
    padding?: "none" | "sm" | "md" | "lg";
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
}

// Animation Variants
export interface AnimationVariants {
    initial: object;
    animate: object;
    exit?: object;
    transition?: object;
}

// API Response Types
export interface APIResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
    };
}
