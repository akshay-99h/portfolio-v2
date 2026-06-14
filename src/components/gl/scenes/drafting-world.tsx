"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

import {
  type AssemblyDrivers,
  ENVELOPE,
  sampleForm,
  sampleTravel,
  type Tone,
  TRAVEL_LANDSCAPE,
  TRAVEL_PORTRAIT,
} from "@/components/gl/scenes/hero-assembly";

type DraftingWorldProps = {
  drivers: React.RefObject<AssemblyDrivers>;
  tone: Tone;
};

/** Ink + signal, matched to the site tokens. Lines never use a third hue. */
const WORLD_PALETTE: Record<
  Tone,
  { ink: string; signal: string; rule: number }
> = {
  light: { ink: "#131310", signal: "#168f8a", rule: 0.14 },
  dark: { ink: "#f3f1ec", signal: "#2dbab4", rule: 0.16 },
};

/**
 * Canonical scroll anchors, shared with the cube travel + terrain regions so
 * every layer of the world lines up on the same beats.
 *   0.00 hero · 0.16 hero-pin · 0.22 INTERLUDE 1 · 0.36 method
 *   0.52 work · 0.66 INTERLUDE 2 · 0.82 field notes · 1.00 brief
 */
const HERO = 0.0;
const INTERLUDE_1 = 0.22;
const INTERLUDE_2 = 0.66;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

type Key = { at: number; v: number };

/** Smoothstep-lerp a 1-D keyframe track (same shape used across the scenes). */
function sampleKey(track: Key[], scroll: number) {
  const t = clamp01(scroll);
  if (t <= track[0].at) {
    return track[0].v;
  }
  let from = track[0];
  let to = track[track.length - 1];
  for (let i = 0; i < track.length - 1; i++) {
    if (t >= track[i].at && t <= track[i + 1].at) {
      from = track[i];
      to = track[i + 1];
      break;
    }
  }
  const span = to.at - from.at;
  const k =
    span > 0 ? THREE.MathUtils.smoothstep((t - from.at) / span, 0, 1) : 1;
  return THREE.MathUtils.lerp(from.v, to.v, k);
}

/**
 * Master emphasis: the whole instrument array swells in the hero and the two
 * cinematic interludes, and nearly vanishes behind the dense content sections
 * so type stays legible.
 */
const EMPHASIS_TRACK: Key[] = [
  { at: 0.0, v: 1.0 }, // hero — full drawing
  { at: 0.16, v: 0.85 }, // hero pin completing
  { at: 0.22, v: 1.0 }, // INTERLUDE 1 — full
  { at: 0.3, v: 0.14 }, // dropping into method
  { at: 0.36, v: 0.12 }, // method — quiet
  { at: 0.52, v: 0.12 }, // work — quiet
  { at: 0.6, v: 0.95 }, // rising into interlude 2
  { at: 0.66, v: 1.0 }, // INTERLUDE 2 — full
  { at: 0.74, v: 0.12 }, // dropping into field notes
  { at: 0.82, v: 0.12 }, // field notes — quiet
  { at: 1.0, v: 0.22 }, // brief — settles, faint
];

/** Distance (0..1) to the nearest of two interlude anchors, for "near a beat". */
function beatFocus(scroll: number) {
  const d1 = Math.abs(scroll - INTERLUDE_1);
  const d2 = Math.abs(scroll - INTERLUDE_2);
  const dHero = Math.abs(scroll - HERO);
  const d = Math.min(d1, d2, dHero);
  return clamp01(1 - d / 0.12);
}

/** Current cube footprint in world units at this scroll (matches the rig). */
function cubeFootprint(landscape: boolean, scroll: number) {
  const route = landscape ? TRAVEL_LANDSCAPE : TRAVEL_PORTRAIT;
  const travel = sampleTravel(route, scroll);
  return { scale: travel.s, half: ENVELOPE * 0.5 * travel.s };
}

/* ------------------------------------------------------------------ */
/* Reference grid — the paper coordinate space the object sits inside. */
/* ------------------------------------------------------------------ */

const GRID_HALF = 14;
const GRID_LINES = 24;

