import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import type { WishlistItem } from '../types/merch';
import { removeFromWishlist, clearWishlist } from '../utils/storage';
import confetti from 'canvas-confetti';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: WishlistItem[];
  onWishlistUpdated: () => void;
  onGoToMerch: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onWishlistUpdated,
  onGoToMerch,
}) => {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  if (!isOpen) return null;

  const totalInr = items.reduce((sum, item) => sum + item.priceInr, 0);

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    onWishlistUpdated();
  };

  const handleClearAll = () => {
    clearWishlist();
    onWishlistUpdated();
  };

  const handleSimulateCheckout = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }
    setCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e091a] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  Your Wishlist
                </h3>
                <span className="text-xs font-mono text-zinc-400">
                  {items.length} {items.length === 1 ? 'Artifact' : 'Artifacts'} Saved
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close wishlist drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-white mb-1">
                    Your Wishlist is Empty
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-xs">
                    Explore the Merch Vault or ask The Merch Muse to generate original concepts for you.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onGoToMerch();
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold text-xs shadow-lg shadow-purple-600/30"
                >
                  Explore Merch Vault
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400">
                        {item.category.replace('-', ' ')}
                      </span>
                      {item.isAiGenerated && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          AI CONCEPT
                        </span>
                      )}
                    </div>

                    <h5 className="font-display font-bold text-sm text-white group-hover:text-purple-200 transition-colors leading-snug">
                      {item.name}
                    </h5>

                    {item.colorway && (
                      <p className="text-[11px] text-zinc-400">
                        {item.colorway}
                      </p>
                    )}

                    <div className="pt-1 flex items-baseline gap-2">
                      <span className="font-mono font-bold text-sm text-emerald-400">
                        ₹{item.priceInr.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        (Demo Price)
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    aria-label={`Remove ${item.name} from wishlist`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Total */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">Estimated Demo Total</span>
                <div className="text-right">
                  <span className="font-mono font-bold text-xl text-white">
                    ₹{totalInr.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 block">
                    (College Demo Evaluation)
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-medium border border-white/10 transition-colors"
                >
                  Clear All
                </button>

                <button
                  type="button"
                  onClick={handleSimulateCheckout}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
                >
                  <span>Simulate Demo Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-zinc-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero payment required • Fictional Demo Content</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simulated Checkout Celebration Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#130b22] border border-purple-500/40 p-6 sm:p-8 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-0.5 mx-auto">
              <div className="w-full h-full bg-[#0d0718] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-pink-400" />
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 block mb-1">
                DEMO SIMULATION COMPLETE
              </span>
              <h4 className="font-display font-black text-2xl text-white">
                Artifact Order Simulated!
              </h4>
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                Thank you for testing the VYBE merchandise pipeline. In a production build, this trigger hooks into your e-commerce backend (Shopify / Stripe / Razorpay).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs text-left space-y-1 text-zinc-400">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="text-white font-bold">{items.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Demo Valuation:</span>
                <span className="text-emerald-400 font-bold">₹{totalInr.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Storage Key:</span>
                <span className="text-zinc-500">localStorage.vybe_user_wishlist</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCheckoutModalOpen(false)}
              className="w-full py-3 rounded-full bg-white text-zinc-950 font-bold text-sm hover:bg-zinc-200 transition-colors shadow-lg"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
