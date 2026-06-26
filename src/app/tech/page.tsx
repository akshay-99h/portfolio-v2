import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TechStackSection } from "@/components/sections/tech-stack";

const DESCRIPTION =
  "What Akshay usually builds: customer-facing products, backend and product systems, internal tools, and launch reliability — plus the stack usually behind them.";

export const metadata: Metadata = {
  title: "Tech",
  description: DESCRIPTION,
  alternates: { canonical: "/tech" },
  openGraph: {
    title: "Tech — Akxost",
    description: DESCRIPTION,
    url: "/tech",
  },
};

export default function TechPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Header />
      <TechStackSection />
      <Footer />
    </div>
  );
}
