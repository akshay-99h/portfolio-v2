"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

import { SceneCanvas } from "@/components/gl/scene-canvas";
import { ContourTerrain } from "@/components/gl/scenes/contour-terrain";
import { DraftingWorld } from "@/components/gl/scenes/drafting-world";
import { audio } from "@/lib/audio/engine";

/**
 * Shared mutable drivers. The DOM section writes targets (scroll progress,
 * intro, pointer); the scene damps toward them every rendered frame and
 * keeps the demand-loop alive only while values are still settling.
 */
type AssemblyDrivers = {
  /** 0 = exploded technical drawing, 1 = seated object. */
  progress: number;
  /** 0 = nothing drawn yet, 1 = entrance complete. */
  intro: number;
  /** Normalized pointer, -1..1. */
  pointerX: number;
  pointerY: number;
  /** Document scroll progress, 0..1 — drives the object's tour of the page. */
  scroll: number;
  /** Registered by the scene on mount; lets DOM code request a frame. */
  kick?: () => void;
};

type Tone = "light" | "dark";

type HeroAssemblyProps = {
  drivers: React.RefObject<AssemblyDrivers>;
  tone: Tone;
};

/** Voxel grid: 3 modules per axis. */
const GRID = 3;
/** Center-to-center module pitch. */
const PITCH = 0.66;
const CUBE_SIZE = 0.58;
/** Overall object extent along one axis. */
const EXTENT = PITCH * (GRID - 1) + CUBE_SIZE;
/** Drawing envelope — the outline the object assembles into. */
const ENVELOPE = EXTENT + 0.18;

/** Deterministic per-module noise so the exploded state reads as composed. */
function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function signed(n: number) {
  return hash(n) * 2 - 1;
}

type VoxelConfig = {
  id: string;
  /** Seated position inside the brand cube. */
  seat: [number, number, number];
  /** Per-module drift so the exploded state reads as a composition. */
  drift: [number, number, number];
  /** Scatter rotation at the exploded state (radians). */
  scatter: [number, number, number];
};

/**
 * The brand cube, cut into twenty-seven modules. Ordered bottom-up so the
 * assembly reads like a build: foundation first, signal corner last.
 */
const VOXELS: VoxelConfig[] = (() => {
  const cells: VoxelConfig[] = [];
  let n = 0;
  for (let y = 0; y < GRID; y++) {
    for (let z = 0; z < GRID; z++) {
      for (let x = 0; x < GRID; x++) {
        const seed = n * 7.13;
        cells.push({
          id: `m-${x}${y}${z}`,
          seat: [(x - 1) * PITCH, (y - 1) * PITCH, (z - 1) * PITCH],
          drift: [
            signed(seed + 1) * 0.6,
            signed(seed + 2) * 0.35,
            signed(seed + 3) * 0.6,
          ],
          scatter: [
            signed(seed + 4) * 0.6,
            signed(seed + 5) * 0.6,
            signed(seed + 6) * 0.6,
          ],
        });
        n++;
      }
    }
  }

  // The signal corner — lands last, like the keystone.
  const signalIndex = cells.findIndex((cell) => cell.id === "m-222");
  const [signal] = cells.splice(signalIndex, 1);
  cells.push({ ...signal, id: "signal" });
  return cells;
})();

/** Per-module timing inside the assembly scrub. */
const ASSEMBLE_STAGGER = 0.014;
const ASSEMBLE_WINDOW = 0.6;
const BORN_STAGGER = 0.018;
const BORN_WINDOW = 0.45;

/** How far the exploded layout spreads, per axis (y kept tight for the floor). */
const SPREAD: [number, number, number] = [2.1, 1.5, 2.1];

const PALETTES: Record<
  Tone,
  {
    clay: [string, string, string];
    signal: string;
    edge: string;
    edgeOpacity: number;
    /** Surface finish — glossy so modules catch light and read as
     *  distinct faces against the page background. */
    clayRoughness: number;
    clayMetalness: number;
    signalRoughness: number;
    /** Rim-fill light tint. */
    rim: string;
  }
> = {
  light: {
    clay: ["#d8d0bf", "#cdc5b2", "#e2dbcb"],
    signal: "#2aa49d",
    edge: "#131310",
    edgeOpacity: 0.5,
    clayRoughness: 0.4,
    clayMetalness: 0.3,
    signalRoughness: 0.32,
    rim: "#fdf4e0",
  },
  dark: {
    clay: ["#3a3f38", "#30352f", "#474c44"],
    signal: "#2dbab4",
    edge: "#e8e5de",
    edgeOpacity: 0.65,
    clayRoughness: 0.38,
    clayMetalness: 0.45,
    signalRoughness: 0.3,
    rim: "#bfeae6",
  },
};

