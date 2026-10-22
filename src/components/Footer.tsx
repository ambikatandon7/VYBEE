import React from 'react';
import { Heart, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onNavigate }) => {
  return (
    <footer className="border-t border-white/10 bg-[#06040a] text-zinc-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand & Project Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 p-[1.5px]">
                <div className="w-full h-full bg-[#08050e] rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-black text-sm text-white">V</span>
                </div>
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                VYBE
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                COLLEGE AI PROJECT DEMO
              </span>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Your Mood. Your Music. Your World. An editorial music discovery engine paired with an album-inspired streetwear generator designed for academic evaluation.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Client-Side • No Paid API Keys Required</span>
            </div>
          </div>

          {/* How It Works */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              How It Works
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400 font-mono">01.</span>
                <span><strong>5-Prompt Matrix:</strong> Answers map mood, velocity, setting, and texture.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400 font-mono">02.</span>
                <span><strong>Deterministic Engine:</strong> High-precision scoring matches one of six vibes.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400 font-mono">03.</span>
                <span><strong>Web Audio Synthesis:</strong> Synthesizes real ambient chords in your browser.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400 font-mono">04.</span>
                <span><strong>The Merch Muse:</strong> AI creative assistant for album-inspired fashion.</span>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Discover Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-white transition-colors"
                >
                  Interactive Mood Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('muse')}
                  className="hover:text-white transition-colors"
                >
                  The Merch Muse (AI Stylist)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('merch')}
                  className="hover:text-white transition-colors"
                >
                  The Merch Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('video')}
                  className="hover:text-white transition-colors"
                >
                  Promo Studio Player
                </button>
              </li>
            </ul>
          </div>

          {/* College Demo Disclaimer */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Demo Disclaimer
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Created for college AI and web engineering presentation. Music selections and merchandise mockups are curated demo concepts. Prices in INR (₹) are fictional demonstrations. No live audio streaming or transactions occur.
            </p>
            <div className="pt-2">
              <button
                onClick={onScrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Tech Stack Pills */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            VYBE © 2026 • Crafted with <Heart className="w-3 h-3 text-pink-500 inline fill-pink-500" /> for College AI Evaluation
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">Vite</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">React 19</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">TypeScript</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">Tailwind CSS</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">Web Audio API</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
