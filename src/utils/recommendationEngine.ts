import type { VibeId, VibeProfile, DemoSong } from '../types/vibe';
import { VIBE_PROFILES } from '../data/vibeData';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { SONG_CATALOG, type CatalogSong } from '../data/songCatalog';

export interface RecommendationResult {
  vibe: VibeProfile;
  confidenceScore: number;
  userArtists: string[];
  personalizedSongs: DemoSong[];
  matchSummary: string;
  hasUncatalogedArtist?: boolean;
  uncatalogedArtistName?: string;
}

// Convert a CatalogSong into the DemoSong format with exact real details
function catalogSongToDemoSong(cs: CatalogSong, moodContext?: string): DemoSong {
  return {
    id: cs.id,
    title: cs.title,
    artist: cs.artist,
    album: cs.album,
    year: cs.year,
    duration: cs.duration,
    bpm: cs.bpm,
    reason: moodContext ? `${cs.reason} (Matched for ${moodContext})` : cs.reason,
    audioFreqHz: 440,
    synthNotes: cs.synthNotes,
    coverGradient: cs.coverGradient,
    youtubeUrl: cs.youtubeUrl,
    spotifyUrl: cs.spotifyUrl,
    isCatalogMatch: true,
  };
}

// Helper to find real songs matching an artist and mood
export function getSongsForMoodAndArtists(
  vibeId: VibeId,
  favoriteArtists: string[]
): { songs: DemoSong[]; hasUncatalogedArtist: boolean; uncatalogedArtistName?: string } {
  const cleanedArtists = favoriteArtists
    .map((a) => a.trim())
    .filter((a) => a.length > 0);

  const vibe = VIBE_PROFILES[vibeId];

  // If no artist entered, return verified catalogue songs for this mood
  if (cleanedArtists.length === 0) {
    const verifiedForMood = SONG_CATALOG.filter((song) => song.moods.includes(vibeId));
    const selected = (verifiedForMood.length > 0 ? verifiedForMood : SONG_CATALOG).slice(0, 3);
    return {
      songs: selected.map((s) => catalogSongToDemoSong(s)),
      hasUncatalogedArtist: false,
    };
  }

  // Check matching songs for user-specified artists
  const matchedFromCatalog: DemoSong[] = [];
  let uncatalogedArtist: string | null = null;

  cleanedArtists.forEach((artistInput) => {
    const query = artistInput.toLowerCase();

    // 1. Direct match: Artist name contains query or vice versa, AND song matches vibe
    const exactMatches = SONG_CATALOG.filter(
      (song) =>
        (song.artist.toLowerCase().includes(query) || query.includes(song.artist.toLowerCase())) &&
        song.moods.includes(vibeId)
    );

    // 2. If no exact mood match for this artist, find any song by this artist in the catalogue
    const anyMatchesForArtist = SONG_CATALOG.filter(
      (song) => song.artist.toLowerCase().includes(query) || query.includes(song.artist.toLowerCase())
    );

    if (exactMatches.length > 0) {
      exactMatches.forEach((s) => {
        if (!matchedFromCatalog.some((m) => m.id === s.id)) {
          matchedFromCatalog.push(catalogSongToDemoSong(s));
        }
      });
    } else if (anyMatchesForArtist.length > 0) {
      // Artist exists in catalog, but songs are tagged with other moods
      anyMatchesForArtist.slice(0, 2).forEach((s) => {
        if (!matchedFromCatalog.some((m) => m.id === s.id)) {
          matchedFromCatalog.push(
            catalogSongToDemoSong(s, `crossover appeal into the ${vibe.name} frequency`)
          );
        }
      });
    } else {
      // Artist not found in local catalogue!
      uncatalogedArtist = artistInput;
    }
  });

  // If the user's artist is not in the catalogue, DO NOT invent fake song titles!
  // Instead, create a dedicated Search Result entry with direct YouTube and Spotify links,
  // and backfill with verified real songs matching this mood.
  const finalSongs: DemoSong[] = [...matchedFromCatalog];

  if (uncatalogedArtist && finalSongs.length === 0) {
    const searchTarget = uncatalogedArtist;
    const moodQuery = vibe.name;

    // Generate accurate live search entry without inventing fictitious tracks
    const liveSearchEntry: DemoSong = {
      id: `search-${Date.now()}`,
      title: `${searchTarget} — [Live ${vibe.name} Search]`,
      artist: searchTarget,
      album: `Search: ${searchTarget} ${moodQuery}`,
      year: '2026',
      duration: 'External Search',
      bpm: parseInt(vibe.sonicStats.tempo) || 96,
      reason: `"${searchTarget}" is not in our local catalogue. Click below to find their verified ${vibe.name.toLowerCase()} tracks directly on YouTube and Spotify.`,
      audioFreqHz: 432,
      synthNotes: ['D3', 'F3', 'A3', 'C4'],
      coverGradient: 'from-purple-900 via-indigo-950 to-black',
      youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${searchTarget} ${moodQuery} songs`)}`,
      spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(searchTarget)}`,
      isExternalSearchFallback: true,
      isCatalogMatch: false,
    };

    finalSongs.push(liveSearchEntry);

    // Complement with 2 real verified songs from this vibe so the user still gets real recommendations
    const vibeComplements = SONG_CATALOG.filter((s) => s.moods.includes(vibeId));
    vibeComplements.slice(0, 2).forEach((s) => {
      finalSongs.push(catalogSongToDemoSong(s, `verified ${vibe.name} benchmark`));
    });

    return {
      songs: finalSongs,
      hasUncatalogedArtist: true,
      uncatalogedArtistName: searchTarget,
    };
  }

  // If we have fewer than 3 songs, fill with verified real tracks for this mood
  if (finalSongs.length < 3) {
    const complements = SONG_CATALOG.filter(
      (s) => s.moods.includes(vibeId) && !finalSongs.some((f) => f.title === s.title)
    );
    complements.slice(0, 3 - finalSongs.length).forEach((s) => {
      finalSongs.push(catalogSongToDemoSong(s));
    });
  }

  return {
    songs: finalSongs.slice(0, 4),
    hasUncatalogedArtist: Boolean(uncatalogedArtist),
    uncatalogedArtistName: uncatalogedArtist || undefined,
  };
}

export function calculateVibeRecommendation(
  answers: Record<number, string>,
  favoriteArtists: string[]
): RecommendationResult {
  // Initialize score map for each of the 6 vibes
  const scores: Record<VibeId, number> = {
    'midnight-drive': 0,
    'soft-reset': 0,
    'main-character': 0,
    'golden-hour': 0,
    'heartbreak-club': 0,
    'chaos-energy': 0,
  };

  // Tally weights from user's selected answers
  QUIZ_QUESTIONS.forEach((question) => {
    const selectedOptionId = answers[question.id];
    if (selectedOptionId) {
      const option = question.options.find((opt) => opt.id === selectedOptionId);
      if (option) {
        (Object.keys(option.vibeWeights) as VibeId[]).forEach((vibeKey) => {
          scores[vibeKey] += option.vibeWeights[vibeKey] || 0;
        });
      }
    }
  });

  // Find the vibe with the maximum score
  let maxVibeId: VibeId = 'midnight-drive';
  let maxScore = -1;

  (Object.keys(scores) as VibeId[]).forEach((vibeId) => {
    if (scores[vibeId] > maxScore) {
      maxScore = scores[vibeId];
      maxVibeId = vibeId;
    }
  });

  const baseVibe = VIBE_PROFILES[maxVibeId];
  const totalPossible = 25;
  const confidenceScore = Math.min(99, Math.max(84, Math.round((maxScore / totalPossible) * 100) + 12));

  const cleanedArtists = favoriteArtists
    .map((a) => a.trim())
    .filter((a) => a.length > 0);

  const { songs, hasUncatalogedArtist, uncatalogedArtistName } = getSongsForMoodAndArtists(
    maxVibeId,
    cleanedArtists
  );

  let matchSummary = `Your responses aligned ${confidenceScore}% with the sonic blueprint of ${baseVibe.name}. `;
  if (cleanedArtists.length > 0) {
    if (hasUncatalogedArtist) {
      matchSummary += `We generated live search links for "${uncatalogedArtistName}" alongside verified catalogue recommendations that fit your ${baseVibe.name} headspace.`;
    } else {
      matchSummary += `Recommending actual tracks by ${cleanedArtists.join(', ')} precision-matched to your mood frequency.`;
    }
  } else {
    matchSummary += `Calibrated to deliver your optimal tempo, frequency resonance, and aesthetic vibe with verified songs.`;
  }

  return {
    vibe: baseVibe,
    confidenceScore,
    userArtists: cleanedArtists,
    personalizedSongs: songs,
    matchSummary,
    hasUncatalogedArtist,
    uncatalogedArtistName,
  };
}