function buildGridGeometry() {
  const positions: number[] = [];
  const step = (GRID_HALF * 2) / GRID_LINES;
  for (let i = 0; i <= GRID_LINES; i++) {
    const p = -GRID_HALF + i * step;
    // lines parallel to X
    positions.push(-GRID_HALF, p, 0, GRID_HALF, p, 0);
    // lines parallel to Y
    positions.push(p, -GRID_HALF, 0, p, GRID_HALF, 0);
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geom;
}

const GRID_OPACITY_TRACK: Key[] = [
  { at: 0.0, v: 0.9 },
  { at: 0.22, v: 1.0 },
  { at: 0.36, v: 0.4 },
  { at: 0.66, v: 1.0 },
  { at: 1.0, v: 0.5 },
];

function ReferenceGrid({ drivers, tone }: DraftingWorldProps) {
  const palette = WORLD_PALETTE[tone];
  const groupRef = React.useRef<THREE.Group>(null);
  const matRef = React.useRef<THREE.LineBasicMaterial>(null);
  const sim = React.useRef({ opacity: 0, tilt: 0, emphasis: 0 });

  const geom = React.useMemo(() => buildGridGeometry(), []);
  React.useEffect(() => () => geom.dispose(), [geom]);

  React.useEffect(() => {
    if (matRef.current) {
      matRef.current.color.set(palette.ink);
    }
  }, [palette]);

  useFrame((state, delta) => {
    const target = drivers.current;
    const s = sim.current;
    const dt = Math.min(delta, 1 / 30);
    const scroll = target.scroll;

    const emphasis = sampleKey(EMPHASIS_TRACK, scroll);
    const gridV = sampleKey(GRID_OPACITY_TRACK, scroll);
    const tiltGoal = 0.85 + 0.18 * sampleKey(GRID_OPACITY_TRACK, scroll);

    let settling = false;
    const step = (key: "opacity" | "tilt" | "emphasis", goal: number) => {
      const next = THREE.MathUtils.damp(s[key], goal, 4, dt);
      if (Math.abs(goal - next) > 1e-4) settling = true;
      s[key] = next;
    };
    step("emphasis", emphasis);
    step("opacity", gridV);
    step("tilt", tiltGoal);

    const group = groupRef.current;
    if (group) {
      // Lay the grid back like a sheet receding in perspective; drift slowly.
      group.rotation.x = -1.05 + s.tilt * 0.2;
      group.position.y = -2.4;
      group.position.x = -scroll * 3.4;
    }
    if (matRef.current) {
      matRef.current.opacity = palette.rule * s.opacity * s.emphasis * 1.4;
    }
    if (settling) state.invalidate();
  });

  return (
    <group ref={groupRef} position={[0, -2.4, -3]}>
      <lineSegments geometry={geom}>
        <lineBasicMaterial
          ref={matRef}
          color={palette.ink}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Benchmark pins — surveyor landmarks planted across the survey field. */
/* ------------------------------------------------------------------ */

type Pin = { at: number; x: number; z: number };

const PINS: Pin[] = [
  { at: 0.0, x: -5.5, z: -2.5 },
  { at: 0.22, x: 4.8, z: -1.5 },
  { at: 0.36, x: -3.4, z: -3.5 },
  { at: 0.52, x: 5.6, z: -4.0 },
  { at: 0.66, x: -6.0, z: -2.0 },
  { at: 1.0, x: 2.4, z: -5.0 },
];

function BenchmarkPin({
  pin,
  drivers,
  tone,
}: {
  pin: Pin;
  drivers: React.RefObject<AssemblyDrivers>;
  tone: Tone;
}) {
  const palette = WORLD_PALETTE[tone];
  const matRef = React.useRef<THREE.MeshBasicMaterial>(null);
  const ringMatRef = React.useRef<THREE.MeshBasicMaterial>(null);
  const sim = React.useRef({ lit: 0 });
  const inkColor = React.useMemo(
    () => new THREE.Color(palette.ink),
    [palette.ink],
  );
  const signalColor = React.useMemo(
    () => new THREE.Color(palette.signal),
    [palette.signal],
  );
  const tmp = React.useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const scroll = drivers.current.scroll;
    const dt = Math.min(delta, 1 / 30);
    const emphasis = sampleKey(EMPHASIS_TRACK, scroll);

    // This pin lights as its own region comes into view.
    const proximity = clamp01(1 - Math.abs(scroll - pin.at) / 0.1);
    const litGoal = proximity;
    const next = THREE.MathUtils.damp(sim.current.lit, litGoal, 4, dt);
    const settling = Math.abs(litGoal - next) > 1e-4;
    sim.current.lit = next;

    const base = 0.18 + 0.6 * sim.current.lit;
    if (matRef.current) {
      tmp.copy(inkColor).lerp(signalColor, sim.current.lit);
      matRef.current.color.copy(tmp);
      matRef.current.opacity = base * emphasis;
    }
    if (ringMatRef.current) {
      ringMatRef.current.color.copy(signalColor);
      ringMatRef.current.opacity = 0.5 * sim.current.lit * emphasis;
    }
    if (settling) state.invalidate();
  });

  return (
    <group position={[pin.x, -2.0, pin.z]}>
      {/* pillar */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.9, 6]} />
        <meshBasicMaterial
          ref={matRef}
          color={palette.ink}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
      {/* benchmark ring at the base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.22, 0.26, 24]} />
        <meshBasicMaterial
          ref={ringMatRef}
          color={palette.signal}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function BenchmarkPins({ drivers, tone }: DraftingWorldProps) {
  return (
    <>
      {PINS.map((pin) => (
        <BenchmarkPin
          key={`${pin.at}-${pin.x}`}
          pin={pin}
          drivers={drivers}
          tone={tone}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Dimension set — measure lines + labels that wrap the actual cube.   */
/* ------------------------------------------------------------------ */

function DimensionLine({
  color,
  opacityRef,
  drawRef,
}: {
  color: string;
  opacityRef: React.RefObject<number>;
  /** 0..1 draw-on progress: the line grows from its centre outward. */
  drawRef: React.RefObject<number>;
}) {
  const matRef = React.useRef<THREE.LineBasicMaterial>(null);
  const lineRef = React.useRef<THREE.LineSegments>(null);
  useFrame(() => {
    if (matRef.current) {
      matRef.current.opacity = opacityRef.current ?? 0;
    }
    if (lineRef.current) {
      // Draw-on: scale length from the centre so the rule "extends" into place.
      lineRef.current.scale.x = Math.max(0.001, drawRef.current ?? 0);
    }
  });
  // a unit horizontal line from -0.5..0.5 on X; the group scales/places it.
  const geom = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([-0.5, 0, 0, 0.5, 0, 0], 3),
    );
    return g;
  }, []);
  React.useEffect(() => () => geom.dispose(), [geom]);
  return (
    <lineSegments ref={lineRef} geometry={geom}>
      <lineBasicMaterial
        ref={matRef}
        color={color}
        transparent
        opacity={0}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function DimensionSet({ drivers, tone }: DraftingWorldProps) {
  const palette = WORLD_PALETTE[tone];
  const groupRef = React.useRef<THREE.Group>(null);
  const opacity = React.useRef(0);
  const draw = React.useRef(0);
  const sim = React.useRef({ vis: 0, span: ENVELOPE });

  useFrame((state, delta) => {
    const target = drivers.current;
    const dt = Math.min(delta, 1 / 30);
    const scroll = target.scroll;
    const { viewport } = state;
    const landscape = viewport.width >= viewport.height;

    const emphasis = sampleKey(EMPHASIS_TRACK, scroll);
    // Dimensions only read when the cube is the subject (hero + interludes).
    const focus = beatFocus(scroll);
    const visGoal = emphasis * focus;

    const route = landscape ? TRAVEL_LANDSCAPE : TRAVEL_PORTRAIT;
    const travel = sampleTravel(route, scroll);
    const footprint = ENVELOPE * 0.78 * travel.s;
    const safeX = Math.max(0, viewport.width / 2 - footprint);
    const safeY = Math.max(0, viewport.height / 2 - footprint);
    const fp = cubeFootprint(landscape, scroll);

    const visNext = THREE.MathUtils.damp(sim.current.vis, visGoal, 5, dt);
    const spanNext = THREE.MathUtils.damp(
      sim.current.span,
      fp.half * 2 + 0.5,
      6,
      dt,
    );
    const settling =
      Math.abs(visGoal - visNext) > 1e-4 ||
      Math.abs(fp.half * 2 + 0.5 - spanNext) > 1e-4;
    sim.current.vis = visNext;
    sim.current.span = spanNext;
    opacity.current = sim.current.vis * 0.55;
    // Draw-on runs slightly ahead of the fade so the rule extends, then inks in.
    draw.current = THREE.MathUtils.smoothstep(sim.current.vis, 0.0, 0.7);

    const group = groupRef.current;
    if (group) {
      group.position.x = travel.x * safeX;
      group.position.y = travel.y * safeY;
      group.scale.setScalar(THREE.MathUtils.clamp(sim.current.span, 0.4, 8));
      group.visible = sim.current.vis > 0.01;
    }
    if (settling) state.invalidate();
  });

  return (
    <group ref={groupRef}>
      {/* horizontal dimension above the cube */}
      <group position={[0, 0.62, 0]}>
        <DimensionLine
          color={palette.ink}
          opacityRef={opacity}
          drawRef={draw}
        />
      </group>
      {/* vertical dimension to the right */}
      <group position={[0.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <DimensionLine
          color={palette.ink}
          opacityRef={opacity}
          drawRef={draw}
        />
      </group>

      <DimLabel
        text="ONE TEAM"
        position={[0, 0.76, 0]}
        color={palette.signal}
        opacityRef={opacity}
      />
      <DimLabel
        text="1 : 1"
        position={[0.8, 0, 0]}
        color={palette.ink}
        opacityRef={opacity}
      />
      <DimLabel
        text="ENVELOPE"
        position={[0, -0.76, 0]}
        color={palette.ink}
        opacityRef={opacity}
      />
    </group>
  );
}

/** A mono dimension label whose opacity is driven each frame. */
function DimLabel({
  text,
  position,
  color,
  opacityRef,
}: {
  text: string;
  position: [number, number, number];
  color: string;
  opacityRef: React.RefObject<number>;
}) {
  const matRef = React.useRef<THREE.MeshBasicMaterial>(null);
  useFrame(() => {
    if (matRef.current) {
      matRef.current.opacity = (opacityRef.current ?? 0) * 1.1;
    }
  });
  return (
    <Text
      position={position}
      fontSize={0.1}
      anchorX="center"
      anchorY="middle"
      letterSpacing={0.16}
    >
      {text}
      <meshBasicMaterial
        ref={matRef}
        attach="material"
        color={color}
        transparent
        opacity={0}
        depthWrite={false}
      />
    </Text>
  );
}

/* ------------------------------------------------------------------ */
/* Graphite field + horizon — atmosphere and depth.                    */
/* ------------------------------------------------------------------ */

const PARTICLE_COUNT = 140;

function GraphiteField({ drivers, tone }: DraftingWorldProps) {
  const palette = WORLD_PALETTE[tone];
  const pointsRef = React.useRef<THREE.Points>(null);
  const matRef = React.useRef<THREE.PointsMaterial>(null);
  const reduced = React.useRef(false);
  const sim = React.useRef({ opacity: 0 });

  const { geometry, seeds } = React.useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const seedArr = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * 9;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * 5;
      positions[i * 3 + 2] = -2 + (Math.random() * 2 - 1) * 2.5;
      seedArr[i] = Math.random() * Math.PI * 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: g, seeds: seedArr };
  }, []);
  React.useEffect(() => () => geometry.dispose(), [geometry]);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = media.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reduced.current = e.matches;
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useFrame((state, delta) => {
    const scroll = drivers.current.scroll;
    const dt = Math.min(delta, 1 / 30);
    const emphasis = sampleKey(EMPHASIS_TRACK, scroll);

    const next = THREE.MathUtils.damp(sim.current.opacity, emphasis, 4, dt);
    let settling = Math.abs(emphasis - next) > 1e-4;
    sim.current.opacity = next;

    if (matRef.current) {
      matRef.current.color.set(palette.ink);
      matRef.current.opacity = 0.18 * sim.current.opacity;
    }

    const pts = pointsRef.current;
    if (pts && !reduced.current) {
      const t = state.clock.elapsedTime;
      const attr = pts.geometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const sy = seeds[i];
        attr.setX(i, attr.getX(i) + Math.sin(t * 0.12 + sy) * 0.0009);
        attr.setY(i, attr.getY(i) + Math.cos(t * 0.1 + sy) * 0.0007);
      }
      attr.needsUpdate = true;
      settling = true; // drift keeps the loop alive while emphasized
    }

    // Only keep spinning the loop when actually visible.
    if (settling && sim.current.opacity > 0.02) state.invalidate();
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        ref={matRef}
        color={palette.ink}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0}
        depthWrite={false}
      />
    </points>
  );
}

