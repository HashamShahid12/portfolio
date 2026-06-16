import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatCounter({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(value, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", background: "linear-gradient(135deg, #7c6cfc, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {count}{suffix}
      </div>
      <div style={{ color: "#6070a0", fontSize: "0.85rem", fontFamily: "'Inter', sans-serif" }}>{label}</div>
    </motion.div>
  );
}

const cards = [
  {
    icon: "⚡",
    title: "Frontend Performance",
    body: "Optimizing React and Next.js applications for speed, accessibility, and Core Web Vitals to deliver smooth user experiences.",
  },
  {
    icon: "🛒",
    title: "Shopify Development",
    body: "Building custom Shopify themes and headless storefronts using Shopify Hydrogen, Liquid, and modern frontend tools.",
  },
  {
    icon: "🎯",
    title: "Precision Engineering",
    body: "I build scalable systems with obsessive attention to performance and reliability. Every millisecond matters.",
  },
  {
    icon: "🎨",
    title: "Design Systems",
    body: "Creating cohesive design languages that scale across products and teams, bridging design and engineering.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div style={{ color: "#7c6cfc", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.2em", marginBottom: "12px" }}>
          01 / ABOUT
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#f0f0ff", lineHeight: 1.1 }}>
          Crafting the future,<br />
          <span style={{ background: "linear-gradient(135deg, #7c6cfc, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>one commit at a time</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{ color: "#a0a8d0", fontSize: "1.05rem", lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}>
I'm Hasham Shahid, a Frontend & Shopify Developer with 3 years of experience creating fast, responsive, and user-focused web applications. I specialize in React, Next.js, Shopify, and Shopify Hydrogen, building modern digital experiences that combine performance with great design.
          </p>
          <p style={{ color: "#6070a0", fontSize: "1rem", lineHeight: 1.8, fontFamily: "'Inter', sans-serif", marginTop: "1rem" }}>
            My focus is on the craft: performant code, beautiful interfaces, and systems that grow gracefully. I believe the best engineering is invisible — it just works.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-3 gap-8 content-center"
        >
          <StatCounter value={3} suffix="+" label="Years exp." />
          <StatCounter value={25} label="Projects" />
        </motion.div>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(124,108,252,0.2)" }}
            className="p-6 rounded-2xl cursor-default"
            style={{
              background: "rgba(13,16,32,0.8)",
              border: "1px solid rgba(124,108,252,0.15)",
              backdropFilter: "blur(12px)",
              transition: "box-shadow 0.3s",
            }}
          >
            <div className="text-3xl mb-4">{card.icon}</div>
            <h3 style={{ color: "#f0f0ff", fontSize: "1rem", fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "8px" }}>{card.title}</h3>
            <p style={{ color: "#6070a0", fontSize: "0.875rem", lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{card.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
