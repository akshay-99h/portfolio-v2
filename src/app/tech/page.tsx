import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TechStackSection } from "@/components/sections/tech-stack";

const DESCRIPTION =
  "What a client can hand off to Akxost Studio: customer-facing products, backend and product systems, internal tools, and launch reliability — plus the stack it is usually built with.";

export const metadata: Metadata = {
  title: "Capabilities",
  description: DESCRIPTION,
  alternates: { canonical: "/tech" },
  openGraph: {
    title: "Capabilities — Akxost Studio",
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