function Horizon({ drivers, tone }: DraftingWorldProps) {
  const palette = WORLD_PALETTE[tone];
  const matRef = React.useRef<THREE.LineBasicMaterial>(null);
  const groupRef = React.useRef<THREE.Group>(null);
  const sim = React.useRef({ opacity: 0, y: 0 });

  const geom = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([-16, 0, 0, 16, 0, 0], 3),
    );
    return g;
  }, []);
  React.useEffect(() => () => geom.dispose(), [geom]);

  useFrame((state, delta) => {
    const scroll = drivers.current.scroll;
    const dt = Math.min(delta, 1 / 30);
    const emphasis = sampleKey(EMPHASIS_TRACK, scroll);
    const yGoal = -1.6 - scroll * 1.2;

    const oNext = THREE.MathUtils.damp(sim.current.opacity, emphasis, 4, dt);
    const yNext = THREE.MathUtils.damp(sim.current.y, yGoal, 3, dt);
    const settling =
      Math.abs(emphasis - oNext) > 1e-4 || Math.abs(yGoal - yNext) > 1e-4;
    sim.current.opacity = oNext;
    sim.current.y = yNext;

    if (groupRef.current) groupRef.current.position.y = sim.current.y;
    if (matRef.current) {
      matRef.current.color.set(palette.ink);
      matRef.current.opacity = palette.rule * 1.6 * sim.current.opacity;
    }
    if (settling) state.invalidate();
  });

  return (
    <group ref={groupRef} position={[0, -1.6, -6]}>
      <lineSegments geometry={geom}>
        <lineBasicMaterial
          ref={matRef}
          color={palette.ink}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Spark burst — a radial flash of signal motes at each reassembly beat. */
/* ------------------------------------------------------------------ */

const SPARK_COUNT = 36;

function SparkBurst({ drivers, tone }: DraftingWorldProps) {
  const palette = WORLD_PALETTE[tone];
  const pointsRef = React.useRef<THREE.Points>(null);
  const matRef = React.useRef<THREE.PointsMaterial>(null);
  const reduced = React.useRef(false);

  // life: 1 at emission, decays to 0; wasSeated tracks the rising edge.
  const life = React.useRef(0);
  const wasSeated = React.useRef(true);

  const { geometry, dirs } = React.useMemo(() => {
    const positions = new Float32Array(SPARK_COUNT * 3);
    const dirArr = new Float32Array(SPARK_COUNT * 3);
    for (let i = 0; i < SPARK_COUNT; i++) {
      // even-ish spherical directions
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      dirArr[i * 3] = r * Math.cos(theta);
      dirArr[i * 3 + 1] = r * Math.sin(theta);
      dirArr[i * 3 + 2] = u;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: g, dirs: dirArr };
  }, []);
  React.useEffect(() => () => geometry.dispose(), [geometry]);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = media.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reduced.current = e.matches;
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useFrame((state, delta) => {
    const scroll = drivers.current.scroll;
    const dt = Math.min(delta, 1 / 30);
    const { viewport } = state;
    const landscape = viewport.width >= viewport.height;

    // Fire on the rising edge of "seated" — the moment the cube snaps together.
    const seated = sampleForm(scroll) > 0.92;
    if (seated && !wasSeated.current && !reduced.current) {
      life.current = 1;
    }
    wasSeated.current = seated;

    if (life.current <= 0.001) {
      const group = pointsRef.current;
      if (group) group.visible = false;
      return;
    }

    life.current = Math.max(0, life.current - dt * 1.6);
    const eased = life.current * life.current; // ease-out spread

    // Park the burst on the cube, matching the rig's travel.
    const route = landscape ? TRAVEL_LANDSCAPE : TRAVEL_PORTRAIT;
    const travel = sampleTravel(route, scroll);
    const footprint = ENVELOPE * 0.78 * travel.s;
    const safeX = Math.max(0, viewport.width / 2 - footprint);
    const safeY = Math.max(0, viewport.height / 2 - footprint);

    const pts = pointsRef.current;
    if (pts) {
      pts.visible = true;
      pts.position.set(travel.x * safeX, travel.y * safeY, 0);
      const spread = (1 - eased) * 1.6 * travel.s + 0.05;
      const attr = pts.geometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute;
      for (let i = 0; i < SPARK_COUNT; i++) {
        attr.setXYZ(
          i,
          dirs[i * 3] * spread,
          dirs[i * 3 + 1] * spread,
          dirs[i * 3 + 2] * spread,
        );
      }
      attr.needsUpdate = true;
    }
    if (matRef.current) {
      matRef.current.color.set(palette.signal);
      matRef.current.opacity = 0.8 * life.current;
      matRef.current.size = 0.06 * travel.s + 0.02;
    }
    state.invalidate();
  });

  return (
    <points ref={pointsRef} geometry={geometry} visible={false}>
      <pointsMaterial
        ref={matRef}
        color={palette.signal}
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0}
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */

function DraftingWorld({ drivers, tone }: DraftingWorldProps) {
  return (
    <>
      <Horizon drivers={drivers} tone={tone} />
      <ReferenceGrid drivers={drivers} tone={tone} />
      <BenchmarkPins drivers={drivers} tone={tone} />
      <GraphiteField drivers={drivers} tone={tone} />
      <DimensionSet drivers={drivers} tone={tone} />
      <SparkBurst drivers={drivers} tone={tone} />
    </>
  );
}

export { DraftingWorld };
