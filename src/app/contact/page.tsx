import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ContactSection } from "@/components/sections/contact";

const DESCRIPTION =
  "Open to collaborations around products, games, tools, and technically interesting builds. Describe what you are making or exploring — replies within two working days.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Collaborate — Akxost",
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
