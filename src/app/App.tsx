import "../styles/fonts.css";
import { CursorGlow } from "./components/CursorGlow";
import { FloatingShapes } from "./components/FloatingShapes";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  return (
    <div
      style={{
        background: "#05070f",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
        scrollBehavior: "smooth",
      }}
    >
      <CursorGlow />
      <FloatingShapes />
      <Navigation />

      <main>
        <HeroSection />

        {/* Subtle divider */}
        <div
          className="max-w-6xl mx-auto px-6"
          style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,108,252,0.2), transparent)" }}
        />

        <AboutSection />

        <div
          className="max-w-6xl mx-auto px-6"
          style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,108,252,0.2), transparent)" }}
        />

        <SkillsSection />

        <div
          className="max-w-6xl mx-auto px-6"
          style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,108,252,0.2), transparent)" }}
        />

        <ProjectsSection />

        <div
          className="max-w-6xl mx-auto px-6"
          style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,108,252,0.2), transparent)" }}
        />

        <ExperienceSection />

        <div
          className="max-w-6xl mx-auto px-6"
          style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,108,252,0.2), transparent)" }}
        />

        <ContactSection />
      </main>

      <footer className="py-10 text-center" style={{ borderTop: "1px solid rgba(124,108,252,0.1)" }}>
        <p style={{ color: "#6070a0", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace" }}>
          © 2026 hasham.dev
        </p>
      </footer>
    </div>
  );
}
