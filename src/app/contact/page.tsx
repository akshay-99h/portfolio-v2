import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ContactSection } from "@/components/sections/contact";

const DESCRIPTION =
  "Start a brief with Akxost Studio. Describe the product that needs to exist, the bottleneck that will not move, or the system that keeps breaking — replies within two working days.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a brief — Akxost Studio",
    description: DESCRIPTION,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Header />
      <ContactSection />
      <Footer />
    </div>
  );
}
