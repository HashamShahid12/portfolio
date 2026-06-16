import { useEffect, useRef } from "react";
import { motion } from "motion/react";

const techIcons = [
  { label: "React", icon: "⚛", angle: 0 },
  { label: "TS", icon: "TS", angle: 45 },
  { label: "Node", icon: "⬢", angle: 90 },
  { label: "Web3", icon: "◈", angle: 135 },
  { label: "AI", icon: "◉", angle: 180 },
  { label: "DB", icon: "◎", angle: 225 },
  { label: "Git", icon: "⌥", angle: 270 },
  { label: "Fig", icon: "◆", angle: 315 },
];

function RotatingOrbit() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ width: 280, height: 280, position: "relative" }}
      >
        {techIcons.map((icon) => {
          const rad = (icon.angle * Math.PI) / 180;
          const r = 130;
          const x = Math.cos(rad) * r;
          const y = Math.sin(rad) * r;
          return (
            <motion.div
              key={icon.label}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                x: x - 18,
                y: y - 18,
              }}
              whileHover={{ scale: 1.3 }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono"
                style={{
                  background: "rgba(13,16,32,0.9)",
                  border: "1px solid rgba(124,108,252,0.4)",
                  color: "#7c6cfc",
                  boxShadow: "0 0 12px rgba(124,108,252,0.3)",
                  fontSize: "10px",
                }}
              >
                {icon.icon}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

function GradientBg() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,108,252,0.25) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 90%, rgba(0,212,255,0.15) 0%, transparent 60%), #05070f",
        }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-1/2"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(124,108,252,0.05) 60deg, transparent 120deg)",
        }}
      />
    </div>
  );
}

function MagneticButton({ children, onClick, style, className }: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      style={{ transition: "transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s", ...style }}
    >
      {children}
    </button>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GradientBg />

      <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center max-w-6xl">
        {/* Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <span
              className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full font-mono"
              style={{
                border: "1px solid rgba(0,212,255,0.3)",
                color: "#00d4ff",
                background: "rgba(0,212,255,0.05)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for work
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, fontWeight: 800, color: "#f0f0ff" }}
          >
            Crafting{" "}
            <span style={{ background: "linear-gradient(135deg, #7c6cfc 0%, #00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              headless commerce
            </span>{" "}
            experiences
          </motion.h1>

          <motion.p
            variants={itemVariants}
            style={{ color: "#6070a0", fontSize: "1.1rem", lineHeight: 1.7, fontFamily: "'Inter', sans-serif", maxWidth: "44ch" }}
          >
            Frontend & Shopify Developer specializing in Shopify Hydrogen,
            React, Next.js, TypeScript, and performance-focused eCommerce
            solutions that drive growth.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <MagneticButton
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "linear-gradient(135deg, #7c6cfc, #00d4ff)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                padding: "14px 32px",
                borderRadius: "99px",
                fontSize: "0.95rem",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                boxShadow: "0 0 30px rgba(124,108,252,0.4)",
              }}
              onMouseEnter={(e: any) => e.currentTarget.style.boxShadow = "0 0 60px rgba(124,108,252,0.7)"}
              onMouseLeave={(e: any) => e.currentTarget.style.boxShadow = "0 0 30px rgba(124,108,252,0.4)"}
            >
              View Work →
            </MagneticButton>
            <MagneticButton
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "transparent",
                color: "#a0a8d0",
                border: "1px solid rgba(124,108,252,0.3)",
                cursor: "pointer",
                padding: "14px 32px",
                borderRadius: "99px",
                fontSize: "0.95rem",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              Get in Touch
            </MagneticButton>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-6 pt-2">
            {[
              { label: "3+", sub: "Years exp." },
              { label: "25", sub: "Projects shipped" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ color: "#f0f0ff", fontSize: "1.5rem", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.label}</div>
                <div style={{ color: "#6070a0", fontSize: "0.75rem", fontFamily: "'Inter', sans-serif" }}>{stat.sub}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
          style={{ height: 360 }}
        >
          <RotatingOrbit />
          {/* Profile circle */}
          <div
            className="relative z-10 rounded-full flex items-center justify-center"
            style={{
              width: 160,
              height: 160,
              background: "linear-gradient(135deg, #7c6cfc 0%, #00d4ff 100%)",
              boxShadow: "0 0 60px rgba(124,108,252,0.5), 0 0 120px rgba(0,212,255,0.2)",
            }}
          >
            <span style={{ fontSize: "4rem" }}>👨‍💻</span>
          </div>
          {/* Glow ring */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full"
            style={{
              width: 180,
              height: 180,
              border: "2px solid rgba(124,108,252,0.5)",
              boxShadow: "0 0 40px rgba(124,108,252,0.3)",
            }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span style={{ color: "#6070a0", fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em" }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, #7c6cfc, transparent)" }}
        />
      </motion.div>
    </section>
  );
}
