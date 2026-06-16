import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const experiences = [
   {
    company: "Adex 360",
    role: "Senior Frontend Developer",
    period: "July 2023 — Present",
    description:
      "Architected and delivered 2 full-scale Shopify Hydrogen (headless) storefronts including Orient Textile and Linens Limited, serving thousands of monthly users with Lighthouse performance scores of 97 (Desktop) and 87 (Mobile).",
    tags: ["Shopify Hydrogen", "React", "TypeScript", "GraphQL"],
    logo: "▲",
  },
  {
    company: "Adex 360",
    role: "Frontend Developer",
    period: "Jan 2023 — June 2023",
    description:
      "Developed Shopify Liquid themes and React components for multiple live client projects. Contributed to Shopify CLI workflows, Figma-to-code implementation, and production deployments.",
    tags: ["Shopify Liquid", "React", "JavaScript", "Git"],
    logo: "◉",
  },
];

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative py-32 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div style={{ color: "#7c6cfc", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.2em", marginBottom: "12px" }}>
          04 / EXPERIENCE
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#f0f0ff", lineHeight: 1.1 }}>
          Where I've worked
        </h2>
      </motion.div>

      <div ref={ref} className="relative pl-10">
        {/* Timeline track */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: "rgba(124,108,252,0.1)" }}
        />
        {/* Animated fill */}
        <motion.div
          className="absolute left-0 top-0 w-px origin-top"
          style={{
            height: lineHeight,
            background: "linear-gradient(to bottom, #7c6cfc, #00d4ff)",
          }}
        />

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-12 last:mb-0"
          >
            {/* Timeline dot */}
            <motion.div
              whileInView={{ scale: [0, 1.3, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="absolute -left-10 top-1 w-4 h-4 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #7c6cfc, #00d4ff)",
                boxShadow: "0 0 16px rgba(124,108,252,0.5)",
                marginLeft: "-7px",
              }}
            />

            <motion.div
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl"
              style={{
                background: "rgba(13,16,32,0.7)",
                border: "1px solid rgba(124,108,252,0.15)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(124,108,252,0.35)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 30px rgba(124,108,252,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(124,108,252,0.15)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xl w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(124,108,252,0.1)", border: "1px solid rgba(124,108,252,0.2)" }}
                  >
                    {exp.logo}
                  </span>
                  <div>
                    <div style={{ color: "#f0f0ff", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{exp.company}</div>
                    <div style={{ color: "#7c6cfc", fontSize: "0.85rem", fontFamily: "'Inter', sans-serif" }}>{exp.role}</div>
                  </div>
                </div>
                <span
                  style={{ color: "#6070a0", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}
                >
                  {exp.period}
                </span>
              </div>
              <p style={{ color: "#6070a0", fontSize: "0.875rem", lineHeight: 1.7, fontFamily: "'Inter', sans-serif", marginBottom: "12px" }}>
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md"
                    style={{
                      background: "rgba(124,108,252,0.08)",
                      border: "1px solid rgba(124,108,252,0.2)",
                      color: "#a0a8d0",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
