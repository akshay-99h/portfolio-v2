"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

import type { AssemblyDrivers } from "@/components/gl/scenes/hero-assembly";

type Tone = "light" | "dark";

type ContourTerrainProps = {
  drivers: React.RefObject<AssemblyDrivers>;
  tone: Tone;
};

const PALETTES: Record<
  Tone,
  { ink: string; signal: string; minorAlpha: number; majorAlpha: number }
> = {
  light: {
    ink: "#131310",
    signal: "#168f8a",
    minorAlpha: 0.07,
    majorAlpha: 0.13,
  },
  dark: {
    ink: "#f3f1ec",
    signal: "#2dbab4",
    minorAlpha: 0.06,
    majorAlpha: 0.12,
  },
};

/**
 * The survey map's tour of the page, keyed by document scroll progress —
 * the same stops the brand object travels between. Each region reads as a
 * different terrain: zoom is how close the map is, warp is how folded the
 * land is, pan walks across the noise field, accent tints index lines.
 */
type Region = {
  at: number;
  zoom: number;
  warp: number;
  panX: number;
  panY: number;
  accent: number;
};

const REGIONS: Region[] = [
  { at: 0.0, zoom: 2.6, warp: 0.55, panX: 0.0, panY: 0.0, accent: 0.35 }, // hero — calm plains
  { at: 0.28, zoom: 3.0, warp: 0.8, panX: 1.4, panY: 0.6, accent: 0.45 }, // assembly — gentle folds
  { at: 0.45, zoom: 3.8, warp: 1.25, panX: 2.8, panY: -0.8, accent: 0.55 }, // method — ridgeline
  { at: 0.62, zoom: 3.2, warp: 0.95, panX: 4.0, panY: 1.4, accent: 0.5 }, // work — open basin
  { at: 0.8, zoom: 4.4, warp: 1.5, panX: 5.0, panY: -1.6, accent: 0.7 }, // field notes — dense relief
  { at: 1.0, zoom: 2.9, warp: 0.7, panX: 5.8, panY: 2.4, accent: 0.45 }, // brief — settles flat
];

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function sampleRegion(progress: number) {
  const t = clamp01(progress);
  let from = REGIONS[0];
  let to = REGIONS[REGIONS.length - 1];
  for (let i = 0; i < REGIONS.length - 1; i++) {
    if (t >= REGIONS[i].at && t <= REGIONS[i + 1].at) {
      from = REGIONS[i];
      to = REGIONS[i + 1];
      break;
    }
  }
  const span = to.at - from.at;
  const k =
    span > 0 ? THREE.MathUtils.smoothstep((t - from.at) / span, 0, 1) : 1;
  return {
    zoom: THREE.MathUtils.lerp(from.zoom, to.zoom, k),
    warp: THREE.MathUtils.lerp(from.warp, to.warp, k),
    panX: THREE.MathUtils.lerp(from.panX, to.panX, k),
    panY: THREE.MathUtils.lerp(from.panY, to.panY, k),
    accent: THREE.MathUtils.lerp(from.accent, to.accent, k),
  };
}

const VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/**
 * Topographic survey sheet: value-noise fbm elevation, slowly domain-warped
 * by time so the land breathes, rendered as fwidth-antialiased iso-lines.
 * Sixteen minor levels, every fourth an index line tinted toward the signal.
 */
const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uAspect;
uniform float uZoom;
uniform float uWarp;
uniform vec2 uPan;
uniform vec2 uPointer;
uniform vec3 uInk;
uniform vec3 uSignal;
uniform float uAccent;
uniform float uMinorAlpha;
uniform float uMajorAlpha;
uniform float uFade;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

