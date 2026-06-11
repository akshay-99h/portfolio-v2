import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TechStackSection } from "@/components/sections/tech-stack";

export default function TechPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Header />
      <TechStackSection />
      <Footer />
    </div>
  );
}
