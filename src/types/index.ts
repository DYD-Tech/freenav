export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  official?: boolean;
  category: string;
  tags: string[];
  pricing: 'free' | 'freemium' | 'open-source';
  language?: string;
  platform?: string;
  screenshot?: string;
  logo?: string;
  addedAt: string;
  updatedAt: string;
  verifiedAt?: string;
  rating?: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count: number;
}

export type Pricing = 'free' | 'freemium' | 'open-source';