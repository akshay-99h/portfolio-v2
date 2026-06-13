/**
 * Procedural Web Audio engine. Every sound is synthesized from oscillators and
 * filtered noise — no audio files, no dependency. Built for the site's
 * drafting/engineering language: dry mechanical clicks, a clean signal ping, a
 * low survey-room drone, and soft UI ticks.
 *
 * Browsers block audio until a user gesture, so the context starts suspended
 * and is resumed on the first interaction (see `unlock`).
 */

type SoundName =
  | "snap" // a module seating into the assembly
  | "ping" // the signal-corner keystone landing
  | "hover" // pointer over a mini-cube face
  | "click" // pressing a mini-cube face
  | "accent"; // section / interlude transition whoosh-tick

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let droneGain: GainNode | null = null;
let droneNodes: { osc: OscillatorNode; lfo: OscillatorNode }[] = [];
let unlocked = false;
let muted = true;
let started = false;

const listeners = new Set<(muted: boolean) => void>();

function notify() {
  for (const fn of listeners) {
    fn(muted);
  }
}

function ensureContext(): AudioContext | null {
  if (typeof window === "undefined") {
    return null;
  }
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) {
      return null;
    }
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.9;
    master.connect(ctx.destination);
  }
  return ctx;
}

/** One reusable noise buffer for percussive transients. */
let noiseBuffer: AudioBuffer | null = null;
function getNoise(context: AudioContext) {
  if (!noiseBuffer) {
    const len = Math.floor(context.sampleRate * 0.4);
    noiseBuffer = context.createBuffer(1, len, context.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return noiseBuffer;
}

/** A short filtered-noise transient — the body of a mechanical click. */
function transient(
  context: AudioContext,
  out: GainNode,
  {
    when,
    gain,
    freq,
    q,
    decay,
    type = "bandpass",
  }: {
    when: number;
    gain: number;
    freq: number;
    q: number;
    decay: number;
    type?: BiquadFilterType;
  },
) {
  const src = context.createBufferSource();
  src.buffer = getNoise(context);
  const filter = context.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = freq;
  filter.Q.value = q;
  const g = context.createGain();
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(gain, when + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, when + decay);
  src.connect(filter).connect(g).connect(out);
  src.start(when);
  src.stop(when + decay + 0.02);
}

/** A pitched tone with a fast attack and exponential tail. */
function tone(
  context: AudioContext,
  out: GainNode,
  {
    when,
    gain,
    freq,
    decay,
    type = "sine",
    detune = 0,
  }: {
    when: number;
    gain: number;
    freq: number;
    decay: number;
    type?: OscillatorType;
    detune?: number;
  },
) {
  const osc = context.createOscillator();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;
  const g = context.createGain();
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(gain, when + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, when + decay);
  osc.connect(g).connect(out);
  osc.start(when);
  osc.stop(when + decay + 0.02);
}

function playSnap(context: AudioContext, out: GainNode, t: number) {
  // dry, woody seat — a click with a touch of low body
  transient(context, out, {
    when: t,
    gain: 0.5,
    freq: 1800,
    q: 1.2,
    decay: 0.05,
  });
  tone(context, out, {
    when: t,
    gain: 0.18,
    freq: 150,
    decay: 0.08,
    type: "triangle",
  });
}

function playPing(context: AudioContext, out: GainNode, t: number) {
  // the keystone — a clean two-note signal in the teal register
  tone(context, out, {
    when: t,
    gain: 0.22,
    freq: 880,
    decay: 0.5,
    type: "sine",
  });
  tone(context, out, {
    when: t + 0.06,
    gain: 0.16,
    freq: 1320,
    decay: 0.6,
    type: "sine",
  });
  transient(context, out, {
    when: t,
    gain: 0.12,
    freq: 4200,
    q: 0.8,
    decay: 0.05,
    type: "highpass",
  });
}

function playHover(context: AudioContext, out: GainNode, t: number) {
  tone(context, out, {
    when: t,
    gain: 0.06,
    freq: 2200,
    decay: 0.04,
    type: "sine",
  });
}

function playClick(context: AudioContext, out: GainNode, t: number) {
  transient(context, out, {
    when: t,
    gain: 0.45,
    freq: 2600,
    q: 1.6,
    decay: 0.04,
  });
  tone(context, out, {
    when: t,
    gain: 0.14,
    freq: 520,
    decay: 0.09,
    type: "square",
  });
}

function playAccent(context: AudioContext, out: GainNode, t: number) {
  // a soft survey whoosh: rising filtered noise + faint tonal sweep
  const src = context.createBufferSource();
  src.buffer = getNoise(context);
  const filter = context.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(400, t);
  filter.frequency.exponentialRampToValueAtTime(2400, t + 0.35);
  filter.Q.value = 0.7;
  const g = context.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.1, t + 0.08);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
  src.connect(filter).connect(g).connect(out);
  src.start(t);
  src.stop(t + 0.45);
}

function startDrone(context: AudioContext) {
  if (droneGain || !master) {
    return;
  }
  droneGain = context.createGain();
  droneGain.gain.value = 0; // emphasis-driven; raised via setDroneLevel
  droneGain.connect(master);

  // Two slightly detuned low oscillators + a slow LFO on the filter.
  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 320;
  filter.Q.value = 0.6;
  filter.connect(droneGain);

  const lfo = context.createOscillator();
  lfo.frequency.value = 0.06;
  const lfoGain = context.createGain();
  lfoGain.gain.value = 90;
  lfo.connect(lfoGain).connect(filter.frequency);
  lfo.start();

  for (const [freq, detune] of [
    [55, -4],
    [82.4, 5],
  ] as const) {
    const osc = context.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    osc.detune.value = detune;
    const g = context.createGain();
    g.gain.value = 0.5;
    osc.connect(g).connect(filter);
    osc.start();
    droneNodes.push({ osc, lfo });
  }
}

const PLAYERS: Record<
  SoundName,
  (context: AudioContext, out: GainNode, t: number) => void
> = {
  snap: playSnap,
  ping: playPing,
  hover: playHover,
  click: playClick,
  accent: playAccent,
};

export const audio = {
  /** Resume the context after a user gesture. Idempotent. */
  unlock() {
    const context = ensureContext();
    if (!context) {
      return;
    }
    if (context.state === "suspended") {
      void context.resume();
    }
    if (!started) {
      startDrone(context);
      started = true;
    }
    unlocked = true;
  },

  play(name: SoundName) {
    if (muted || !unlocked) {
      return;
    }
    const context = ensureContext();
    if (!context || !master) {
      return;
    }
    PLAYERS[name](context, master, context.currentTime);
  },

  /**
   * Play a staggered burst of `count` snaps over `spread` seconds — used when
   * the assembly seats all its modules at once.
   */
  playAssembly(count: number, spread = 0.5) {
    if (muted || !unlocked) {
      return;
    }
    const context = ensureContext();
    if (!context || !master) {
      return;
    }
    const now = context.currentTime;
    const n = Math.min(count, 14);
    for (let i = 0; i < n; i++) {
      const jitter = Math.random() * 0.02;
      playSnap(context, master, now + (i / n) * spread + jitter);
    }
    playPing(context, master, now + spread + 0.04);
  },

  /** Drone level, 0..1 — driven by the cinematic emphasis each frame. */
  setDroneLevel(level: number) {
    if (!droneGain || !ctx) {
      return;
    }
    const target = muted ? 0 : Math.max(0, Math.min(1, level)) * 0.06;
    droneGain.gain.setTargetAtTime(target, ctx.currentTime, 0.3);
  },

  setMuted(value: boolean) {
    muted = value;
    if (master && ctx) {
      master.gain.setTargetAtTime(value ? 0 : 0.9, ctx.currentTime, 0.05);
    }
    if (droneGain && ctx && value) {
      droneGain.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
    }
    notify();
  },

  toggleMuted() {
    this.setMuted(!muted);
    return muted;
  },

  isMuted() {
    return muted;
  },

  isUnlocked() {
    return unlocked;
  },

  subscribe(fn: (muted: boolean) => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  /** Tear down (used if ever needed). */
  dispose() {
    for (const { osc, lfo } of droneNodes) {
      try {
        osc.stop();
        lfo.stop();
      } catch {
        // already stopped
      }
    }
    droneNodes = [];
    droneGain = null;
    started = false;
  },
};

export type { SoundName };