/** True isometric view — the angle the logotype cube is drawn at. */
const ISO_X = Math.atan(1 / Math.SQRT2);
const ISO_Y = Math.PI / 4;

/**
 * The object's tour of the page, keyed by document scroll progress.
 * x/y are in "safe range" units: -1..1 of the viewport minus the object's
 * own footprint, so the object can never crop at an edge.
 */
type Waypoint = { at: number; x: number; y: number; s: number };

/**
 * The object's tour, re-keyed for two cinematic interludes (full-height,
 * pinned beats) that sit at ~0.22 and ~0.66 of document scroll. At each the
 * cube takes the empty stage: it rushes large to fill the frame, then later
 * shrinks to a distant speck. Content sections fall between these peaks.
 *
 * Scroll map (landscape):
 *   0.00  hero — seated right
 *   0.16  hero pin completes
 *   0.22  INTERLUDE 1 — center, huge (fills frame), explodes/reassembles
 *   0.36  method — left rail, mid
 *   0.52  work index — right, mid
 *   0.66  INTERLUDE 2 — center, tiny distant speck, re-explodes
 *   0.82  field notes — left
 *   1.00  brief/footer — settles center
 */
const TRAVEL_LANDSCAPE: Waypoint[] = [
  { at: 0.0, x: 0.92, y: 0.05, s: 1 }, // hero — seated in the right column
  { at: 0.16, x: 0.92, y: 0.05, s: 1 }, // holds through the pinned assembly
  { at: 0.22, x: 0.0, y: 0.0, s: 2.25 }, // INTERLUDE 1 — fills the frame
  { at: 0.36, x: -0.85, y: -0.18, s: 0.6 }, // method — crosses to the left rail
  { at: 0.52, x: 0.88, y: 0.15, s: 0.55 }, // work index — back right
  { at: 0.66, x: 0.0, y: 0.1, s: 0.22 }, // INTERLUDE 2 — distant speck
  { at: 0.82, x: -0.85, y: 0.0, s: 0.55 }, // field notes — left again
  { at: 1.0, x: 0.0, y: -0.25, s: 0.7 }, // brief/footer — settles center
];

const TRAVEL_PORTRAIT: Waypoint[] = [
  { at: 0.0, x: 0.0, y: -0.45, s: 0.8 },
  { at: 0.16, x: 0.0, y: -0.45, s: 0.8 },
  { at: 0.22, x: 0.0, y: 0.0, s: 1.7 }, // INTERLUDE 1 — fills the (narrow) frame
  { at: 0.36, x: -0.7, y: 0.1, s: 0.5 },
  { at: 0.52, x: 0.7, y: 0.1, s: 0.45 },
  { at: 0.66, x: 0.0, y: 0.1, s: 0.2 }, // INTERLUDE 2 — distant speck
  { at: 0.82, x: -0.7, y: 0.05, s: 0.45 },
  { at: 1.0, x: 0.0, y: -0.3, s: 0.55 },
];

/**
 * Form track keyed to document scroll: 0 = exploded technical drawing,
 * 1 = seated solid object. The cube blows apart and reforms at each
 * interlude so the empty stage reads as a live reassembly, then holds
 * seated through the content sections between them.
 */
type FormKey = { at: number; form: number };

const ASSEMBLY_TRACK: FormKey[] = [
  { at: 0.16, form: 1 }, // leaves the hero fully seated
  { at: 0.19, form: 0.05 }, // INTERLUDE 1 — flies apart on entry
  { at: 0.25, form: 1 }, // ...and snaps back together
  { at: 0.62, form: 1 }, // holds seated through method/work
  { at: 0.66, form: 0.05 }, // INTERLUDE 2 — explodes again
  { at: 0.7, form: 1 }, // reassembles
  { at: 1.0, form: 1 },
];