const mat2 ROT = mat2(0.8, 0.6, -0.6, 0.8);

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = ROT * p * 2.02;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * uZoom + uPan + uPointer * 0.12;

  // Slow domain warp — the breathing. Two drifting fbm fields displace the
  // elevation lookup so contours swell and relax instead of scrolling.
  float t = uTime * 0.05;
  vec2 q = vec2(
    fbm(p + t),
    fbm(p + vec2(5.2, 1.3) - t * 0.8)
  );
  float h = fbm(p + uWarp * (q - 0.5) * 2.0);
  h += 0.035 * sin(uTime * 0.22 + p.x * 1.7 + p.y * 1.3);

  // Iso-lines: distance to the nearest contour level, AA'd with fwidth.
  float e = h * 16.0;
  float wMinor = fwidth(e);
  float minor = 1.0 - smoothstep(0.0, wMinor * 1.6, abs(fract(e + 0.5) - 0.5));

  float eMajor = e * 0.25;
  float wMajor = fwidth(eMajor);
  float major =
    1.0 - smoothstep(0.0, wMajor * 1.6, abs(fract(eMajor + 0.5) - 0.5));

  // Calmer behind the content column, fuller toward the edges.
  vec2 c = (vUv - 0.5) * vec2(uAspect, 1.0);
  float radial = smoothstep(0.12, 0.85, length(c));

  float alpha = minor * uMinorAlpha + major * uMajorAlpha;
  alpha *= mix(0.4, 1.0, radial);
  alpha *= uFade;

  if (alpha < 0.004) {
    discard;
  }

  vec3 color = mix(uInk, uSignal, major * uAccent);
  gl_FragColor = vec4(color, alpha);
}
`;

/** Where the map sheet sits — well behind the brand object. */
const PLANE_POSITION = new THREE.Vector3(0, 0, -4);

/** Living-background frame budget (the rest of the page stays on demand). */
const BREATH_INTERVAL_MS = 1000 / 30;

function ContourTerrain({ drivers, tone }: ContourTerrainProps) {
  const palette = PALETTES[tone];

  const meshRef = React.useRef<THREE.Mesh>(null);
  const materialRef = React.useRef<THREE.ShaderMaterial>(null);
  const invalidate = useThree((state) => state.invalidate);
  const reducedMotion = React.useRef(false);

  // Damped simulation state; targets come from scroll-keyed regions.
  const sim = React.useRef({
    zoom: REGIONS[0].zoom,
    warp: REGIONS[0].warp,
    panX: REGIONS[0].panX,
    panY: REGIONS[0].panY,
    accent: REGIONS[0].accent,
    pointerX: 0,
    pointerY: 0,
    fade: 0,
  });

  const uniforms = React.useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uZoom: { value: REGIONS[0].zoom },
      uWarp: { value: REGIONS[0].warp },
      uPan: { value: new THREE.Vector2(REGIONS[0].panX, REGIONS[0].panY) },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uInk: { value: new THREE.Color(PALETTES.light.ink) },
      uSignal: { value: new THREE.Color(PALETTES.light.signal) },
      uAccent: { value: REGIONS[0].accent },
      uMinorAlpha: { value: PALETTES.light.minorAlpha },
      uMajorAlpha: { value: PALETTES.light.majorAlpha },
      uFade: { value: 0 },
    }),
    [],
  );

  // Theme swaps recolor in place — no shader rebuild.
  React.useEffect(() => {
    (uniforms.uInk.value as THREE.Color).set(palette.ink);
    (uniforms.uSignal.value as THREE.Color).set(palette.signal);
    uniforms.uMinorAlpha.value = palette.minorAlpha;
    uniforms.uMajorAlpha.value = palette.majorAlpha;
    invalidate();
  }, [palette, uniforms, invalidate]);

  // The breathing loop: a throttled invalidate keeps the demand frameloop
  // alive at ~30fps. Reduced motion gets a single static draw; scroll-driven
  // morphs still work because scrolling already invalidates the canvas.
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = media.matches;

    const onChange = (event: MediaQueryListEvent) => {
      reducedMotion.current = event.matches;
      invalidate();
    };
    media.addEventListener("change", onChange);

    if (media.matches) {
      invalidate();
      return () => media.removeEventListener("change", onChange);
    }

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < BREATH_INTERVAL_MS) {
        return;
      }
      last = now;
      if (!document.hidden && !reducedMotion.current) {
        invalidate();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      media.removeEventListener("change", onChange);
    };
  }, [invalidate]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    if (!mesh || !material) {
      return;
    }

    const dt = Math.min(delta, 1 / 30);

    // Cover the viewport at the sheet's depth, with a little overscan.
    const viewport = state.viewport.getCurrentViewport(
      state.camera,
      PLANE_POSITION,
    );
    mesh.scale.set(viewport.width * 1.04, viewport.height * 1.04, 1);
    uniforms.uAspect.value = viewport.width / viewport.height;

    if (!reducedMotion.current) {
      uniforms.uTime.value += dt;
    }

    const target = drivers.current;
    const region = sampleRegion(target.scroll);
    const s = sim.current;

    let settling = false;
    const step = (key: keyof typeof s, goal: number, lambda: number) => {
      const next = THREE.MathUtils.damp(s[key], goal, lambda, dt);
      if (Math.abs(goal - next) > 1e-4) {
        settling = true;
      }
      s[key] = next;
    };

    step("zoom", region.zoom, 4);
    step("warp", region.warp, 4);
    step("panX", region.panX, 4);
    step("panY", region.panY, 4);
    step("accent", region.accent, 4);
    step("pointerX", target.pointerX, 3);
    step("pointerY", target.pointerY, 3);
    step("fade", target.intro, 5);

    uniforms.uZoom.value = s.zoom;
    uniforms.uWarp.value = s.warp;
    (uniforms.uPan.value as THREE.Vector2).set(s.panX, s.panY);
    (uniforms.uPointer.value as THREE.Vector2).set(s.pointerX, -s.pointerY);
    uniforms.uAccent.value = s.accent;
    uniforms.uFade.value = s.fade;

    if (settling) {
      state.invalidate();
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={PLANE_POSITION}
      renderOrder={-1}
      frustumCulled={false}
    >
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export { ContourTerrain };
