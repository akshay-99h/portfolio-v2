"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const COPY = `The Lifestyle line — Vastutva, Verve, and Relume — focuses on Android and iOS products shaped for quick repeat actions, clear task flow, and releases that stay small enough to ship cleanly.

The Community line — ZenIMF, Carpool, and Garima Setu — turns public-facing web work into maintainable content systems, simple navigation, and dependable deployment.

Across every build, the studio keeps clarity, ownership, and restraint at the center so the product stays easy to use, easy to hand off, and easier to grow.

The Lifestyle line — Vastutva, Verve, and Relume — focuses on Android and iOS products shaped for quick repeat actions, clear task flow, and releases that stay small enough to ship cleanly.

The Community line — ZenIMF, Carpool, and Garima Setu — turns public-facing web work into maintainable content systems, simple navigation, and dependable deployment.

Across every build, the studio keeps clarity, ownership, and restraint at the center so the product stays easy to use, easy to hand off, and easier to grow.`;

const CAMERA_DISTANCE = 3.5;
const DEFAULT_DISPLACEMENT = new THREE.Vector3(1000, 1000, 1000);

function getThemePalette() {
  const styles = getComputedStyle(document.documentElement);
  const background = styles.getPropertyValue("--card").trim() || "#faf7f1";
  const foreground =
    styles.getPropertyValue("--foreground").trim() || "#111111";
  const accent = styles.getPropertyValue("--accent").trim() || "#dff1ef";
  const muted =
    styles.getPropertyValue("--muted-foreground").trim() || "#5f5f5f";

  return { accent, background, foreground, muted };
}

function createTextTexture(text: string) {
  const { accent, background, foreground, muted } = getThemePalette();
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 2048;

  const context = canvas.getContext("2d");
  if (!context) {
    return Promise.resolve(new THREE.Texture());
  }

  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = context.createLinearGradient(
    0,
    0,
    canvas.width,
    canvas.height,
  );
  gradient.addColorStop(0, accent);
  gradient.addColorStop(1, background);
  context.globalAlpha = 0.22;
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;

  context.fillStyle = foreground;
  context.font = "600 52px Arial, sans-serif";
  context.fillText("Studio lines", 140, 160);

  context.fillStyle = muted;
  context.font = "400 28px Arial, sans-serif";
  context.fillText("Hover to bend the field", 140, 210);

  context.fillStyle = foreground;
  context.font = "500 34px Arial, sans-serif";

  const maxWidth = canvas.width - 280;
  const lineHeight = 58;
  let cursorY = 320;

  for (const paragraph of text.split("\n\n")) {
    const words = paragraph.split(" ");
    let line = "";

    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (context.measureText(candidate).width > maxWidth && line) {
        context.fillText(line, 140, cursorY);
        line = word;
        cursorY += lineHeight;
      } else {
        line = candidate;
      }
    }

    if (line) {
      context.fillText(line, 140, cursorY);
      cursorY += lineHeight;
    }

    cursorY += 44;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  return Promise.resolve(texture);
}

export function Sneak() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneInitialized = useRef(false);

  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement || sceneInitialized.current) return;

    const container = containerElement;
    sceneInitialized.current = true;

    const scene = new THREE.Scene();
    let aspect = container.clientWidth / container.clientHeight;

    const camera = new THREE.OrthographicCamera(
      -CAMERA_DISTANCE * aspect,
      CAMERA_DISTANCE * aspect,
      CAMERA_DISTANCE,
      -CAMERA_DISTANCE,
      0.01,
      1000,
    );
    camera.position.set(0, -10, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const updateSceneBackground = () => {
      const { background } = getThemePalette();
      scene.background = new THREE.Color(background);
    };

    updateSceneBackground();

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uDisplacement: { value: DEFAULT_DISPLACEMENT.clone() },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform vec3 uDisplacement;

        float easeInOutCubic(float x) {
          return x < 0.5 ? 4. * x * x * x : 1. - pow(-2. * x + 2., 3.) / 2.;
        }

        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        void main() {
          vUv = uv;
          vec3 new_position = position;

          vec4 localPosition = vec4(position, 1.);
          vec4 worldPosition = modelMatrix * localPosition;

          float dist = length(uDisplacement - worldPosition.xyz);
          float min_distance = 2.5;

          if (dist < min_distance) {
            float distance_mapped = map(dist, 0., min_distance, 1., 0.);
            float val = easeInOutCubic(distance_mapped);
            new_position.z += val * 0.85;
          }

          gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;

        void main() {
          vec4 color = texture2D(uTexture, vUv);
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
    });

    const geometry = new THREE.PlaneGeometry(8.4, 8.4, 160, 160);
    const plane = new THREE.Mesh(geometry, shaderMaterial);
    plane.rotation.z = Math.PI / 4;
    scene.add(plane);

    const frameMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(getThemePalette().foreground),
      opacity: 0.09,
      transparent: true,
    });
    const frame = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), frameMaterial);
    frame.rotation.z = Math.PI / 4;
    frame.position.z = -0.2;
    scene.add(frame);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let frameId = 0;
    let disposed = false;

    createTextTexture(COPY).then((texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      shaderMaterial.uniforms.uTexture.value = texture;
    });

    function onPointerMove(event: PointerEvent) {
      const bounds = container.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(plane);

      if (intersects.length > 0) {
        shaderMaterial.uniforms.uDisplacement.value.copy(intersects[0].point);
      }
    }

    function onPointerLeave() {
      shaderMaterial.uniforms.uDisplacement.value.copy(DEFAULT_DISPLACEMENT);
    }

    function onResize() {
      aspect = container.clientWidth / container.clientHeight;
      camera.left = -CAMERA_DISTANCE * aspect;
      camera.right = CAMERA_DISTANCE * aspect;
      camera.top = CAMERA_DISTANCE;
      camera.bottom = -CAMERA_DISTANCE;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    function handleThemeChange() {
      updateSceneBackground();
      frameMaterial.color = new THREE.Color(getThemePalette().foreground);

      createTextTexture(COPY).then((texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }

        const previousTexture = shaderMaterial.uniforms.uTexture
          .value as THREE.Texture | null;
        previousTexture?.dispose();
        shaderMaterial.uniforms.uTexture.value = texture;
      });
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const observer = new MutationObserver(handleThemeChange);
    const resizeObserver = new ResizeObserver(onResize);

    mediaQuery.addEventListener("change", handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    resizeObserver.observe(container);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);

    const animate = () => {
      plane.rotation.z += 0.0014;
      frame.rotation.z -= 0.0008;
      frameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      sceneInitialized.current = false;

      cancelAnimationFrame(frameId);
      mediaQuery.removeEventListener("change", handleThemeChange);
      observer.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);

      const texture = shaderMaterial.uniforms.uTexture
        .value as THREE.Texture | null;
      texture?.dispose();
      geometry.dispose();
      frame.geometry.dispose();
      shaderMaterial.dispose();
      frameMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[360px] w-full overflow-hidden rounded-[1.75rem] border border-border/80 bg-card sm:h-[440px] lg:h-[560px]"
    />
  );
}
