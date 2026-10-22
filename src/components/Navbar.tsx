import React, { useState } from 'react';
import { Sparkles, Heart, Menu, X, Compass, ShoppingBag, Music, Film, MessageSquare } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  wishlistCount: number;
  openWishlist: () => void;
  hasResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  wishlistCount,
  openWishlist,
  hasResult,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Discover', icon: Compass },
    { id: 'quiz', label: 'Mood Quiz', icon: Music },
    ...(hasResult ? [{ id: 'results', label: 'Your Vibe', icon: Sparkles }] : []),
    { id: 'muse', label: 'The Merch Muse', icon: MessageSquare },
    { id: 'merch', label: 'Merch Vault', icon: ShoppingBag },
    { id: 'video', label: 'Promo Studio', icon: Film },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    // Smooth scroll if element exists
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#08050e]/85 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* VYBE Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-xl"
          aria-label="VYBE Home"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-[#08050e] rounded-[10px] flex items-center justify-center">
              <span className="font-display font-black text-xl text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-pink-400">
                V
              </span>
            </div>
            {/* Glow Aura */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-500 blur-md opacity-40 group-hover:opacity-75 transition-opacity" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-2xl tracking-tight text-white group-hover:text-purple-200 transition-colors">
                VYBE
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                AI DEMO
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium tracking-tight hidden sm:block">
              Your Mood. Your Music. Your World.
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs lg:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-white shadow-inner border border-white/15'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-zinc-500'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          {/* Wishlist Button */}
          <button
            onClick={openWishlist}
            className="relative p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            aria-label={`Open Wishlist (${wishlistCount} items)`}
          >
            <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-pink-500 fill-pink-500' : 'text-zinc-400'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Quick CTA */}
          <button
            onClick={() => handleNavClick('quiz')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white text-xs lg:text-sm font-semibold tracking-wide shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start Your VYBE</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0c0817] px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                    : 'text-zinc-300 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-zinc-500'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('quiz')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Your VYBE Quiz</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
