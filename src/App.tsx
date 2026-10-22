import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuizSection } from './components/QuizSection';
import { ResultsSection } from './components/ResultsSection';
import { MerchMuseChat } from './components/MerchMuseChat';
import { MerchStore } from './components/MerchStore';
import { PromoVideo } from './components/PromoVideo';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';
import type { RecommendationResult } from './utils/recommendationEngine';
import { getStoredWishlist, getStoredArtists } from './utils/storage';
import type { VibeId } from './types/vibe';
import { VIBE_PROFILES } from './data/vibeData';
import { getSongsForMoodAndArtists } from './utils/recommendationEngine';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [quizResult, setQuizResult] = useState<RecommendationResult | null>(null);
  const [wishlist, setWishlist] = useState(getStoredWishlist());
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [merchFilterVibeId, setMerchFilterVibeId] = useState<string>('all');
  const [musePrompt, setMusePrompt] = useState<string | undefined>(undefined);

  // Sync wishlist from localStorage
  const refreshWishlist = () => {
    setWishlist(getStoredWishlist());
  };

  useEffect(() => {
    refreshWishlist();
    const handleStorageUpdate = () => refreshWishlist();
    window.addEventListener('vybe-wishlist-updated', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener('vybe-wishlist-updated', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  const handleStartQuiz = () => {
    setActiveTab('quiz');
    const el = document.getElementById('quiz');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleQuizComplete = (result: RecommendationResult) => {
    setQuizResult(result);
    setActiveTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVibePreview = (vibeId: VibeId) => {
    const vibe = VIBE_PROFILES[vibeId];
    if (vibe) {
      const storedArtists = getStoredArtists();
      const activeArtists = storedArtists.length > 0 ? storedArtists : ['Taylor Swift'];
      const outcome = getSongsForMoodAndArtists(vibeId, activeArtists);

      setQuizResult({
        vibe,
        confidenceScore: 94,
        userArtists: activeArtists,
        personalizedSongs: outcome.songs,
        matchSummary: `Exploring the ${vibe.name} frequency with real catalogue selections for ${activeArtists.join(' & ')}.`,
        hasUncatalogedArtist: outcome.hasUncatalogedArtist,
        uncatalogedArtistName: outcome.uncatalogedArtistName,
      });
      setActiveTab('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRetakeQuiz = () => {
    setQuizResult(null);
    setActiveTab('quiz');
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handleGoToMerch = (vibeId?: string) => {
    if (vibeId) {
      setMerchFilterVibeId(vibeId);
    }
    setActiveTab('merch');
    const el = document.getElementById('merch');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGoToMuse = (prompt: string) => {
    setMusePrompt(prompt);
    setActiveTab('muse');
    const el = document.getElementById('muse');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#08050e] text-[#f4f2fa] relative selection:bg-purple-600 selection:text-white">
      {/* Background Ambient Grain Texture */}
      <div className="fixed inset-0 bg-grain pointer-events-none opacity-40 z-0" />

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wishlistCount={wishlist.length}
        openWishlist={() => setIsWishlistOpen(true)}
        hasResult={quizResult !== null}
      />

      <main className="relative z-10">
        {/* If user is looking at results, feature ResultsSection first */}
        {quizResult && activeTab === 'results' && (
          <ResultsSection
            result={quizResult}
            onRetake={handleRetakeQuiz}
            onGoToMerch={handleGoToMerch}
            onGoToMuse={handleGoToMuse}
          />
        )}

        {/* Hero Section */}
        <HeroSection
          onStartQuiz={handleStartQuiz}
          onSelectVibePreview={handleSelectVibePreview}
          onExploreMerch={() => handleGoToMerch()}
        />

        {/* Interactive 5-Question Mood Quiz Section */}
        <QuizSection onComplete={handleQuizComplete} />

        {/* If results exist but user scrolled to other parts, keep result accessible */}
        {quizResult && activeTab !== 'results' && (
          <div className="max-w-4xl mx-auto px-4 my-8">
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-pink-500 animate-ping" />
                <span className="text-xs sm:text-sm text-zinc-200">
                  Your vibe frequency is active: <strong className="text-white font-bold">{quizResult.vibe.name}</strong> ({quizResult.confidenceScore}%)
                </span>
              </div>
              <button
                onClick={() => {
                  setActiveTab('results');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3.5 py-1.5 rounded-full bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition-colors"
              >
                View Results
              </button>
            </div>
          </div>
        )}

        {/* The Merch Muse (AI Streetwear Chat Stylist) */}
        <MerchMuseChat
          initialPrompt={musePrompt}
          onWishlistUpdated={refreshWishlist}
        />

        {/* The Merch Vault (Featured Merchandise Cards & Filters) */}
        <MerchStore
          filterVibeId={merchFilterVibeId}
          onWishlistUpdated={refreshWishlist}
        />

        {/* Promotional Video Showcase */}
        <PromoVideo />
      </main>

      {/* Persistent Wishlist Slide-Out Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onWishlistUpdated={refreshWishlist}
        onGoToMerch={() => handleGoToMerch()}
      />

      {/* Footer */}
      <Footer
        onScrollToTop={handleScrollToTop}
        onNavigate={(tab) => {
          setActiveTab(tab);
          const el = document.getElementById(tab);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default App;
