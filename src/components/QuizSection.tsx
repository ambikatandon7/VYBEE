import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Moon, 
  Wind, 
  Zap, 
  Sun, 
  HeartCrack, 
  Flame, 
  Waves, 
  Compass, 
  Disc, 
  Radio, 
  Car, 
  Coffee, 
  Glasses, 
  Volume2, 
  Headphones, 
  Music, 
  Mic2, 
  Layers, 
  Activity, 
  Heart, 
  Droplets,
  Plus,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS, POPULAR_ARTISTS_SUGGESTIONS } from '../data/quizData';
import { calculateVibeRecommendation, type RecommendationResult } from '../utils/recommendationEngine';
import { getStoredArtists, saveStoredArtists } from '../utils/storage';

interface QuizSectionProps {
  onComplete: (result: RecommendationResult) => void;
  onCancel?: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [favoriteArtists, setFavoriteArtists] = useState<string[]>(() => getStoredArtists());
  const [artistInputText, setArtistInputText] = useState('');

  const currentQuestion = QUIZ_QUESTIONS[currentStepIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalQuestions) * 100);

  const selectedOptionId = answers[currentQuestion.id];

  // Map icon strings to Lucide components
  const getIcon = (name: string) => {
    switch (name) {
      case 'Moon': return Moon;
      case 'Wind': return Wind;
      case 'Zap': return Zap;
      case 'Sun': return Sun;
      case 'HeartCrack': return HeartCrack;
      case 'Flame': return Flame;
      case 'Waves': return Waves;
      case 'Compass': return Compass;
      case 'Disc': return Disc;
      case 'Radio': return Radio;
      case 'Car': return Car;
      case 'Coffee': return Coffee;
      case 'Glasses': return Glasses;
      case 'Volume2': return Volume2;
      case 'Headphones': return Headphones;
      case 'Music': return Music;
      case 'Mic2': return Mic2;
      case 'Layers': return Layers;
      case 'Activity': return Activity;
      case 'Heart': return Heart;
      case 'Droplets': return Droplets;
      case 'Sparkles': return Sparkles;
      default: return Music;
    }
  };

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleAddArtist = (artistName: string) => {
    const trimmed = artistName.trim();
    if (!trimmed) return;
    if (!favoriteArtists.includes(trimmed)) {
      if (favoriteArtists.length < 5) {
        setFavoriteArtists([...favoriteArtists, trimmed]);
      }
    }
    setArtistInputText('');
  };

  const handleRemoveArtist = (artistName: string) => {
    setFavoriteArtists(favoriteArtists.filter((a) => a !== artistName));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddArtist(artistInputText);
    }
  };

  const handleNext = () => {
    if (!selectedOptionId) return;

    if (currentStepIndex < totalQuestions - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } else {
      // Final question submitted!
      // Add any lingering input
      let finalArtists = [...favoriteArtists];
      if (artistInputText.trim() && !finalArtists.includes(artistInputText.trim())) {
        finalArtists.push(artistInputText.trim());
      }

      saveStoredArtists(finalArtists);
      const result = calculateVibeRecommendation(answers, finalArtists);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#ec4899', '#38bdf8', '#fbbf24', '#ffffff'],
        });
      } catch {
        // ignore if not supported
      }

      onComplete(result);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  return (
    <section id="quiz" className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Quiz Progress & Stepper Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20">
              {currentQuestion.category}
            </span>
            <span className="text-zinc-500 text-xs">•</span>
            <span className="text-xs text-zinc-400 font-mono">
              Step {currentStepIndex + 1} of {totalQuestions}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-zinc-300">
            {progressPercent}% Complete
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden p-[1px] border border-white/[0.05]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 transition-all duration-500 ease-out shadow-sm shadow-purple-500/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Indicator Pills */}
        <div className="flex items-center justify-between mt-3 px-1">
          {QUIZ_QUESTIONS.map((q, idx) => (
            <div
              key={q.id}
              className={`h-1.5 flex-1 mx-0.5 rounded-full transition-colors ${
                idx <= currentStepIndex ? 'bg-purple-500' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#130d24]/90 to-[#0b0716]/95 border border-white/[0.1] shadow-2xl backdrop-blur-xl mb-8">
        <div className="mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight mb-2">
            {currentQuestion.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            {currentQuestion.subtitle}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {currentQuestion.options.map((option) => {
            const Icon = getIcon(option.iconName);
            const isSelected = selectedOptionId === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(option.id)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-200 border flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                  isSelected
                    ? 'bg-purple-600/20 border-purple-400/80 shadow-lg shadow-purple-600/20 scale-[1.01]'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.08] hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-md'
                          : 'bg-white/[0.06] text-zinc-300 group-hover:text-purple-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {option.badge && (
                      <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-400 border border-white/[0.05]">
                        {option.badge}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`font-display font-bold text-base sm:text-lg mb-1.5 transition-colors ${
                      isSelected ? 'text-white' : 'text-zinc-200 group-hover:text-white'
                    }`}
                  >
                    {option.label}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {option.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-end">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-purple-400 bg-purple-500'
                        : 'border-zinc-600 bg-transparent group-hover:border-zinc-400'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Favorite Artists Input Section (On Step 5) */}
        {currentQuestion.allowCustomInput && (
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="mb-4">
              <label htmlFor="artist-input" className="block font-display font-bold text-lg text-white mb-1">
                Favorite Artists or Musical Influences <span className="text-zinc-500 text-xs font-normal font-sans">(Optional)</span>
              </label>
              <p className="text-xs text-zinc-400">
                Type names to prioritize them in your vibe match reasons, or click trending suggestions below.
              </p>
            </div>

            {/* Input + Add Button */}
            <div className="flex gap-2 mb-4">
              <input
                id="artist-input"
                type="text"
                value={artistInputText}
                onChange={(e) => setArtistInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={currentQuestion.customInputPlaceholder}
                className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              />
              <button
                type="button"
                onClick={() => handleAddArtist(artistInputText)}
                className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors flex items-center gap-1.5 shadow-md shadow-purple-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            {/* Selected Artists Chips */}
            {favoriteArtists.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2 items-center">
                <span className="text-xs text-zinc-400 font-mono">Your Artists:</span>
                {favoriteArtists.map((artist) => (
                  <span
                    key={artist}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/40 text-xs font-medium animate-in fade-in duration-200"
                  >
                    <span>{artist}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveArtist(artist)}
                      className="hover:text-white p-0.5 text-purple-300"
                      aria-label={`Remove ${artist}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Trending Suggestions Chips */}
            <div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                Quick Add Suggestions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_ARTISTS_SUGGESTIONS.map((artist) => {
                  const isAdded = favoriteArtists.includes(artist);
                  return (
                    <button
                      key={artist}
                      type="button"
                      disabled={isAdded}
                      onClick={() => handleAddArtist(artist)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        isAdded
                          ? 'bg-purple-900/30 text-purple-400 border-purple-500/20 cursor-default opacity-50'
                          : 'bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 border-white/[0.08] hover:border-purple-400/40'
                      }`}
                    >
                      + {artist}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Stepper Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              currentStepIndex === 0
                ? 'opacity-30 cursor-not-allowed text-zinc-500'
                : 'text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedOptionId}
            className={`flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold tracking-wide transition-all ${
              selectedOptionId
                ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <span>{currentStepIndex === totalQuestions - 1 ? 'Reveal Your VYBE' : 'Next Question'}</span>
            {currentStepIndex === totalQuestions - 1 ? (
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