function sampleForm(progress: number) {
  const t = clamp01(progress);
  if (t <= ASSEMBLY_TRACK[0].at) {
    return ASSEMBLY_TRACK[0].form;
  }
  let from = ASSEMBLY_TRACK[0];
  let to = ASSEMBLY_TRACK[ASSEMBLY_TRACK.length - 1];
  for (let i = 0; i < ASSEMBLY_TRACK.length - 1; i++) {
    if (t >= ASSEMBLY_TRACK[i].at && t <= ASSEMBLY_TRACK[i + 1].at) {
      from = ASSEMBLY_TRACK[i];
      to = ASSEMBLY_TRACK[i + 1];
      break;
    }
  }
  const span = to.at - from.at;
  const k =
    span > 0 ? THREE.MathUtils.smoothstep((t - from.at) / span, 0, 1) : 1;
  return THREE.MathUtils.lerp(from.form, to.form, k);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function sampleTravel(points: Waypoint[], progress: number) {
  const t = clamp01(progress);
  let from = points[0];
  let to = points[points.length - 1];
  for (let i = 0; i < points.length - 1; i++) {
    if (t >= points[i].at && t <= points[i + 1].at) {
      from = points[i];
      to = points[i + 1];
      break;
    }
  }
  const span = to.at - from.at;
  const k =
    span > 0 ? THREE.MathUtils.smoothstep((t - from.at) / span, 0, 1) : 1;
  return {
    x: THREE.MathUtils.lerp(from.x, to.x, k),
    y: THREE.MathUtils.lerp(from.y, to.y, k),
    s: THREE.MathUtils.lerp(from.s, to.s, k),
  };
}

/**
 * Window of document scroll where the cube is fully seated and centred enough
 * to invite interaction — between the hero pin completing and the second
 * interlude. Hover/click on the mini-cube faces is only live in here.
 */
const INTERACTIVE_FROM = 0.16;
const INTERACTIVE_TO = 0.62;

function HeroAssemblyObject({
  drivers,
  tone,
  onInteractiveChange,
}: HeroAssemblyProps & { onInteractiveChange?: (live: boolean) => void }) {
  const palette = PALETTES[tone];

  const rigRef = React.useRef<THREE.Group>(null);
  const voxelRefs = React.useRef<(THREE.Group | null)[]>([]);
  const solidMats = React.useRef<THREE.MeshStandardMaterial[]>([]);
  const edgeMat = React.useRef<THREE.LineBasicMaterial>(null);

  // Per-voxel interaction state, eased toward each frame:
  //  hover  → lifts toward 1 while the pointer is over a face
  //  press  → spikes to 1 on click then decays (the "signal flash")
  const hover = React.useRef<Float32Array>(new Float32Array(VOXELS.length));
  const press = React.useRef<Float32Array>(new Float32Array(VOXELS.length));
  const hoverTarget = React.useRef<Float32Array>(
    new Float32Array(VOXELS.length),
  );
  // Base colors captured once so flashes can lerp from them back to rest.
  const baseColors = React.useRef<THREE.Color[]>([]);
  const flashColor = React.useMemo(
    () => new THREE.Color(palette.signal),
    [palette.signal],
  );

  // Whether the cube currently accepts pointer interaction (drives the DOM
  // canvas pointer-events toggle so the page still scrolls everywhere else).
  const interactive = React.useRef(false);
  // Tracks the seated form so assembly snap/ping sounds fire on the rising edge.
  const wasSeated = React.useRef(false);

  // Damped simulation state (targets live in `drivers`).
  const sim = React.useRef({
    progress: 0,
    intro: 0,
    pointerX: 0,
    pointerY: 0,
    scroll: 0,
  });

  // Reduced motion keeps the cube seated through the interludes instead of
  // exploding it; the scroll-keyed travel (position/scale) still applies so
  // the object remains where each section expects it.
  const reducedMotion = React.useRef(false);
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = media.matches;
    const onChange = (event: MediaQueryListEvent) => {
      reducedMotion.current = event.matches;
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  // Envelope wireframe: build once, dispose on unmount.
  const envelopeGeom = React.useMemo(() => {
    const box = new THREE.BoxGeometry(ENVELOPE, ENVELOPE, ENVELOPE);
    const edges = new THREE.EdgesGeometry(box);
    box.dispose();
    return edges;
  }, []);

  React.useEffect(() => {
    return () => envelopeGeom.dispose();
  }, [envelopeGeom]);

  useFrame((state, delta) => {
    const target = drivers.current;
    const s = sim.current;
    const dt = Math.min(delta, 1 / 30);

    let settling = false;
    const keys = [
      "progress",
      "intro",
      "pointerX",
      "pointerY",
      "scroll",
    ] as const;
    for (const key of keys) {
      const lambda = key === "pointerX" || key === "pointerY" ? 5 : 9;
      const next = THREE.MathUtils.damp(s[key], target[key], lambda, dt);
      if (Math.abs(target[key] - next) > 1e-4) {
        settling = true;
      }
      s[key] = next;
    }

    const p = s.progress;
    const intro = s.intro;
    const time = state.clock.elapsedTime;

    // The cube's form has two drivers that hand off cleanly:
    //  • the hero pin (`progress`) seats it during the first scroll, and
    //  • the scroll-keyed `ASSEMBLY_TRACK` re-explodes/reforms it at each
    //    cinematic interlude further down the page.
    // The hero owns the form until its assembly completes (~scroll 0.16);
    // past that, the document-scroll track takes over.
    const heroAssemble = THREE.MathUtils.smoothstep(p, 0.08, 0.92);
    // Reduced motion holds the form seated past the hero (no explode beats).
    const trackForm = reducedMotion.current ? 1 : sampleForm(s.scroll);
    const handoff = THREE.MathUtils.smoothstep(s.scroll, 0.14, 0.18);
    const assembleBase = THREE.MathUtils.lerp(heroAssemble, trackForm, handoff);

    // --- Assembly sound: fire snap-burst + keystone ping on the rising edge
    // of "seated" (form crosses ~0.92), so each reassembly beat is audible.
    const seatedNow = assembleBase > 0.92;
    if (seatedNow && !wasSeated.current) {
      audio.playAssembly(VOXELS.length, 0.45);
    }
    wasSeated.current = seatedNow;

    // --- Interactive window: cube seated AND within the inviting scroll band.
    const live =
      !reducedMotion.current &&
      seatedNow &&
      s.scroll >= INTERACTIVE_FROM &&
      s.scroll <= INTERACTIVE_TO;
    if (live !== interactive.current) {
      interactive.current = live;
      onInteractiveChange?.(live);
    }

    // Rotation also continues past the hero so the form reads in 3D during
    // the interludes; once seated it follows the slow tour rotation below.
    const rotDrive = Math.max(THREE.MathUtils.smoothstep(p, 0, 0.9), handoff);
    const rotT = easeInOutCubic(rotDrive);

    const rig = rigRef.current;
    if (rig) {
      // The whole viewport is the playground: the object walks a waypoint
      // path keyed to document scroll, clamped so it can never crop.
      const { viewport } = state;
      const route =
        viewport.width >= viewport.height ? TRAVEL_LANDSCAPE : TRAVEL_PORTRAIT;
      const travel = sampleTravel(route, s.scroll);
      const footprint = ENVELOPE * 0.78 * travel.s;
      const safeX = Math.max(0, viewport.width / 2 - footprint);
      const safeY = Math.max(0, viewport.height / 2 - footprint);

      // Slow tour rotation once the hero assembly has finished.
      const tour = THREE.MathUtils.smoothstep(s.scroll, 0.28, 1);

      // Flat "drawing" angle → the logotype's isometric angle.
      rig.rotation.x =
        THREE.MathUtils.lerp(0.24, ISO_X, rotT) +
        s.pointerY * -0.06 +
        tour * 0.12;
      rig.rotation.y =
        THREE.MathUtils.lerp(-0.62, ISO_Y, rotT) +
        s.pointerX * 0.09 +
        tour * Math.PI * 0.75;
      rig.position.x = travel.x * safeX + s.pointerX * 0.1;
      rig.position.y =
        travel.y * safeY + THREE.MathUtils.lerp(-0.08, 0.08, assembleBase);
      rig.scale.setScalar((0.9 + 0.1 * intro) * travel.s);
    }

    // Idle "breathe" once seated — a slow whole-object pulse, plus a soft
    // float; both fade to zero while the object is in motion (assembling).
    // Reduced motion freezes the idle drift and the signal pulse entirely.
    const idle = reducedMotion.current ? 0 : 1;
    const seatedAmt = THREE.MathUtils.smoothstep(assembleBase, 0.8, 1) * idle;
    const breathe = Math.sin(time * 1.1) * 0.5 + 0.5; // 0..1

    VOXELS.forEach((voxel, i) => {
      const group = voxelRefs.current[i];
      if (!group) {
        return;
      }

      // Each module gets its own assembly window — foundation first.
      const t = easeInOutCubic(
        clamp01((assembleBase - i * ASSEMBLE_STAGGER) / ASSEMBLE_WINDOW),
      );
      // ...and its own entrance beat.
      const born = THREE.MathUtils.smoothstep(
        intro,
        i * BORN_STAGGER,
        i * BORN_STAGGER + BORN_WINDOW,
      );

      // Ease hover + press toward their targets (press decays to 0 on its own).
      hover.current[i] = THREE.MathUtils.damp(
        hover.current[i],
        hoverTarget.current[i] * seatedAmt,
        12,
        dt,
      );
      press.current[i] = THREE.MathUtils.damp(press.current[i], 0, 6, dt);
      const h = hover.current[i];
      const pr = press.current[i];

      // Idle float: per-module phase offset so the seated object shimmers
      // gently rather than moving as one rigid block.
      const phase = i * 0.5;
      const floatY =
        seatedAmt * (Math.sin(time * 0.9 + phase) * 0.012 + breathe * 0.01);
      // Hover lifts the face toward the viewer; press punches it in briefly.
      const lift = h * 0.06 - pr * 0.05;

      group.position.set(
        THREE.MathUtils.lerp(
          voxel.seat[0] * SPREAD[0] + voxel.drift[0],
          voxel.seat[0],
          t,
        ),
        THREE.MathUtils.lerp(
          voxel.seat[1] * SPREAD[1] + voxel.drift[1],
          voxel.seat[1],
          t,
        ) + floatY,
        THREE.MathUtils.lerp(
          voxel.seat[2] * SPREAD[2] + voxel.drift[2],
          voxel.seat[2],
          t,
        ) + lift,
      );
      group.rotation.set(
        voxel.scatter[0] * (1 - t),
        voxel.scatter[1] * (1 - t),
        voxel.scatter[2] * (1 - t),
      );
      // Hover swells the module slightly; press dents it.
      group.scale.setScalar(born * (1 + h * 0.05 - pr * 0.08));
    });

    // Signal corner pulse: the keystone (last voxel) breathes the teal accent
    // even at rest, so the eye always finds the signal.
    const signalIdx = VOXELS.length - 1;
    const signalPulse = seatedAmt * (Math.sin(time * 2.0) * 0.5 + 0.5);

    solidMats.current.forEach((mat, i) => {
      mat.opacity = intro;
      const base = baseColors.current[i];
      if (!base) {
        return;
      }
      // Flash strength: press flash + hover tint + (signal corner) idle pulse.
      let flash = press.current[i] * 0.9 + hover.current[i] * 0.25;
      if (i === signalIdx) {
        flash = Math.max(flash, signalPulse * 0.4);
      }
      mat.color.copy(base).lerp(flashColor, clamp01(flash));
      const targetEmissive = clamp01(flash) * (i === signalIdx ? 0.6 : 0.4);
      mat.emissive.copy(flashColor);
      mat.emissiveIntensity = targetEmissive;
    });
    if (edgeMat.current) {
      // The drawing stays faintly present even once the object is seated.
      edgeMat.current.opacity =
        palette.edgeOpacity *
        intro *
        (1 - 0.55 * THREE.MathUtils.smoothstep(p, 0.55, 0.95));
    }

    // Drone swells with the cube's presence — loud when seated/large, quiet
    // when exploded or shrunk to a distant speck.
    audio.setDroneLevel(seatedAmt * 0.7 + 0.15);

    // Keep the demand loop alive while the object breathes, while any face is
    // hovered/flashing, or while values are still settling.
    let activeFlash = signalPulse > 0.001;
    for (let i = 0; i < VOXELS.length; i++) {
      if (press.current[i] > 0.002 || hover.current[i] > 0.002) {
        activeFlash = true;
        break;
      }
    }
    if (settling || seatedAmt > 0.001 || activeFlash) {
      state.invalidate();
    }
  });

  const registerSolid = (mat: THREE.MeshStandardMaterial | null) => {
    if (mat && !solidMats.current.includes(mat)) {
      baseColors.current[solidMats.current.length] = mat.color.clone();
      solidMats.current.push(mat);
    }
  };

  // Pointer handlers, only honoured while the cube is in its interactive window.
  const handleOver = (i: number) => {
    if (!interactive.current) {
      return;
    }
    hoverTarget.current[i] = 1;
    audio.play("hover");
    drivers.current.kick?.();
  };
  const handleOut = (i: number) => {
    hoverTarget.current[i] = 0;
    drivers.current.kick?.();
  };
  const handleDown = (i: number) => {
    if (!interactive.current) {
      return;
    }
    press.current[i] = 1;
    audio.play(i === VOXELS.length - 1 ? "ping" : "click");
    drivers.current.kick?.();
  };

  return (
    <>
      <ambientLight intensity={tone === "dark" ? 0.55 : 0.85} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={tone === "dark" ? 1.5 : 1.1}
      />
      <directionalLight position={[-5, 2, -2]} intensity={0.35} />
      {/* Rim fill so glossy faces pick up a sheen against the page. */}
      <directionalLight
        position={[-3, 4, 5]}
        intensity={tone === "dark" ? 0.7 : 0.55}
        color={palette.rim}
      />

      <group ref={rigRef}>
        {/* The drawing envelope the object assembles into. */}
        <lineSegments geometry={envelopeGeom}>
          <lineBasicMaterial
            ref={edgeMat}
            color={palette.edge}
            transparent
            opacity={0}
          />
        </lineSegments>

        {VOXELS.map((voxel, i) => (
          <group
            key={voxel.id}
            ref={(el) => {
              voxelRefs.current[i] = el;
            }}
          >
            <RoundedBox
              args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]}
              radius={0.045}
              smoothness={8}
              onPointerOver={(event) => {
                event.stopPropagation();
                handleOver(i);
              }}
              onPointerOut={() => handleOut(i)}
              onPointerDown={(event) => {
                event.stopPropagation();
                handleDown(i);
              }}
            >
              <meshStandardMaterial
                ref={registerSolid}
                color={
                  voxel.id === "signal"
                    ? palette.signal
                    : palette.clay[i % palette.clay.length]
                }
                roughness={
                  voxel.id === "signal"
                    ? palette.signalRoughness
                    : palette.clayRoughness
                }
                metalness={palette.clayMetalness}
                transparent
                opacity={0}
              />
            </RoundedBox>
          </group>
        ))}
      </group>
    </>
  );
}

