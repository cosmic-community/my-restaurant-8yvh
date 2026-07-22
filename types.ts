// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface MenuCategory extends CosmicObject {
  type: 'menu-categories';
  metadata: {
    name?: string;
    description?: string;
    display_order?: number;
  };
}

export interface MenuItem extends CosmicObject {
  type: 'menu-items';
  metadata: {
    name?: string;
    description?: string;
    price?: number;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    dietary_tags?: string[];
    chefs_favorite?: boolean;
    category?: MenuCategory;
  };
}

export interface Location extends CosmicObject {
  type: 'locations';
  metadata: {
    location_name?: string;
    address?: string;
    phone?: string;
    email?: string;
    hours?: string;
    reservation_info?: string;
    reservation_link?: string;
    location_photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface CustomerReview extends CosmicObject {
  type: 'customer-reviews';
  metadata: {
    reviewer_name?: string;
    rating?: number;
    review?: string;
    date?: string;
    location?: Location;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isMenuItem(obj: CosmicObject): obj is MenuItem {
  return obj.type === 'menu-items';
}

export function isLocation(obj: CosmicObject): obj is Location {
  return obj.type === 'locations';
}