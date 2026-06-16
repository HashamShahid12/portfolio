import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5,7,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(124,108,252,0.1)" : "none",
      }}
    >
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        className="font-mono text-lg tracking-tight"
        style={{ color: "#7c6cfc", fontFamily: "'JetBrains Mono', monospace" }}
      >
        hasham.dev
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <button
              onClick={() => scrollTo(link.href)}
              className="relative text-sm transition-colors duration-200"
              style={{
                color: active === link.href.slice(1) ? "#f0f0ff" : "#6070a0",
                fontFamily: "'Inter', sans-serif",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
              }}
            >
              {link.label}
              {active === link.href.slice(1) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, #7c6cfc, #00d4ff)" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => scrollTo("#contact")}
        className="hidden md:block text-sm px-5 py-2 rounded-full transition-all duration-300 hover:shadow-lg"
        style={{
          background: "linear-gradient(135deg, #7c6cfc, #00d4ff)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          boxShadow: "0 0 20px rgba(124,108,252,0.3)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(124,108,252,0.6)";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(124,108,252,0.3)";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        }}
      >
        Hire Me
      </button>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={
              menuOpen
                ? i === 0 ? { rotate: 45, y: 8 } : i === 1 ? { opacity: 0 } : { rotate: -45, y: -8 }
                : { rotate: 0, y: 0, opacity: 1 }
            }
            className="block h-px w-6"
            style={{ background: "#7c6cfc" }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 py-6 px-6 flex flex-col gap-4"
            style={{ background: "rgba(5,7,15,0.95)", backdropFilter: "blur(20px)" }}
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left text-base py-2"
                style={{ color: "#a0a8d0", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