/** Registers the demand-loop kick so DOM-side GSAP can request frames. */
function KickBridge({
  drivers,
}: {
  drivers: React.RefObject<AssemblyDrivers>;
}) {
  const invalidate = useThree((state) => state.invalidate);

  React.useEffect(() => {
    const target = drivers.current;
    target.kick = invalidate;
    return () => {
      target.kick = undefined;
    };
  }, [drivers, invalidate]);

  return null;
}

/**
 * Bridges the in-scene "interactive" flag to the DOM: the cube's canvas lives
 * inside a `pointer-events-none` fixed layer so the page scrolls/clicks
 * normally. While the cube is interactive we flip the canvas itself to
 * `pointer-events: auto` (so faces can be hovered/clicked) and forward wheel
 * events back to the window so Lenis keeps scrolling underneath it.
 */
function CanvasInteractivity({ live }: { live: boolean }) {
  const gl = useThree((state) => state.gl);

  React.useEffect(() => {
    const canvas = gl.domElement;
    if (!live) {
      canvas.style.pointerEvents = "none";
      canvas.style.touchAction = "";
      return;
    }
    canvas.style.pointerEvents = "auto";
    // Let touch scrolling pass through on mobile; wheel is forwarded below.
    canvas.style.touchAction = "pan-y";

    const forwardWheel = (event: WheelEvent) => {
      window.scrollBy({ top: event.deltaY, behavior: "auto" });
    };
    canvas.addEventListener("wheel", forwardWheel, { passive: true });
    return () => {
      canvas.removeEventListener("wheel", forwardWheel);
      canvas.style.pointerEvents = "none";
      canvas.style.touchAction = "";
    };
  }, [gl, live]);

  return null;
}

function HeroAssemblyCanvas({ drivers, tone }: HeroAssemblyProps) {
  const [interactive, setInteractive] = React.useState(false);

  return (
    <SceneCanvas className="h-full w-full" fov={32} cameraZ={8.5}>
      <KickBridge drivers={drivers} />
      <CanvasInteractivity live={interactive} />
      {/* The living survey sheet — breathes behind the whole page. */}
      <ContourTerrain drivers={drivers} tone={tone} />
      {/* The drafting world — grid, benchmarks, dimensions, graphite, horizon.
          Sits between the map and the object; richest in hero + interludes. */}
      <DraftingWorld drivers={drivers} tone={tone} />
      <HeroAssemblyObject
        drivers={drivers}
        tone={tone}
        onInteractiveChange={setInteractive}
      />
    </SceneCanvas>
  );
}

// Shared with the drafting world so dimension lines wrap the real cube
// (single source of truth for the object's travel + footprint).
export {
  HeroAssemblyCanvas,
  sampleTravel,
  sampleForm,
  TRAVEL_LANDSCAPE,
  TRAVEL_PORTRAIT,
  ENVELOPE,
  ISO_X,
  ISO_Y,
};
export type { AssemblyDrivers, Tone, Waypoint };
