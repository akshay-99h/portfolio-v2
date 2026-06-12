"use client";

import { ContactShadows, RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

import { SceneCanvas } from "@/components/gl/scene-canvas";

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
  /** Registered by the scene on mount; lets DOM code request a frame. */
  kick?: () => void;
};

type Tone = "light" | "dark";

type HeroAssemblyProps = {
  drivers: React.RefObject<AssemblyDrivers>;
  tone: Tone;
};

/** Voxel grid: half the cell pitch on each axis. */
const HALF = 0.53;
const CUBE_SIZE = 0.96;
/** Drawing envelope — the outline the object assembles into. */
const ENVELOPE = HALF * 2 + CUBE_SIZE + 0.16;

type VoxelConfig = {
  id: string;
  /** Seated position inside the brand cube. */
  seat: [number, number, number];
  /** Hand-placed drift so the exploded state reads as a composition. */
  drift: [number, number, number];
  /** Scatter rotation at the exploded state (radians). */
  scatter: [number, number, number];
};

/**
 * The brand cube, cut into eight modules. Ordered bottom-up so the
 * assembly reads like a build: foundation first, signal corner last.
 */
const VOXELS: VoxelConfig[] = [
  {
    id: "base-sw",
    seat: [-HALF, -HALF, HALF],
    drift: [-0.55, -0.1, 0.35],
    scatter: [0.45, 0.5, -0.2],
  },
  {
    id: "base-se",
    seat: [HALF, -HALF, HALF],
    drift: [0.4, -0.25, 0.55],
    scatter: [-0.3, -0.45, 0.35],
  },
  {
    id: "base-nw",
    seat: [-HALF, -HALF, -HALF],
    drift: [-0.7, 0.05, -0.3],
    scatter: [0.25, -0.6, 0.4],
  },
  {
    id: "base-ne",
    seat: [HALF, -HALF, -HALF],
    drift: [0.6, -0.05, -0.5],
    scatter: [-0.5, 0.3, -0.35],
  },
  {
    id: "top-sw",
    seat: [-HALF, HALF, HALF],
    drift: [-0.45, 0.45, 0.6],
    scatter: [0.55, -0.35, 0.5],
  },
  {
    id: "top-nw",
    seat: [-HALF, HALF, -HALF],
    drift: [-0.6, 0.6, -0.45],
    scatter: [-0.4, 0.55, 0.25],
  },
  {
    id: "top-ne",
    seat: [HALF, HALF, -HALF],
    drift: [0.5, 0.35, -0.6],
    scatter: [0.35, 0.4, -0.55],
  },
  // The signal corner — lands last, like the keystone.
  {
    id: "signal",
    seat: [HALF, HALF, HALF],
    drift: [0.75, 0.75, 0.5],
    scatter: [-0.6, -0.5, 0.45],
  },
];

/** How far the exploded layout spreads, per axis (y kept tight for the floor). */
const SPREAD: [number, number, number] = [2.35, 1.45, 2.35];

const PALETTES: Record<
  Tone,
  {
    clay: [string, string, string];
    signal: string;
    edge: string;
    edgeOpacity: number;
    shadow: string;
  }
> = {
  light: {
    clay: ["#d8d0bf", "#cdc5b2", "#e2dbcb"],
    signal: "#2aa49d",
    edge: "#131310",
    edgeOpacity: 0.5,
    shadow: "#3a382f",
  },
  dark: {
    clay: ["#232722", "#1b1f1b", "#2a2e29"],
    signal: "#2dbab4",
    edge: "#e8e5de",
    edgeOpacity: 0.65,
    shadow: "#000000",
  },
};

