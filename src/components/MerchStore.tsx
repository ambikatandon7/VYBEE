import React, { useState } from 'react';
import { 
  Heart, 
  Check, 
  SlidersHorizontal, 
  Eye, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  X,
  Bot
} from 'lucide-react';
import type { MerchItem, MerchCategory } from '../types/merch';
import { MERCH_ITEMS } from '../data/merchData';
import { addToWishlist, removeFromWishlist, isItemInWishlist } from '../utils/storage';
import { openBotpressWebchat } from '../utils/botpress';

interface MerchStoreProps {
  filterVibeId?: string;
  onWishlistUpdated: () => void;
}

export const MerchStore: React.FC<MerchStoreProps> = ({
  filterVibeId,
  onWishlistUpdated,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MerchCategory>('all');
  const [activeMoodFilter, setActiveMoodFilter] = useState<string>(filterVibeId || 'all');
  const [quickViewItem, setQuickViewItem] = useState<MerchItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  const categories: { id: MerchCategory; label: string }[] = [
    { id: 'all', label: 'All Artifacts' },
    { id: 't-shirts', label: 'Heavyweight Tees' },
    { id: 'posters', label: 'Archival Posters' },
    { id: 'tote-bags', label: 'Canvas Totes' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const moodFilterOptions = [
    { id: 'all', label: 'All Moods' },
    { id: 'midnight-drive', label: 'Midnight Drive' },
    { id: 'soft-reset', label: 'Soft Reset' },
    { id: 'main-character', label: 'Main Character' },
    { id: 'golden-hour', label: 'Golden Hour' },
    { id: 'heartbreak-club', label: 'Heartbreak Club' },
    { id: 'chaos-energy', label: 'Chaos Energy' },
  ];

  const filteredItems = MERCH_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesMood = activeMoodFilter === 'all' || item.vibeId === activeMoodFilter;
    return matchesCategory && matchesMood;
  });

  const handleToggleWishlist = (item: MerchItem) => {
    if (isItemInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist({
        id: item.id,
        name: item.name,
        category: item.category,
        priceInr: item.priceInr,
        vibeId: item.vibeId,
        colorway: item.colorway,
      });
    }
    onWishlistUpdated();
  };

  // Render high-fidelity abstract visual artwork for the mockups
  const renderAbstractMockup = (item: MerchItem) => {
    switch (item.abstractArtStyle) {
      case 'chromatic':
        return (
          <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#120a1f] to-[#08050e] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-radial-aura opacity-60" />
            {/* Chromatic frequency waves */}
            <div className="relative w-36 h-36 rounded-full border border-purple-500/30 flex items-center justify-center animate-pulse">
              <div className="w-24 h-24 rounded-full border border-cyan-400/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 blur-sm opacity-80" />
              </div>
            </div>
            {/* Horizontal Soundwave Bars */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-1 h-8 opacity-70">
              {[40, 75, 55, 90, 60, 100, 45, 80, 65, 95, 50, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-purple-500 to-pink-400 rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        );

      case 'gradient-mesh':
        return (
          <div className="w-full h-full relative overflow-hidden bg-gradient-to-tr from-[#1f1008] via-[#100718] to-[#08050e] flex items-center justify-center p-6">
            <div className="w-32 h-32 rounded-full bg-amber-500/30 blur-2xl absolute -top-4 -left-4" />
            <div className="w-32 h-32 rounded-full bg-pink-500/30 blur-2xl absolute -bottom-4 -right-4" />
            <div className="relative z-10 w-28 h-28 rounded-2xl border border-white/20 bg-white/[0.03] backdrop-blur-md flex flex-col justify-between p-3 rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
              <span className="text-[8px] font-mono text-amber-400">01 // SUNBURST</span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 self-center" />
              <span className="text-[8px] font-mono text-zinc-400 text-right">SOLAR NOSTALGIA</span>
            </div>
          </div>
        );

      case 'minimalist':
        return (
          <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#0a1711] to-[#08050e] flex items-center justify-center p-6">
            <div className="w-32 h-32 rounded-full border border-emerald-500/20 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-teal-400/30 flex items-center justify-center">
                <span className="font-mono text-xs text-emerald-400 font-bold">528 Hz</span>
              </div>
            </div>
            <div className="absolute top-4 left-4 font-mono text-[9px] text-emerald-500/70">
              BOTANICAL // ORGANIC
            </div>
          </div>
        );

      case 'typography':
        return (
          <div className="w-full h-full relative overflow-hidden bg-[#0c0916] flex flex-col justify-between p-5">
            <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500">
              <span>VYBE VAULT</span>
              <span>EST. 2026</span>
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tighter uppercase leading-none opacity-90 group-hover:tracking-normal transition-all duration-500">
              SUB<br />SONIC<br />WAVE
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-purple-500 to-transparent" />
          </div>
        );

      case 'geometric':
      default:
        return (
          <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#180a1c] to-[#090710] flex items-center justify-center p-6">
            <div className="w-28 h-28 border-2 border-dashed border-pink-500/40 rotate-45 group-hover:rotate-90 transition-transform duration-700 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-tr from-violet-600 to-pink-500 opacity-80 blur-xs" />
            </div>
            <div className="absolute bottom-3 left-4 font-mono text-[9px] text-pink-400">
              RADIAL GEOMETRY
            </div>
          </div>
        );
    }
  };

  return (
    <section id="merch" className="py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Store Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 border-b border-white/[0.08] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-purple-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>THE MERCH VAULT // STUDIO</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-2">
            Album-Inspired Streetwear & Art
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
            Original heavyweight apparel, archival fine art prints, and durable accessories inspired by your mood frequency.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Find Your Merch Primary Entry Point */}
          <button
            type="button"
            id="find-your-merch-header-btn"
            onClick={() => openBotpressWebchat()}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500 text-white font-display font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
            aria-label="Find Your Merch with AI Stylist"
          >
            <Sparkles className="w-4 h-4 text-pink-200 group-hover:rotate-12 transition-transform" />
            <span>Find Your Merch</span>
            <span className="text-[10px] font-mono uppercase bg-black/30 px-2 py-0.5 rounded-full text-purple-200">
              Botpress AI
            </span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-white/[0.03] px-3.5 py-2.5 rounded-xl border border-white/5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Prices in INR</span>
          </div>
        </div>
      </div>

      {/* "Find Your Merch" Interactive Callout Banner in Merch Studio */}
      <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#160c29]/70 to-pink-950/40 border border-purple-500/25 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="flex items-center gap-4 z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 p-[2px] shrink-0 shadow-lg shadow-purple-500/30">
            <div className="w-full h-full bg-[#0d0918] rounded-[14px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-purple-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                Looking for your signature look?
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Botpress Chatbot
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl">
              Chat live with <strong>VYBE Merch Stylist</strong> to get real-time recommendations tailored to your mood, favorite artists, or budget.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openBotpressWebchat()}
          id="find-your-merch-banner-btn"
          className="z-10 w-full md:w-auto px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-display font-bold text-xs sm:text-sm shadow-xl hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2 shrink-0 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>Find Your Merch</span>
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="space-y-4 mb-10">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md shadow-purple-600/20'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mood Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-mono text-zinc-500 flex items-center gap-1 shrink-0 pl-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Mood Filter:</span>
          </span>
          {moodFilterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveMoodFilter(opt.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeMoodFilter === opt.id
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'bg-white/[0.02] hover:bg-white/[0.06] text-zinc-400 border border-transparent'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 rounded-3xl bg-white/[0.02] border border-white/5">
          <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="font-display font-bold text-lg text-white mb-1">
            No artifacts found in this category
          </h3>
          <p className="text-xs text-zinc-500 mb-4">
            Try adjusting your category or mood filters to discover more items.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveMoodFilter('all');
            }}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const inWishlist = isItemInWishlist(item.id);

            return (
              <div
                key={item.id}
                className="group rounded-3xl bg-gradient-to-b from-[#130d22]/80 to-[#0b0816]/90 border border-white/[0.08] hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden shadow-lg"
              >
                <div>
                  {/* Mockup Card Visual Area */}
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border-b border-white/[0.06]">
                    {renderAbstractMockup(item)}

                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="text-[10px] font-mono tracking-wider font-semibold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/15 shadow">
                          {item.badge}
                        </span>
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleWishlist(item)}
                      className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md border transition-all ${
                        inWishlist
                          ? 'bg-pink-600 text-white border-pink-500 shadow-md shadow-pink-600/30'
                          : 'bg-black/60 text-zinc-300 hover:text-white border-white/15 hover:bg-black/80'
                      }`}
                      aria-label={`${inWishlist ? 'Remove from' : 'Add to'} wishlist: ${item.name}`}
                    >
                      <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                    </button>

                    {/* Quick View Button Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-zinc-950 font-bold text-xs shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Artifact</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400">
                        {item.category.replace('-', ' ')}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {item.vibeId.replace('-', ' ')}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base text-white group-hover:text-purple-200 transition-colors mb-1.5 leading-snug line-clamp-1">
                      {item.name}
                    </h3>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    {/* Colorway & Swatches */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center -space-x-1">
                        {item.palette.map((hex, i) => (
                          <span
                            key={i}
                            className="w-3.5 h-3.5 rounded-full border border-black"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-zinc-400 truncate">
                        {item.colorway}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer: Price & Quick Inspect */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-base text-white">
                        ₹{item.priceInr.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-zinc-500 ml-1 font-mono">
                        (Demo)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setQuickViewItem(item)}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 hover:text-white text-xs font-semibold transition-colors border border-white/10"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#110b20] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setQuickViewItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Left Mockup View */}
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                {renderAbstractMockup(quickViewItem)}
              </div>

              {/* Right Specs & Actions */}
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 block mb-1">
                    {quickViewItem.category.replace('-', ' ')} • {quickViewItem.vibeId}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white">
                    {quickViewItem.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-mono font-black text-2xl text-white">
                      ₹{quickViewItem.priceInr.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">Demo Price</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {quickViewItem.description}
                </p>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">
                    Design Notes:
                  </span>
                  <p className="text-xs text-zinc-400">
                    {quickViewItem.designNotes}
                  </p>
                </div>

                {/* Size Selector for Apparel */}
                {quickViewItem.sizes && (
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Select Size:
                    </span>
                    <div className="flex gap-2">
                      {quickViewItem.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`w-9 h-9 rounded-xl font-mono text-xs font-bold border transition-all ${
                            selectedSize === s
                              ? 'bg-purple-600 text-white border-purple-400'
                              : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Wishlist Toggle */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleToggleWishlist(quickViewItem);
                    }}
                    className={`w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                      isItemInWishlist(quickViewItem.id)
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg shadow-purple-600/30 hover:scale-[1.02]'
                    }`}
                  >
                    {isItemInWishlist(quickViewItem.id) ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Saved in Your Wishlist</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4" />
                        <span>Add to Wishlist</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
