import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProjectsSection } from "@/components/sections/projects";

const DESCRIPTION =
  "The full Akxost Studio work index — mobile products, public platforms, operational web systems, and browser games, each drawn from its real entry page.";

export const metadata: Metadata = {
  title: "Work",
  description: DESCRIPTION,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Work index — Akxost Studio",
    description: DESCRIPTION,
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Header />
      <ProjectsSection />
      <Footer />
    </div>
  );
}