/** True isometric view — the angle the logotype cube is drawn at. */
const ISO_X = Math.atan(1 / Math.SQRT2);
const ISO_Y = Math.PI / 4;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function HeroAssemblyObject({ drivers, tone }: HeroAssemblyProps) {
  const palette = PALETTES[tone];

  const rigRef = React.useRef<THREE.Group>(null);
  const voxelRefs = React.useRef<(THREE.Group | null)[]>([]);
  const solidMats = React.useRef<THREE.MeshStandardMaterial[]>([]);
  const edgeMat = React.useRef<THREE.LineBasicMaterial>(null);

  // Damped simulation state (targets live in `drivers`).
  const sim = React.useRef({ progress: 0, intro: 0, pointerX: 0, pointerY: 0 });

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
    const keys = ["progress", "intro", "pointerX", "pointerY"] as const;
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

    const assembleBase = THREE.MathUtils.smoothstep(p, 0.08, 0.92);
    const rotT = easeInOutCubic(THREE.MathUtils.smoothstep(p, 0, 0.9));

    const rig = rigRef.current;
    if (rig) {
      // Flat "drawing" angle → the logotype's isometric angle.
      rig.rotation.x =
        THREE.MathUtils.lerp(0.24, ISO_X, rotT) + s.pointerY * -0.06;
      rig.rotation.y =
        THREE.MathUtils.lerp(-0.62, ISO_Y, rotT) + s.pointerX * 0.09;
      rig.position.x = s.pointerX * 0.1;
      rig.position.y = THREE.MathUtils.lerp(-0.08, 0.08, assembleBase);
      rig.scale.setScalar(0.9 + 0.1 * intro);
    }

    VOXELS.forEach((voxel, i) => {
      const group = voxelRefs.current[i];
      if (!group) {
        return;
      }

      // Each module gets its own assembly window — foundation first.
      const t = easeInOutCubic(clamp01((assembleBase - i * 0.045) / 0.68));
      // ...and its own entrance beat.
      const born = THREE.MathUtils.smoothstep(
        intro,
        i * 0.055,
        i * 0.055 + 0.5,
      );

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
        ),
        THREE.MathUtils.lerp(
          voxel.seat[2] * SPREAD[2] + voxel.drift[2],
          voxel.seat[2],
          t,
        ),
      );
      group.rotation.set(
        voxel.scatter[0] * (1 - t),
        voxel.scatter[1] * (1 - t),
        voxel.scatter[2] * (1 - t),
      );
      group.scale.setScalar(born);
    });

    for (const mat of solidMats.current) {
      mat.opacity = intro;
    }
    if (edgeMat.current) {
      // The drawing stays faintly present even once the object is seated.
      edgeMat.current.opacity =
        palette.edgeOpacity *
        intro *
        (1 - 0.55 * THREE.MathUtils.smoothstep(p, 0.55, 0.95));
    }

    if (settling) {
      state.invalidate();
    }
  });

  const registerSolid = (mat: THREE.MeshStandardMaterial | null) => {
    if (mat && !solidMats.current.includes(mat)) {
      solidMats.current.push(mat);
    }
  };

  return (
    <>
      <ambientLight intensity={tone === "dark" ? 0.55 : 0.85} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={tone === "dark" ? 1.5 : 1.1}
      />
      <directionalLight position={[-5, 2, -2]} intensity={0.35} />

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
              radius={0.07}
              smoothness={4}
            >
              <meshStandardMaterial
                ref={registerSolid}
                color={
                  voxel.id === "signal"
                    ? palette.signal
                    : palette.clay[i % palette.clay.length]
                }
                roughness={voxel.id === "signal" ? 0.55 : 0.9}
                metalness={0.02}
                transparent
                opacity={0}
              />
            </RoundedBox>
          </group>
        ))}
      </group>

      <ContactShadows
        position={[0, -1.45, 0]}
        opacity={0.35}
        scale={8}
        blur={2.6}
        far={2.8}
        resolution={256}
        color={palette.shadow}
      />
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

function HeroAssemblyCanvas({ drivers, tone }: HeroAssemblyProps) {
  return (
    <SceneCanvas className="h-full w-full" fov={32} cameraZ={8.5}>
      <KickBridge drivers={drivers} />
      <HeroAssemblyObject drivers={drivers} tone={tone} />
    </SceneCanvas>
  );
}

export { HeroAssemblyCanvas };
export type { AssemblyDrivers };
