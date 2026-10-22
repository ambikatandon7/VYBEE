import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Film, 
  Disc, 
  FolderPlus
} from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export const PromoVideo: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isDemoSynthPlaying, setIsDemoSynthPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoLoaded && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      // Toggle placeholder ambient motion sound
      if (isDemoSynthPlaying) {
        audioEngine.stop();
        setIsDemoSynthPlaying(false);
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        setIsDemoSynthPlaying(true);
        audioEngine.playChord('promo-placeholder', ['D3', 'A3', 'C4', 'E4'], 'midnight-drive', () => {
          setIsDemoSynthPlaying(false);
          setIsPlaying(false);
        });
      }
    }
  };

  const handleToggleMute = () => {
    if (videoLoaded && videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    } else {
      setIsMuted(!isMuted);
      if (isDemoSynthPlaying) {
        audioEngine.stop();
        setIsDemoSynthPlaying(false);
      }
    }
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoLoaded(false);
    setVideoError(true);
  };

  return (
    <section id="video" className="py-12 md:py-24 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-300 mb-3">
          <Film className="w-3.5 h-3.5 text-pink-400" />
          <span>CINEMATIC BRAND CAMPAIGN</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-3">
          The Sound of Who You Are
        </h2>
        <p className="text-sm sm:text-base text-zinc-400">
          Experience the visual mood board, audio engineering philosophy, and streetwear lookbook behind VYBE.
        </p>
      </div>

      {/* Video Player Frame with Glowing Glass Borders */}
      <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-white/10 via-purple-500/10 to-pink-500/10 border border-white/15 shadow-2xl backdrop-blur-xl">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#07040d] flex items-center justify-center">
          {/* Actual Video Tag attempting to load /videos/vybe-promo.mp4 */}
          <video
            ref={videoRef}
            src="/videos/vybe-promo.mp4"
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              videoLoaded ? 'opacity-100 block' : 'hidden'
            }`}
            muted={isMuted}
            loop
            playsInline
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
          />

          {/* Designed Editorial Motion Placeholder (When video is not present or error) */}
          {(!videoLoaded || videoError) && (
            <div className="absolute inset-0 bg-radial-aura bg-[#090613] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
              {/* Dynamic Aura Gradient Orbs */}
              <div className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-purple-600/25 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 right-1/4 w-72 h-72 rounded-full bg-pink-600/25 blur-3xl pointer-events-none" />

              {/* Central Graphic: Spinning Vinyl + Sonic Waves */}
              <div className="relative mb-6">
                <div
                  className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-violet-950 via-[#120a1f] to-zinc-950 border-2 border-purple-500/40 p-2 shadow-2xl flex items-center justify-center ${
                    isPlaying ? 'animate-spin-slow' : ''
                  }`}
                >
                  <div className="w-full h-full rounded-full border border-white/10 flex items-center justify-center bg-black/60">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-1 flex items-center justify-center shadow-lg">
                      <Disc className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Animated Pulsing Rings */}
                {isPlaying && (
                  <div className="absolute inset-0 rounded-full border border-pink-400/40 animate-ping pointer-events-none" />
                )}
              </div>

              {/* Placeholder Typography */}
              <div className="relative z-10 max-w-lg space-y-2 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/[0.04] text-purple-300 border border-white/10 inline-block">
                  PROMOTIONAL SHOWCASE // 02:00 MIN
                </span>
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
                  VYBE: A Sonic Identity Experiment
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
                  Interactive teaser preview. Click play below to audition the synthesized frequency trailer or inspect the setup instructions.
                </p>
              </div>

              {/* Action: Big Play Button */}
              <button
                type="button"
                onClick={handlePlayPause}
                className="relative z-10 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2.5 shadow-xl shadow-purple-600/30 transition-transform hover:scale-105 active:scale-95"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Pause Ambient Soundscape' : 'Play Sonic Teaser'}</span>
              </button>
            </div>
          )}

          {/* Sleek On-Screen Video Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePlayPause}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                type="button"
                onClick={handleToggleMute}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-xs font-mono text-zinc-300 hidden sm:inline">
                {videoLoaded ? '00:45 / 02:00' : 'VYBE Sonic Reel (Demo)'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowInstructions(!showInstructions)}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <FolderPlus className="w-3.5 h-3.5 text-purple-400" />
                <span>{showInstructions ? 'Hide Setup' : 'How to Add MP4'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Instructions for adding the local MP4 file */}
      {showInstructions && (
        <div className="mt-6 p-6 rounded-3xl bg-[#120a1f] border border-purple-500/30 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 shrink-0">
              <FolderPlus className="w-6 h-6" />
            </div>

            <div className="space-y-3 text-sm">
              <h4 className="font-display font-bold text-lg text-white">
                Adding Your Promo Video (`vybe-promo.mp4`)
              </h4>
              <p className="text-zinc-300 leading-relaxed">
                The video player is pre-configured to look for an MP4 file at the path <code className="px-2 py-0.5 rounded bg-black/60 text-purple-300 font-mono text-xs border border-white/10">/videos/vybe-promo.mp4</code>.
              </p>

              <div className="space-y-2 text-xs font-mono bg-black/50 p-4 rounded-xl border border-white/5">
                <p className="text-zinc-400">1. Place your video in the public directory:</p>
                <p className="text-emerald-400 font-bold">vybe/public/videos/vybe-promo.mp4</p>
                <p className="text-zinc-400 mt-2">2. Recommended video specifications:</p>
                <p className="text-zinc-300">• Format: H.264 / MP4 • Resolution: 1080p (1920x1080) • 16:9 widescreen</p>
                <p className="text-zinc-400 mt-2">3. Refresh the page: the video player will instantly switch from this motion placeholder to your local video file with complete audio & playback controls!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
