import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Share2, 
  Sparkles, 
  ExternalLink, 
  Disc, 
  Info, 
  ShoppingBag, 
  MessageSquare, 
  Check, 
  Search, 
  Plus, 
  X, 
  SlidersHorizontal,
  Flame,
  Waves,
  Heart,
  Sun,
  Radio,
  Music2
} from 'lucide-react';
import type { RecommendationResult } from '../utils/recommendationEngine';
import { getSongsForMoodAndArtists } from '../utils/recommendationEngine';
import { audioEngine } from '../utils/audioSynth';
import { VIBE_PROFILES } from '../data/vibeData';
import { POPULAR_CATALOG_ARTISTS } from '../data/songCatalog';
import { getStoredArtists, saveStoredArtists } from '../utils/storage';
import type { VibeId } from '../types/vibe';

interface ResultsSectionProps {
  result: RecommendationResult;
  onRetake: () => void;
  onGoToMerch: (vibeId: string) => void;
  onGoToMuse: (prompt: string) => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  result,
  onRetake,
  onGoToMerch,
  onGoToMuse,
}) => {
  // Active mood frequency (can be switched directly without retaking quiz)
  const [activeVibeId, setActiveVibeId] = useState<VibeId>(result.vibe.id);
  const activeVibe = VIBE_PROFILES[activeVibeId] || result.vibe;

  // Active favorite artists list
  const [artists, setArtists] = useState<string[]>(() => {
    if (result.userArtists && result.userArtists.length > 0) return result.userArtists;
    const stored = getStoredArtists();
    return stored.length > 0 ? stored : ['Taylor Swift'];
  });

  const [artistInput, setArtistInput] = useState('');
  const [songs, setSongs] = useState(result.personalizedSongs);
  const [hasUncataloged, setHasUncataloged] = useState(result.hasUncatalogedArtist);
  const [uncatalogedName, setUncatalogedName] = useState(result.uncatalogedArtistName);

  const [playingSongId, setPlayingSongId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Recalculate songs whenever activeVibeId or artists change
  useEffect(() => {
    const outcome = getSongsForMoodAndArtists(activeVibeId, artists);
    setSongs(outcome.songs);
    setHasUncataloged(outcome.hasUncatalogedArtist);
    setUncatalogedName(outcome.uncatalogedArtistName);
  }, [activeVibeId, artists]);

  const handleAddArtist = (nameToAdd: string) => {
    const trimmed = nameToAdd.trim();
    if (!trimmed) return;
    if (!artists.some((a) => a.toLowerCase() === trimmed.toLowerCase())) {
      const updated = [trimmed, ...artists].slice(0, 4);
      setArtists(updated);
      saveStoredArtists(updated);
    }
    setArtistInput('');
  };

  const handleRemoveArtist = (artistToRemove: string) => {
    const updated = artists.filter((a) => a !== artistToRemove);
    setArtists(updated);
    saveStoredArtists(updated);
  };

  const handlePlayTone = (songId: string, notes: string[]) => {
    if (playingSongId === songId) {
      audioEngine.stop();
      setPlayingSongId(null);
    } else {
      const success = audioEngine.playChord(songId, notes, activeVibe.id, () => {
        setPlayingSongId(null);
      });
      if (success) {
        setPlayingSongId(songId);
      }
    }
  };

  const handleShare = () => {
    const textToCopy = `My VYBE is "${activeVibe.name}" featuring songs by ${artists.join(', ') || 'curated artists'}! 🎵✨ Discover your soundtrack on VYBE.`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const allVibeKeys: VibeId[] = [
    'midnight-drive',
    'soft-reset',
    'main-character',
    'golden-hour',
    'heartbreak-club',
    'chaos-energy',
  ];

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
    <section id="results" className="py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Top Match Identified Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-purple-300 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>FREQUENCY MATCH IDENTIFIED</span>
          <span className="text-zinc-600">•</span>
          <span className="font-bold text-white">{result.confidenceScore}% RESONANCE</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight mb-4">
          Your Vibe is <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300">{activeVibe.name}</span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 font-medium italic mb-4">
          "{activeVibe.tagline}"
        </p>

        <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          {artists.length > 0
            ? `Recommendations tuned for ${artists.join(' & ')} matching your ${activeVibe.name} frequency.`
            : activeVibe.description}
        </p>
      </div>

      {/* Main Result Showcase Card with Vibe's Signature Aura */}
      <div
        className={`relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b ${activeVibe.auraGradient} border border-white/15 shadow-2xl backdrop-blur-2xl mb-12 overflow-hidden`}
      >
        {/* Glow Accent Sphere */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: activeVibe.accentColor }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          {/* Left: Editorial Narrative & Mood Tags */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                Sonic Profile Analysis
              </span>
              <p className="text-base sm:text-lg text-zinc-200 leading-relaxed">
                {activeVibe.description}
              </p>
            </div>

            {/* Mood Tags */}
            <div className="flex flex-wrap gap-2">
              {activeVibe.moodTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/15 backdrop-blur-md"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Sonic Specifications Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-black/30 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Tempo</span>
                <span className="text-sm font-bold text-white font-mono">{activeVibe.sonicStats.tempo}</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/30 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Key Center</span>
                <span className="text-sm font-bold text-white font-mono">{activeVibe.sonicStats.dominantKey}</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/30 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Tuning Hz</span>
                <span className="text-sm font-bold text-white font-mono">{activeVibe.sonicStats.frequency}</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/30 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Spectrum</span>
                <span className="text-sm font-bold text-white font-mono truncate">{activeVibe.sonicStats.energySpectrum.split(' ')[0]}</span>
              </div>
            </div>
          </div>

          {/* Right: Album-Inspired Generative Visual Concept */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl p-5 bg-[#08050e] border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden group">
              {/* Spinning Vinyl Simulation */}
              <div
                className={`absolute -right-16 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-zinc-950 border-4 border-zinc-800 shadow-2xl transition-transform duration-700 flex items-center justify-center ${
                  playingSongId ? 'translate-x-6 animate-spin-slow' : 'group-hover:translate-x-4'
                }`}
              >
                {/* Vinyl Grooves */}
                <div className="w-40 h-40 rounded-full border border-zinc-800 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-zinc-700/60 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-1 flex items-center justify-center shadow-inner">
                      <div className="w-4 h-4 rounded-full bg-[#08050e] border border-white/30" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sleeve Cover Graphics */}
              <div className="relative z-10 w-44 sm:w-48 h-full rounded-xl p-4 bg-gradient-to-tr from-zinc-900 to-zinc-950 border border-white/10 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest block mb-1">
                    VYBE STUDIOS // VOL. 01
                  </span>
                  <h4 className="font-display font-black text-sm text-white leading-tight">
                    {activeVibe.albumConcept.title}
                  </h4>
                </div>

                {/* Abstract Visual Center */}
                <div className="w-full h-20 rounded-lg overflow-hidden relative my-2 bg-gradient-to-br from-violet-600/30 to-pink-600/30 border border-white/10 flex items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-full blur-md opacity-70"
                    style={{ backgroundColor: activeVibe.accentColor }}
                  />
                  <Disc className="w-8 h-8 text-white/80 relative z-10" />
                </div>

                <div>
                  <p className="text-[10px] text-zinc-400 line-clamp-2">
                    {activeVibe.albumConcept.visualStyle}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-2 right-3 z-10">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/80 text-zinc-300 border border-white/10">
                  ALBUM CANVAS
                </span>
              </div>
            </div>

            <p className="text-[11px] font-mono text-zinc-400 mt-3 text-center">
              Album Concept: <span className="text-white font-medium">{activeVibe.albumConcept.title}</span>
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* INTERACTIVE CONTROLS: MOOD FILTERS & ARTIST SEARCH (No Quiz Repeat) */}
        {/* ------------------------------------------------------------------- */}
        <div className="p-6 rounded-3xl bg-black/50 border border-white/10 mb-8 space-y-6">
          {/* Mood Filter Switcher */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-pink-400" />
                <span>Explore Other Mood Frequencies:</span>
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                Active: <strong className="text-white">{activeVibe.name}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {allVibeKeys.map((vKey) => {
                const v = VIBE_PROFILES[vKey];
                const Icon = getVibeIcon(vKey);
                const isSelected = activeVibeId === vKey;

                return (
                  <button
                    key={vKey}
                    type="button"
                    onClick={() => setActiveVibeId(vKey)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-purple-600/30 border-purple-400 text-white shadow-md shadow-purple-600/20'
                        : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-pink-400' : 'text-zinc-500'}`} />
                    <span className="text-xs font-semibold truncate">{v.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Artist Search & Input Field */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <label htmlFor="results-artist-input" className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold flex items-center gap-2">
                <Search className="w-4 h-4 text-purple-400" />
                <span>Filter or Add Favourite Artist:</span>
              </label>
              <span className="text-[11px] text-zinc-400">
                Change artist anytime without retaking the quiz.
              </span>
            </div>

            {/* Input + Search/Add Button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddArtist(artistInput);
              }}
              className="flex gap-2 mb-3"
            >
              <div className="relative flex-1">
                <input
                  id="results-artist-input"
                  type="text"
                  value={artistInput}
                  onChange={(e) => setArtistInput(e.target.value)}
                  placeholder="Enter artist (e.g. Taylor Swift, The Weeknd, Arijit Singh, Kendrick Lamar)..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Update Songs</span>
              </button>
            </form>

            {/* Active Selected Artist Chips */}
            {artists.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-mono text-zinc-400">Currently Filtering:</span>
                {artists.map((artist) => (
                  <span
                    key={artist}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/40 text-xs font-semibold animate-in fade-in"
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

            {/* Quick-Pick Popular Artists from Catalogue */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1.5">
                Quick Select Verified Catalogue Artists:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_CATALOG_ARTISTS.map((catArtist) => {
                  const isSelected = artists.some(
                    (a) => a.toLowerCase() === catArtist.toLowerCase()
                  );
                  return (
                    <button
                      key={catArtist}
                      type="button"
                      onClick={() => handleAddArtist(catArtist)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-purple-600/30 text-purple-300 border-purple-500/40 font-bold'
                          : 'bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {catArtist}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* UNCATALOGED ARTIST NOTICE BANNER (Requirement 5)                    */}
        {/* ------------------------------------------------------------------- */}
        {hasUncataloged && uncatalogedName && (
          <div className="rounded-2xl p-4 bg-amber-950/40 border border-amber-500/30 flex items-start gap-3 mb-8 animate-in fade-in">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200 leading-relaxed">
              <strong className="text-white font-semibold">Artist Not in Local Catalogue:</strong> We do not invent fake song titles for artists outside our verified database. For <strong>"{uncatalogedName}"</strong>, we have generated direct <strong>YouTube & Spotify search links</strong> below so you can listen immediately, alongside verified benchmark tracks matching your <strong>{activeVibe.name}</strong> mood.
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* REAL SONG RECOMMENDATIONS LIST                                      */}
        {/* ------------------------------------------------------------------- */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <Music2 className="w-5 h-5 text-purple-400" />
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                Recommended Real Songs ({songs.length} Tracks)
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              Mood: <span className="text-purple-300 font-semibold">{activeVibe.name}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {songs.map((song, idx) => {
              const isPlaying = playingSongId === song.id;
              const ytSearchUrl =
                song.youtubeUrl ||
                `https://www.youtube.com/results?search_query=${encodeURIComponent(`${song.artist} ${song.title}`)}`;
              const spSearchUrl =
                song.spotifyUrl ||
                `https://open.spotify.com/search/${encodeURIComponent(`${song.artist} ${song.title}`)}`;

              return (
                <div
                  key={song.id}
                  className={`rounded-2xl p-5 border flex flex-col justify-between group transition-all duration-300 shadow-xl ${
                    song.isExternalSearchFallback
                      ? 'bg-gradient-to-b from-[#1f102a] to-[#120a1c] border-purple-500/40'
                      : 'bg-[#0d091a]/90 hover:bg-[#120d22] border-white/10 hover:border-purple-500/40'
                  }`}
                >
                  <div>
                    {/* Header: Track Number, Badge, Year & Duration */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-6 h-6 rounded-full bg-white/10 text-[11px] font-mono font-bold text-purple-300 flex items-center justify-center border border-white/10">
                        0{idx + 1}
                      </span>

                      {song.isExternalSearchFallback ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          LIVE SEARCH
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-zinc-400">
                          {song.album} • {song.year}
                        </span>
                      )}
                    </div>

                    {/* Actual Song Title */}
                    <h4 className="font-display font-black text-xl text-white group-hover:text-purple-200 transition-colors mb-1 leading-snug">
                      {song.title}
                    </h4>

                    {/* Correct Real Artist Name */}
                    <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2.5">
                      {song.artist}
                    </p>

                    {/* Explanation of Why It Matches the Mood */}
                    <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                      {song.reason}
                    </p>
                  </div>

                  {/* Real Clickable Streaming / Search Links */}
                  <div className="pt-3 border-t border-white/[0.08] space-y-2">
                    <div className="flex items-center gap-2">
                      {/* Listen on YouTube Button */}
                      <a
                        href={ytSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-200 hover:text-white border border-red-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                        title={`Listen to ${song.title} by ${song.artist} on YouTube`}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                        <span>YouTube</span>
                      </a>

                      {/* Find on Spotify Button */}
                      <a
                        href={spSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-200 hover:text-white border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                        title={`Find ${song.title} by ${song.artist} on Spotify`}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Spotify</span>
                      </a>
                    </div>

                    {/* Harmonic Tone Preview (Web Audio Synth) */}
                    <button
                      type="button"
                      onClick={() => handlePlayTone(song.id, song.synthNotes)}
                      className={`w-full py-1.5 px-3 rounded-lg text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all ${
                        isPlaying
                          ? 'bg-pink-600 text-white shadow-md animate-pulse'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-zinc-200 border border-white/5'
                      }`}
                      aria-label={`${isPlaying ? 'Stop' : 'Play'} harmonic tone preview for ${song.title}`}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3 h-3 fill-current" />
                          <span>Playing Frequency Chord...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" />
                          <span>Harmonic Tone Preview ({song.bpm} BPM)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons: Retake, Share, Style with Merch Muse, Explore Merch */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onRetake}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/10 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Mood Quiz</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs sm:text-sm font-medium border border-white/10 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Vibe Copied to Clipboard!' : 'Share Vibe'}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onGoToMuse(`I got the ${activeVibe.name} vibe with ${artists.join(', ')}! Can you style a custom capsule wardrobe for me?`)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 text-xs sm:text-sm font-semibold border border-purple-500/30 transition-all hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span>Style with Merch Muse</span>
            </button>

            <button
              onClick={() => onGoToMerch(activeVibe.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Matching Merch</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
