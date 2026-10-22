# VYBE — Your Mood. Your Music. Your World.

> **College AI Project Demo**  
> A premium mood-based music discovery and album-inspired merchandise web application. Built with Vite, React 19, TypeScript, Tailwind CSS, Web Audio API, and persistent client-side storage.

---

## 🌟 Overview & Aesthetic

**VYBE** is an editorial music discovery platform that maps your emotional state to a deterministic soundscape frequency, curates demo tracks blended with your favorite artists, and pairs your mood with original streetwear merchandise concepts via **The Merch Muse** AI stylist.

### Design System:
- **Palette**: Near-black void background (`#08050e`), electric purple (`#8b5cf6`), deep violet (`#7c3aed`), and vibrant neon/soft pink (`#ec4899`, `#f43f5e`) with glowing accents.
- **Typography**: Google Fonts **Syne** (bold editorial display) & **Plus Jakarta Sans** (clean modern body).
- **Glassmorphism**: Backdrop blur with subtle borders and custom ambient grain overlay.
- **Micro-Interactions**: Spinning vinyl record animations, polyphonic Web Audio API synthesized harmonic chords on song preview, and celebratory confetti effects.

---

## 🚀 Key Features

1. **Editorial Landing Page**:
   - Hero section with headline *"Your mood has a soundtrack."*
   - Interactive spectrum preview of the 6 signature vibes.
   - Streetwear capsule teaser and trust badge.

2. **Interactive 5-Question Mood Quiz**:
   - One question per screen with visual progress indicators (`Step X of 5 • X%`).
   - Questions covering:
     1. Emotional Frequency (Headspace)
     2. Sonic Velocity (Tempo / BPM internal rhythm)
     3. Cinematic Setting (Visual scenery)
     4. Sonic Texture (Analog synths, felt piano, brass, distortion, etc.)
     5. Emotional Outcome & Favorite Artists Input (with quick-add chips for *The Weeknd, Lana Del Rey, Kendrick Lamar, Charli xcx, Taylor Swift, Frank Ocean, A.R. Rahman, Prateek Kuhad, Fred again..*).
   - Validation on every step with Back and Next controls.

