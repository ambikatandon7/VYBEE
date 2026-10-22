import type { VibeId } from './vibe';

export type MerchCategory = 'all' | 't-shirts' | 'posters' | 'tote-bags' | 'accessories';

export interface MerchItem {
  id: string;
  name: string;
  category: 't-shirts' | 'posters' | 'tote-bags' | 'accessories';
  vibeId: VibeId;
  priceInr: number;
  description: string;
  designNotes: string;
  colorway: string;
  palette: string[];
  sizes?: string[];
  badge?: string;
  abstractArtStyle: 'geometric' | 'gradient-mesh' | 'typography' | 'chromatic' | 'minimalist';
}

export interface WishlistItem {
  id: string;
  name: string;
  category: string;
  priceInr: number;
  vibeId?: string;
  colorway?: string;
  dateAdded: string;
  isAiGenerated?: boolean;
}
