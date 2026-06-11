import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProjectsSection } from "@/components/sections/projects";

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Header />
      <ProjectsSection />
      <Footer />
    </div>
  );
}
