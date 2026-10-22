export type VibeId = 
  | 'midnight-drive'
  | 'soft-reset'
  | 'main-character'
  | 'golden-hour'
  | 'heartbreak-club'
  | 'chaos-energy';

export interface DemoSong {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  duration: string;
  bpm: number;
  reason: string;
  audioFreqHz: number;
  synthNotes: string[]; // e.g. ['D3', 'F3', 'A3', 'C4']
  previewUrl?: string;
  coverGradient: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  isCatalogMatch?: boolean;
  isExternalSearchFallback?: boolean;
}

export interface VibeProfile {
  id: VibeId;
  name: string;
  tagline: string;
  description: string;
  auraGradient: string;
  accentColor: string;
  secondaryColor: string;
  cardBorderColor: string;
  badgeBg: string;
  moodTags: string[];
  sonicStats: {
    tempo: string;
    dominantKey: string;
    frequency: string;
    energySpectrum: string;
  };
  albumConcept: {
    title: string;
    subtitle: string;
    visualStyle: string;
    palette: string[];
    linerNotes: string;
  };
  recommendedSongs: DemoSong[];
  matchingMerchTag: string;
}
