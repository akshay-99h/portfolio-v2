import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ContactSection } from "@/components/sections/contact";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Header />
      <ContactSection />
      <Footer />
    </div>
  );
}
