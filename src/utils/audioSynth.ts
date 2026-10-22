// Web Audio API Synthesizer for Demo Audio Previews
// Generates warm ambient chords and audio frequencies for each vibe without external audio dependencies

class AudioEngine {
  private ctx: AudioContext | null = null;
  private activeNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private isPlaying = false;
  private currentPlayingId: string | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Frequency mapping for standard notes
  private noteToFreq(note: string): number {
    const notes: Record<string, number> = {
      'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
      'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'Eb3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00,
      'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
      'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99,
      'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
      'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'G5': 783.99,
    };
    return notes[note] || 261.63;
  }

  public playChord(
    songId: string,
    notes: string[],
    vibeType: string,
    onEnded?: () => void
  ): boolean {
    this.stop();

    try {
      this.initContext();
      if (!this.ctx) return false;

      this.isPlaying = true;
      this.currentPlayingId = songId;

      const now = this.ctx.currentTime;
      const duration = 4.5; // 4.5 second lush ambient chord burst

      // Master output gain
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.28, now + 0.4);
      masterGain.gain.exponentialRampToValueAtTime(0.20, now + 3.0);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Low-pass warm filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      
      // Filter frequency customized by vibe style
      if (vibeType === 'chaos-energy') {
        filter.frequency.setValueAtTime(3800, now);
      } else if (vibeType === 'midnight-drive') {
        filter.frequency.setValueAtTime(950, now);
      } else if (vibeType === 'soft-reset') {
        filter.frequency.setValueAtTime(750, now);
      } else {
        filter.frequency.setValueAtTime(1400, now);
      }

      filter.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      // Create polyphonic voices
      notes.forEach((note, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        // Waveform styling
        if (vibeType === 'chaos-energy') {
          osc.type = index % 2 === 0 ? 'sawtooth' : 'triangle';
        } else if (vibeType === 'soft-reset') {
          osc.type = 'sine';
        } else {
          osc.type = index === 0 ? 'sawtooth' : 'triangle';
        }

        const freq = this.noteToFreq(note);
        // Slight subtle chorus detune for warmth
        const detune = (index - 1.5) * 8;
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime(detune, now);

        // Stagger note attack slightly for strum / harp feel
        const noteStart = now + index * 0.08;
        noteGain.gain.setValueAtTime(0.001, noteStart);
        noteGain.gain.exponentialRampToValueAtTime(0.35, noteStart + 0.2);

        osc.connect(noteGain);
        noteGain.connect(filter);

        osc.start(noteStart);
        osc.stop(now + duration);

        this.activeNodes.push({ osc, gain: noteGain });
      });

      // Cleanup on end
      setTimeout(() => {
        if (this.currentPlayingId === songId) {
          this.isPlaying = false;
          this.currentPlayingId = null;
          if (onEnded) onEnded();
        }
      }, duration * 1000);

      return true;
    } catch {
      return false;
    }
  }

  public stop() {
    this.activeNodes.forEach(({ osc }) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
    this.currentPlayingId = null;
  }

  public getCurrentPlayingId(): string | null {
    return this.currentPlayingId;
  }

  public isAudioPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioEngine = new AudioEngine();
