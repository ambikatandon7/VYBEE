import React from 'react';
import { Sparkles, ArrowRight, Disc, Flame, Waves, Heart, Radio, Sun, ShieldCheck } from 'lucide-react';
import { VIBE_PROFILES } from '../data/vibeData';
import type { VibeId } from '../types/vibe';

interface HeroSectionProps {
  onStartQuiz: () => void;
  onSelectVibePreview: (vibeId: VibeId) => void;
  onExploreMerch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartQuiz,
  onSelectVibePreview,
  onExploreMerch,
}) => {
  const vibes = Object.values(VIBE_PROFILES);

  const getVibeIcon = (id: VibeId) => {
    switch (id) {
      case 'midnight-drive': return Disc;
      case 'soft-reset': return Waves;
      case 'main-character': return Sparkles;
      case 'golden-hour': return Sun;
      case 'heartbreak-club': return Heart;
      case 'chaos-energy': return Flame;
      default: return Radio;
    }
  };

  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background Radial Glow & Mesh Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-purple-600/20 via-pink-600/10 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-violet-600/15 blur-[120px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-pink-600/15 blur-[120px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Top Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-purple-300 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span className="font-semibold">COLLEGE AI DISCOVERY PLATFORM</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">SONIC CURATION + MERCH STYLING</span>
          </div>
        </div>

        {/* Expressive Editorial Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6">
            <span className="block text-white">Your mood has a</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 drop-shadow-sm">
              soundtrack.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Discover the exact sonic frequency of your current emotional state. Answer five intuitive prompts, unlock one of six signature vibes, and discover original album-inspired streetwear crafted for your wave.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={onStartQuiz}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold text-base sm:text-lg tracking-wide shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
          >
            <span>Start Your VYBE</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreMerch}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 hover:text-white font-medium text-base sm:text-lg border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2.5 backdrop-blur-md"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>Explore Merch Vault</span>
          </button>
        </div>

        {/* Featured Mood Cards Carousel / Grid Teaser */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-1">
                The Sonic Spectrum
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Six Distinct Vibes. One True Frequency.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
              Calculated deterministically using emotional resonance, tempo affinity, and favorite artist sound signatures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {vibes.map((vibe) => {
              const Icon = getVibeIcon(vibe.id);
              return (
                <div
                  key={vibe.id}
                  onClick={() => onSelectVibePreview(vibe.id)}
                  className="group relative rounded-3xl p-6 bg-gradient-to-b from-[#130d22]/90 to-[#0c0817]/90 border border-white/[0.08] hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-purple-950/40 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Top Ambient Gradient */}
                  <div
                    className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
                    style={{ backgroundColor: vibe.accentColor }}
                  />

                  <div>
                    {/* Header: Icon & Sonic Stats */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${vibe.accentColor}18`,
                          borderColor: `${vibe.accentColor}40`,
                          color: vibe.accentColor,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-full bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                        {vibe.sonicStats.tempo}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-white group-hover:text-purple-200 transition-colors mb-2">
                      {vibe.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                      {vibe.tagline}
                    </p>
                  </div>

                  {/* Footer Tags & CTA Hint */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {vibe.moodTags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.03] text-zinc-300 border border-white/[0.05]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-semibold text-purple-400 group-hover:text-pink-400 transition-colors flex items-center gap-1">
                      Explore
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Merch Teaser & Trust Banner */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-violet-950/40 via-purple-950/30 to-pink-950/20 border border-purple-500/20 backdrop-blur-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>GEN-AI STREETWEAR CAPSULE</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Wear your soundtrack.
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Meet <strong className="text-purple-300 font-semibold">The Merch Muse</strong> — our interactive fashion stylist that translates your favorite artists, albums, and vibe frequencies into original heavyweight tees, archival posters, and accessories.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-black/40 px-3.5 py-2 rounded-xl border border-white/5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Original Abstract Concepts (No Counterfeits)</span>
              </div>
              <button
                onClick={onExploreMerch}
                className="px-6 py-3 rounded-full bg-white text-zinc-950 font-bold text-sm hover:bg-zinc-200 transition-colors shadow-lg"
              >
                Browse Merch Vault
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
