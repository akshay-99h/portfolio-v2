"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type HeroSystemsSceneProps = {
  className?: string;
};

const CALLOUTS = [
  {
    title: "Launch",
    copy: "Ship the first version with the right scope.",
    className: "left-2 top-4 md:left-4 md:top-6",
  },
  {
    title: "Systems",
    copy: "APIs, auth, ops, and integrations under control.",
    className: "right-2 top-10 md:right-4 md:top-8",
  },
  {
    title: "Scale",
    copy: "A product foundation that survives iteration.",
    className: "bottom-4 left-4 md:bottom-6 md:left-12",
  },
] as const;

function HeroSystemsScene({ className }: HeroSystemsSceneProps) {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const pointerRef = React.useRef({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = React.useState({ x: 54, y: 44 });
  const [activeCallout, setActiveCallout] = React.useState<string | null>(null);

  React.useEffect(() => {
    const hostElement = hostRef.current;
    if (!hostElement) return;
    const host = hostElement;

    let renderer: import("three").WebGLRenderer | null = null;
    let cleanup: (() => void) | null = null;
    let disposed = false;

    async function setup() {
      const THREE = await import("three");
      if (disposed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 1.5, 10);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);

      const ambient = new THREE.AmbientLight(0xffffff, 1.15);
      scene.add(ambient);

      const keyLight = new THREE.DirectionalLight(0x8ff4ef, 1.65);
      keyLight.position.set(4, 6, 8);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xfff0d8, 0.55);
      fillLight.position.set(-6, -2, 4);
      scene.add(fillLight);

      const pointerLight = new THREE.PointLight(0x8ff4ef, 2.2, 18, 2);
      pointerLight.position.set(0, 1.5, 5.5);
      scene.add(pointerLight);

      const root = new THREE.Group();
      scene.add(root);
      root.rotation.x = -0.46;
      root.rotation.y = 0.54;
      const baseRotation = { x: -0.46, y: 0.54 };

      const baseMaterial = new THREE.MeshStandardMaterial({
        color: "#0d1516",
        roughness: 0.8,
        metalness: 0.15,
      });
      const accentMaterial = new THREE.MeshStandardMaterial({
        color: "#1da9a3",
        roughness: 0.35,
        metalness: 0.4,
        emissive: "#0d6a65",
        emissiveIntensity: 0.16,
      });
      const softMaterial = new THREE.MeshStandardMaterial({
        color: "#f1ede4",
        roughness: 0.62,
        metalness: 0.08,
      });

      const platform = new THREE.Mesh(
        new THREE.BoxGeometry(5.2, 0.32, 5.2),
        baseMaterial,
      );
      platform.position.y = -1.7;
      root.add(platform);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.4, 0.06, 20, 120),
        accentMaterial,
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -0.35;
      root.add(ring);

      const cardGeometry = new THREE.BoxGeometry(1.85, 2.35, 0.2);
      const cards = [
        { position: [-1.55, -0.32, 0.9], rotation: [-0.08, 0.2, -0.06] },
        { position: [0, 0, -0.05], rotation: [0.06, -0.02, 0.02] },
        { position: [1.55, 0.28, -1.1], rotation: [0.11, -0.16, 0.08] },
      ].map((item, index) => {
        const mesh = new THREE.Mesh(
          cardGeometry,
          index === 1 ? softMaterial : baseMaterial,
        );
        mesh.position.set(item.position[0], item.position[1], item.position[2]);
        mesh.rotation.set(item.rotation[0], item.rotation[1], item.rotation[2]);
        root.add(mesh);
        return mesh;
      });

      const bars = Array.from({ length: 10 }, (_, index) => {
        const bar = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 0.4 + index * 0.06, 0.14),
          accentMaterial,
        );
        bar.position.set(-1.95 + index * 0.42, -0.48, 1.95);
        root.add(bar);
        return bar;
      });

      const nodes = Array.from({ length: 12 }, (_, index) => {
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(index % 3 === 0 ? 0.1 : 0.075, 16, 16),
          index % 3 === 0 ? accentMaterial : softMaterial,
        );
        const angle = (index / 12) * Math.PI * 2;
        sphere.position.set(
          Math.cos(angle) * 2.2,
          -0.15,
          Math.sin(angle) * 2.2,
        );
        root.add(sphere);
        return sphere;
      });

      const connectorMaterial = new THREE.LineBasicMaterial({
        color: "#1da9a3",
        transparent: true,
        opacity: 0.18,
      });
      const connectorGroup = new THREE.Group();
      root.add(connectorGroup);

      function buildConnectors() {
        connectorGroup.clear();
        for (let index = 0; index < nodes.length; index += 1) {
          const next = nodes[(index + 1) % nodes.length];
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[index].position.clone(),
            next.position.clone(),
          ]);
          connectorGroup.add(new THREE.Line(geometry, connectorMaterial));
        }
      }

      buildConnectors();

      function resize() {
        const width = host.clientWidth;
        const height = host.clientHeight;
        if (!renderer) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      }

      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);

      const clock = new THREE.Clock();
      let frame = 0;

      function animate() {
        const elapsed = clock.getElapsedTime();
        const targetX = pointerRef.current.y * 0.16;
        const targetY = pointerRef.current.x * 0.22;

        root.rotation.x += (baseRotation.x + targetX - root.rotation.x) * 0.06;
        root.rotation.y +=
          (baseRotation.y +
            targetY +
            Math.sin(elapsed * 0.32) * 0.04 -
            root.rotation.y) *
          0.06;
        ring.rotation.z = elapsed * 0.22;
        pointerLight.position.x +=
          (pointerRef.current.x * 4.2 - pointerLight.position.x) * 0.08;
        pointerLight.position.y +=
          (pointerRef.current.y * -2.6 + 1.4 - pointerLight.position.y) * 0.08;

        cards.forEach((card, index) => {
          card.position.y =
            [-0.32, 0, 0.28][index] + Math.sin(elapsed * 1.05 + index) * 0.08;
        });

        bars.forEach((bar, index) => {
          bar.scale.y = 0.8 + Math.sin(elapsed * 1.4 + index * 0.45) * 0.18;
        });

        nodes.forEach((node, index) => {
          const angle = (index / nodes.length) * Math.PI * 2 + elapsed * 0.18;
          node.position.x = Math.cos(angle) * 2.2;
          node.position.z = Math.sin(angle) * 2.2;
          node.position.y = -0.15 + Math.sin(elapsed * 1.1 + index) * 0.06;
        });

        connectorGroup.children.forEach((child: unknown) => {
          const line = child as import("three").Line;
          line.geometry.dispose();
        });
        buildConnectors();

        renderer?.render(scene, camera);
        frame = window.requestAnimationFrame(animate);
      }

      animate();

      cleanup = () => {
        resizeObserver.disconnect();
        window.cancelAnimationFrame(frame);
        connectorGroup.children.forEach((child: unknown) => {
          (child as import("three").Line).geometry.dispose();
        });
        connectorMaterial.dispose();
        cardGeometry.dispose();
        platform.geometry.dispose();
        ring.geometry.dispose();
        baseMaterial.dispose();
        accentMaterial.dispose();
        softMaterial.dispose();
        renderer?.dispose();
        if (renderer && host.contains(renderer.domElement)) {
          host.removeChild(renderer.domElement);
        }
      };
    }

    void setup();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const shell = hostRef.current;
    if (!shell) return;
    const rect = shell.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
    pointerRef.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }

  function handlePointerLeave() {
    setSpotlight({ x: 54, y: 44 });
    pointerRef.current = { x: 0, y: 0 };
  }

  return (
    <div
      className={cn(
        "relative h-full min-h-[420px] w-full overflow-visible bg-transparent",
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle 240px at ${spotlight.x}% ${spotlight.y}%, rgba(29,169,163,0.2), transparent 58%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.04))] dark:bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.12))]" />

      {CALLOUTS.map((callout) => (
        <div
          key={callout.title}
          className={`absolute z-10 max-w-[13rem] ${callout.className}`}
          onPointerEnter={() => setActiveCallout(callout.title)}
          onPointerLeave={() => setActiveCallout(null)}
        >
          <div
            className={cn(
              "rounded-[1.1rem] bg-background/34 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-[10px] transition-transform duration-300 dark:bg-background/26",
              activeCallout === callout.title ? "scale-[1.03]" : "",
            )}
          >
            <Badge variant="outline" className="rounded-full border-border/40">
              {callout.title}
            </Badge>
            <p className="mt-2 text-sm leading-6 text-foreground/82">
              {callout.copy}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export { HeroSystemsScene };
