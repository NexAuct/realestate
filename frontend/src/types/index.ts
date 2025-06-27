export interface ProgressStep {
  id: number;
  label: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  progress?: number;
}

export interface ProgressState {
  currentStep: number;
  steps: ProgressStep[];
  isLoading: boolean;
}

export interface ThemeMode {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  featured?: boolean;
}

export interface Agent {
  id: number;
  name: string;
  title: string;
  experience: string;
  rating: number;
  reviews: number;
  specialties: string[];
  phone: string;
  email: string;
  avatar: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export interface DocumentationLink {
  title: string;
  url: string;
  category: 'API' | 'Guides' | 'Examples';
}
