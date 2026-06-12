import path from "node:path";

import type { NextConfig } from "next";

const projectRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  // The Babel-based compiler pass is heavy in dev (it transpiles three/drei/
  // gsap on every boot) and was pinning the machine. Keep it for prod builds.
  reactCompiler: process.env.NODE_ENV === "production",
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
