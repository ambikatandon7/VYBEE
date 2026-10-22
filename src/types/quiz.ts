import type { VibeId } from './vibe';

export interface QuizOption {
  id: string;
  label: string;
  description: string;
  iconName: string;
  vibeWeights: Record<VibeId, number>;
  badge?: string;
}

export interface QuizQuestion {
  id: number;
  step: number;
  category: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
  allowCustomInput?: boolean;
  customInputPlaceholder?: string;
}

export interface QuizState {
  currentStep: number;
  totalSteps: number;
  answers: Record<number, string>; // questionId -> optionId
  favoriteArtists: string[];
  artistInput: string;
}
