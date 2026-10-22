import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Bot, 
  ShieldCheck, 
  ArrowRight,
  MessageSquare,
  Flame,
  CheckCircle2,
  ExternalLink,
  Shirt,
  Palette
} from 'lucide-react';
import { openBotpressWebchat } from '../utils/botpress';

interface MerchMuseChatProps {
  initialPrompt?: string;
  onWishlistUpdated: () => void;
}

export const MerchMuseChat: React.FC<MerchMuseChatProps> = ({
  initialPrompt,
}) => {
  const [customInput, setCustomInput] = useState('');
  const [justLaunched, setJustLaunched] = useState(false);
  const [lastSelectedPrompt, setLastSelectedPrompt] = useState<string | null>(null);

  // Suggested prompts tailored to mood & music aesthetics
  const starterPrompts = [
    {
      title: 'Midnight Drive Heavyweight Hoodie',
      subtitle: 'Obsidian terry cotton with nocturnal synthwave vibes',
      icon: Flame,
      prompt: 'Can you recommend a Midnight Drive heavyweight hoodie inspired by The Weeknd with French terry cotton under ₹2,000?',
    },
    {
      title: 'Archival Fine Art Poster',
      subtitle: 'Giclée print with minimalist mood soundwaves',
      icon: Palette,
      prompt: 'Suggest an archival A2 art poster for my dorm wall under ₹1,200 matching a Soft Reset ambient mood.',
    },
    {
      title: 'Taylor Swift Inspired Capsule Look',
      subtitle: 'Streetwear silhouettes for nostalgia & acoustic tones',
      icon: Shirt,
      prompt: 'What streetwear pieces or accessories fit a Taylor Swift acoustic & nostalgic music vibe?',
    },
    {
      title: 'Chaos Energy Acid Rave Tee',
      subtitle: 'Boxy cut graphic streetwear with vibrant neon accents',
      icon: Sparkles,
      prompt: 'Style a high-energy boxy tee with electric purple accents inspired by hyperpop and club music.',
    },
  ];

  const handleLaunchChatbot = (promptText?: string) => {
    const textToSend = promptText || customInput.trim();
    if (textToSend) {
      setLastSelectedPrompt(textToSend);
    }
    setJustLaunched(true);
    openBotpressWebchat(textToSend || undefined);

    setTimeout(() => {
      setJustLaunched(false);
    }, 4000);
  };

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim().length > 0) {
      handleLaunchChatbot(initialPrompt);
    }
  }, [initialPrompt]);

  return (
    <section id="muse" className="py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-xs font-mono text-purple-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>OFFICIAL BOTPRESS AI INTEGRATION</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-3">
          VYBE Merch Stylist
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Connect directly with your published Botpress chatbot. Get real-time, album-inspired styling recommendations, limited-edition streetwear concepts, and custom capsule wardrobe ideas.
        </p>
      </div>

      {/* Main Stylist Console Deck */}
      <div className="rounded-3xl bg-gradient-to-b from-[#140d25]/95 via-[#0f091d]/90 to-[#090612]/95 border border-purple-500/20 shadow-2xl backdrop-blur-2xl overflow-hidden p-6 sm:p-8 lg:p-10 relative">
        {/* Glow Auras */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-pink-600/15 blur-3xl pointer-events-none" />

        {/* Top Status & Badge Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 p-[2px] shadow-lg shadow-purple-600/25">
              <div className="w-full h-full bg-[#0d0918] rounded-[14px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-purple-300" />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#090612] animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-white">
                  VYBE Merch Stylist
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Botpress Cloud Online
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Official Webchat v5.0 • Real-time AI Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400 bg-white/[0.03] px-3.5 py-2 rounded-xl border border-white/5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Botpress Bot</span>
            </div>

            {/* Direct Open Button */}
            <button
              type="button"
              id="open-merch-stylist-chat-btn"
              onClick={() => handleLaunchChatbot()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-display font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Open Chatbot Widget</span>
            </button>
          </div>
        </div>

        {/* Hero Interactive Launch Center */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>AUTHENTIC BOTPRESS AGENT</span>
            </div>
            <h4 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
              Ready to find merchandise tailored to your sound frequency?
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Our published Botpress bot answers questions about garment weights, silhouette cuts, archival paper stocks, prices in INR, and matching apparel for any mood or favorite artist.
            </p>

            {/* Primary "Find Your Merch" Entry Point */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                id="find-your-merch-main-btn"
                onClick={() => handleLaunchChatbot()}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500 text-white font-display font-black text-base shadow-xl shadow-purple-600/40 hover:shadow-purple-600/60 transition-all hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-pink-200 group-hover:rotate-12 transition-transform" />
                <span>Find Your Merch</span>
                <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => handleLaunchChatbot()}
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 hover:text-white font-medium text-xs sm:text-sm border border-white/10 transition-colors cursor-pointer"
              >
                <span>Floating Widget in Corner</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>

            {/* Feedback notification when launched */}
            {justLaunched && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-900/40 border border-purple-500/40 text-xs text-purple-200 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  VYBE Merch Stylist opened in the bottom-right corner!
                  {lastSelectedPrompt && ` Asking: "${lastSelectedPrompt.slice(0, 50)}..."`}
                </span>
              </div>
            )}
          </div>

          {/* Quick Chat Box / Prompt Handoff Field */}
          <div className="lg:col-span-5 bg-black/40 rounded-2xl border border-white/10 p-5 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-purple-400" />
                  <span>Ask the Stylist</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Ready
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-4">
                Type what you are looking for, or pick a starter prompt below to launch the Botpress session:
              </p>

              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleLaunchChatbot();
                      }
                    }}
                    placeholder="e.g. Find Midnight Drive hoodie under ₹2,000..."
                    className="w-full bg-[#110c1f] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleLaunchChatbot()}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>Send to VYBE Merch Stylist</span>
                </button>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Client: 9067a245-d743</span>
              <span>Bot: 42038a47-d4c0</span>
            </div>
          </div>
        </div>

        {/* Starter Styling Prompts Grid */}
        <div className="relative z-10 pt-6 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Instant Stylist Starters (Click to Chat)</span>
            </span>
            <span className="text-xs text-zinc-500 hidden sm:inline">
              Launches your Botpress conversation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {starterPrompts.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLaunchChatbot(item.prompt)}
                  className="text-left p-4 rounded-2xl bg-white/[0.03] hover:bg-purple-950/30 border border-white/5 hover:border-purple-500/30 transition-all hover:-translate-y-1 group flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-white/[0.05] group-hover:bg-purple-500/20 flex items-center justify-center mb-3 transition-colors">
                      <Icon className="w-4 h-4 text-purple-300 group-hover:text-pink-300 transition-colors" />
                    </div>
                    <h5 className="font-display font-bold text-sm text-white group-hover:text-purple-200 transition-colors mb-1">
                      {item.title}
                    </h5>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 flex items-center gap-1.5 text-[11px] font-mono text-purple-400 group-hover:text-pink-300 transition-colors">
                    <span>Ask Stylist</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
