"use client";

import { gsap } from "gsap";
import * as THREE from "three";
import * as React from "react";

type LuminaSlide = {
  description: string;
  media: string;
  title: string;
};

type LuminaInteractiveListProps = {
  active: boolean;
  fromSlide: LuminaSlide;
  onComplete?: () => void;
  toSlide: LuminaSlide;
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec2 uTexture1Size;
  uniform vec2 uTexture2Size;
  varying vec2 vUv;

  vec2 getCoverUV(vec2 uv, vec2 textureSize) {
    vec2 s = uResolution / textureSize;
    float scale = max(s.x, s.y);
    vec2 scaledSize = textureSize * scale;
    vec2 offset = (uResolution - scaledSize) * 0.5;
    return (uv * uResolution - offset) / scaledSize;
  }

  vec4 glassEffect(vec2 uv, float progress) {
    vec2 uv1 = getCoverUV(uv, uTexture1Size);
    vec2 uv2 = getCoverUV(uv, uTexture2Size);
    vec2 p = uv * uResolution;
    vec2 c = uResolution * 0.5;
    float maxR = length(uResolution) * 0.88;
    float br = progress * maxR;
    float d = length(p - c);
    float nd = d / max(br, 0.001);
    float param = smoothstep(br + 3.0, br - 3.0, d);
    vec4 img;

    if (param > 0.0) {
      float ro = 0.08 * pow(smoothstep(0.3, 1.0, nd), 1.5);
      vec2 dir = d > 0.0 ? (p - c) / d : vec2(0.0);
      vec2 distUV = uv2 - dir * ro;
      float ca = 0.02 * pow(smoothstep(0.3, 1.0, nd), 1.2);
      img = vec4(
        texture2D(uTexture2, distUV + dir * ca * 1.2).r,
        texture2D(uTexture2, distUV + dir * ca * 0.2).g,
        texture2D(uTexture2, distUV - dir * ca * 0.8).b,
        1.0
      );
      float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
      img.rgb += rim * 0.08;
    } else {
      img = texture2D(uTexture2, uv2);
    }

    vec4 oldImg = texture2D(uTexture1, uv1);
    if (progress > 0.95) {
      img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
    }

    return mix(oldImg, img, param);
  }

  void main() {
    gl_FragColor = glassEffect(vUv, uProgress);
  }
`;

function splitText(text: string) {
  return text
    .split("")
    .map(
      (char) =>
        `<span style="display:inline-block;opacity:0;">${char === " " ? "&nbsp;" : char}</span>`,
    )
    .join("");
}

async function loadTexture(src: string) {
  const loader = new THREE.TextureLoader();

  return new Promise<THREE.Texture>((resolve, reject) => {
    loader.load(
      src,
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.userData = {
          size: new THREE.Vector2(texture.image.width, texture.image.height),
        };
        resolve(texture);
      },
      undefined,
      reject,
    );
  });
}

function getTextureUrl(texture?: THREE.Texture) {
  const image = texture?.image as { src?: string } | undefined;
  return image?.src;
}

function LuminaInteractiveList({
  active,
  fromSlide,
  onComplete,
  toSlide,
}: LuminaInteractiveListProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const descRef = React.useRef<HTMLParagraphElement>(null);
  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = React.useRef<THREE.ShaderMaterial | null>(null);
  const frameRef = React.useRef<number>(0);
  const texturesRef = React.useRef<{
    from?: THREE.Texture;
    to?: THREE.Texture;
  }>({});
  const timelineRef = React.useRef<gsap.core.Timeline | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      canvas,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uTexture1: { value: null },
        uTexture1Size: { value: new THREE.Vector2(1, 1) },
        uTexture2: { value: null },
        uTexture2Size: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader,
      fragmentShader,
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    rendererRef.current = renderer;
    materialRef.current = material;

    const render = () => {
      frameRef.current = window.requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      material.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight,
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(frameRef.current);
      timelineRef.current?.kill();
      material.dispose();
      plane.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  React.useEffect(() => {
    if (!active) return;
    if (!materialRef.current || !titleRef.current || !descRef.current) return;

    let cancelled = false;

    async function run() {
      const material = materialRef.current;
      const title = titleRef.current;
      const desc = descRef.current;
      if (!material || !title || !desc) return;

      const [fromTexture, toTexture] = await Promise.all([
        getTextureUrl(texturesRef.current.from) === fromSlide.media
          ? Promise.resolve(texturesRef.current.from)
          : loadTexture(fromSlide.media),
        getTextureUrl(texturesRef.current.to) === toSlide.media
          ? Promise.resolve(texturesRef.current.to)
          : loadTexture(toSlide.media),
      ]);

      if (cancelled || !fromTexture || !toTexture) {
        return;
      }

      texturesRef.current = {
        from: fromTexture,
        to: toTexture,
      };

      material.uniforms.uTexture1.value = fromTexture;
      material.uniforms.uTexture2.value = toTexture;
      material.uniforms.uTexture1Size.value.copy(
        fromTexture.userData.size as THREE.Vector2,
      );
      material.uniforms.uTexture2Size.value.copy(
        toTexture.userData.size as THREE.Vector2,
      );
      material.uniforms.uProgress.value = 0;

      title.innerHTML = splitText(toSlide.title);
      desc.textContent = toSlide.description;

      const chars = Array.from(title.children);
      gsap.set(chars, { opacity: 0, y: 22, filter: "blur(10px)" });
      gsap.set(desc, { opacity: 0, y: 18 });
      gsap.set(wrapperRef.current, { autoAlpha: 1 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.to(wrapperRef.current, {
            autoAlpha: 0,
            delay: 0.08,
            duration: 0.45,
            onComplete,
          });
        },
      });

      timelineRef.current = timeline;

      timeline.to(
        material.uniforms.uProgress,
        {
          value: 1,
          duration: 1.45,
          ease: "power2.inOut",
        },
        0,
      );
      timeline.to(
        chars,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.025,
        },
        0.28,
      );
      timeline.to(
        desc,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        0.6,
      );
    }

    void run();

    return () => {
      cancelled = true;
      timelineRef.current?.kill();
    };
  }, [active, fromSlide, toSlide, onComplete]);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none fixed inset-0 z-[120] bg-black opacity-0"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),rgba(0,0,0,0.18)_32%,rgba(0,0,0,0.56))]" />
      <div className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-between px-5 py-8 sm:px-8 sm:py-10">
        <div className="max-w-[44rem]">
          <h2
            ref={titleRef}
            className="font-display text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl"
          />
          <p
            ref={descRef}
            className="mt-3 max-w-xl text-sm text-white/72 sm:text-base"
          />
        </div>
      </div>
    </div>
  );
}

export { LuminaInteractiveList };
export type { LuminaSlide };