3. **Real Song Recommendation Engine**:
   - Classifies responses into one of six signature vibes:
     - **Midnight Drive** (85-105 BPM, Moody Synthwave/R&B, D Minor)
     - **Soft Reset** (65-80 BPM, Warm Ambient/Lo-Fi, G Major, 528 Hz)
     - **Main Character** (115-130 BPM, Anthemic Pop/Alt-Rock, F# Minor)
     - **Golden Hour** (90-112 BPM, Neo-Soul/Indie Groove, Eb Major)
     - **Heartbreak Club** (75-95 BPM, Cathartic Dark Indie, C Minor)
     - **Chaos Energy** (140-165 BPM, Glitched Hyperpop/Breakcore, E Minor)
   - **Curated Catalogue of Real Songs**: Real, correctly attributed tracks from artists including **Taylor Swift, The Weeknd, Arijit Singh, Kendrick Lamar, Billie Eilish, Lana Del Rey, Frank Ocean, Charli xcx, Prateek Kuhad, A.R. Rahman, Fred again.., Cigarettes After Sex, SZA, Travis Scott, Coldplay**.
   - **Direct Streaming Search Links**:
     - Clickable **"Listen on YouTube"** button opening exact search query for song and artist.
     - Clickable **"Find on Spotify"** button opening exact Spotify search for song and artist.
   - **Interactive Mood Switcher & Artist Input**: Change artists or switch moods directly in the results view without having to retake the quiz!
   - **Uncataloged Artist Handling**: If an artist is not in the local catalogue, generates live YouTube and Spotify search links for the artist's mood music without inventing fictional song titles.
   - Clickable **Harmonic Tone Preview** button synthesizing ambient harmonic chords using the browser's native **Web Audio API**.
   - Retake quiz and Share Vibe clipboard action.

4. **The Merch Muse (AI Streetwear Stylist)**:
   - Polished chatbot interface with stylist avatar, online indicator, and typing animation.
   - Starter prompts for quick styling.
   - Rule-based parser analyzing artist, vibe, apparel type, and budget in INR.
   - Generates 3 original album-inspired merchandise concepts with product name, type, demo price in INR, design description, and hex color swatches.
   - Working **Add to Wishlist** button.
   - Clean architecture prepared for drop-in replacement with a **Botpress Webchat** embed.

5. **The Merch Vault (Featured Merchandise Store)**:
   - Category filters: *All Artifacts, Heavyweight Tees, Archival Posters, Canvas Totes, Accessories*.
   - Mood filter dropdown.
   - High-fidelity original abstract mockups rendered with CSS/SVG generative visual art (geometric, gradient mesh, typography, chromatic aberration, minimalist).
   - Quick-View modal with full garment specs, sizing selector, and wishlist toggle.

6. **Promotional Video Studio**:
   - Cinema-ratio 16:9 video player with glowing glass borders.
   - Attempts to stream `/videos/vybe-promo.mp4`.
   - If no video file exists, gracefully renders an interactive animated editorial motion placeholder with sound toggle.
   - Expandable guide detailing where to drop the local MP4 file.

7. **Persistent Wishlist Slide-Out Drawer**:
   - Saved items persisted in `localStorage`.
   - Displays item count, INR pricing, and total demo sum.
   - Individual item deletion and "Clear All".
   - "Simulate Demo Order" checkout flow with confetti celebration modal.

8. **Footer**:
   - Project overview, How It Works 4-step summary, navigation links, and college evaluation disclaimer.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Sound Synthesis**: Native Browser **Web Audio API** Polyphonic Synthesizer
- **Celebration FX**: `canvas-confetti`
- **Storage**: Client-side reactive `localStorage`

---

## ⚙️ Installation & Running Locally

### Prerequisites:
- **Node.js** (v18.0 or later, installed version: v24.20 LTS)
- **npm** (v9.0 or later)

### Exact Commands:

1. Open PowerShell or Terminal and navigate to the project root:
   ```powershell
   cd c:\Users\Amibika\.antigravity-ide\vybe
   ```

2. Install dependencies (if not already installed):
   ```powershell
   npm install
   ```

3. Start the development server:
   ```powershell
   npm run dev -- --host
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

5. To build for production:
   ```powershell
   npm run build
   ```

---

## 📂 Project Structure

```
vybe/
├── public/
│   ├── favicon.svg                # VYBE neon gradient favicon
│   ├── videos/
│   │   ├── README.txt             # Instructions for adding vybe-promo.mp4
│   │   └── vybe-promo.mp4         # (Optional local MP4 file)
├── src/
│   ├── types/
│   │   ├── vibe.ts                # VibeProfile, DemoSong, VibeId
│   │   ├── quiz.ts                # QuizQuestion, QuizOption, QuizState
│   │   ├── merch.ts               # MerchItem, MerchCategory, WishlistItem
│   │   └── chat.ts                # ChatMessage, MerchConcept
│   ├── data/
│   │   ├── vibeData.ts            # 6 deterministic vibe profiles & demo tracks
│   │   ├── quizData.ts            # 5 interactive quiz questions & weights
│   │   └── merchData.ts           # 12 featured original merchandise artifacts
│   ├── utils/
│   │   ├── recommendationEngine.ts # Deterministic mood scoring & artist synergy
│   │   ├── audioSynth.ts          # Web Audio API polyphonic chord synthesizer
│   │   └── storage.ts             # Reactive localStorage wishlist persistence
│   ├── components/
│   │   ├── Navbar.tsx             # Header with logo, nav links & wishlist trigger
│   │   ├── HeroSection.tsx        # Hero with headline, CTAs & 6-vibe spectrum
│   │   ├── QuizSection.tsx        # 5-question step-by-step mood quiz & artist tags
│   │   ├── ResultsSection.tsx     # Result showcase with spinning vinyl & audio preview
│   │   ├── MerchMuseChat.tsx      # AI stylist chat with INR concepts & Botpress readiness
│   │   ├── MerchStore.tsx         # The Merch Vault with category filters & quick view
│   │   ├── PromoVideo.tsx         # Video player with fallback motion placeholder
│   │   ├── WishlistDrawer.tsx     # Persistent slide-out cart & checkout simulation
│   │   └── Footer.tsx             # About, How it Works & college demo disclaimers
│   ├── index.css                  # Tailwind CSS, Google Fonts, dark editorial tokens
│   ├── App.tsx                    # Main layout coordinator and state manager
│   └── main.tsx                   # React 19 entrypoint
├── index.html                     # HTML shell with fonts and metadata
├── vite.config.ts                 # Vite config with React and Tailwind plugins
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Project scripts and dependencies
```

---

## 🔧 External Configuration (Optional Enhancements)

This project runs 100% locally out-of-the-box without requiring paid API keys or backend services. The following items can be optionally configured for external integrations:

1. **Promotional Video (`vybe-promo.mp4`)**:
   - Location: Place an MP4 file at `c:\Users\Amibika\.antigravity-ide\vybe\public\videos\vybe-promo.mp4`.
   - Once placed, the Promo Studio will automatically play your video file.

2. **Botpress Chatbot Embed**:
   - In `src/components/MerchMuseChat.tsx`, set `USE_BOTPRESS_EMBED = true`.
   - Add your Botpress webchat script tags in `index.html` to replace the local rule-based AI engine with a live Botpress bot instance.

3. **External Music Streaming APIs**:
   - Currently, song preview buttons synthesize harmonic ambient chords using the Web Audio API and provide an external search shortcut. To connect live Spotify playback, a Spotify Developer Client ID and OAuth flow can be added.

---

## 🎓 Academic Evaluation Disclaimer

VYBE is a prototype created for a college AI and frontend engineering presentation. All song recommendations and merchandise concepts are curated academic demonstrations. Prices in INR (₹) are fictional.
