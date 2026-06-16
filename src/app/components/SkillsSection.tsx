import { useRef } from "react";
import { motion, useInView } from "motion/react";

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      { name: "React / Next.js", level: 96 },
      { name: "TypeScript", level: 94 },
      { name: "GSAP Animations", level: 85 },
      { name: "Tailwind CSS", level: 92 },
    ],
  },
  {
    category: "Shopify",
    skills: [
      { name: "Shopify Hydrogen", level: 90 },
      { name: "Shopify Liquid", level: 88 },
      { name: "Custom Theme Development", level: 92 },
      { name: "Storefront APIs", level: 85 },
    ],
  },
  {
    category: "Backend Basics",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "REST APIs", level: 85 },
      { name: "GraphQL", level: 78 },
      { name: "Database Basics", level: 75 },
    ],
  },
  {
    category: "Tools & Performance",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Performance Optimization", level: 88 },
      { name: "Responsive Design", level: 95 },
      { name: "Lighthouse / Core Web Vitals", level: 85 },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span style={{ color: "#a0a8d0", fontSize: "0.85rem", fontFamily: "'Inter', sans-serif" }}>{name}</span>
        <span style={{ color: "#7c6cfc", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace" }}>{level}%</span>
      </div>
      <div className="h-1 rounded-full" style={{ background: "rgba(124,108,252,0.1)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #7c6cfc, #00d4ff)" }}
        />
      </div>
    </div>
  );
}

function SkillCard({ group, index }: { group: typeof skillGroups[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="p-6 rounded-2xl"
      style={{
        background: "rgba(13,16,32,0.8)",
        border: "1px solid rgba(124,108,252,0.15)",
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 40px rgba(124,108,252,0.15), inset 0 0 40px rgba(124,108,252,0.03)";
        (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(124,108,252,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "";
        (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(124,108,252,0.15)";
      }}
    >
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,108,252,0.1), transparent)", transform: "translate(30%, -30%)" }}
      />
      <h3 style={{ color: "#00d4ff", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em", marginBottom: "20px" }}>
        {group.category.toUpperCase()}
      </h3>
      {group.skills.map((skill, i) => (
        <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={index * 0.1 + i * 0.08} />
      ))}
    </motion.div>
  );
}

const techBadges = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Shopify Hydrogen",
  "Shopify Liquid",
  "Tailwind CSS",
  "SCSS",
  "GSAP",
  "GraphQL",
  "REST APIs",
  "Node.js",
  "Git",
  "Figma",
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div style={{ color: "#7c6cfc", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.2em", marginBottom: "12px" }}>
          02 / SKILLS
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#f0f0ff", lineHeight: 1.1 }}>
          Tools of the trade
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {skillGroups.map((group, i) => (
          <SkillCard key={group.category} group={group} index={i} />
        ))}
      </div>

      {/* Tech badges */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap gap-2"
      >
        {techBadges.map((badge, i) => (
          <motion.span
            key={badge}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            whileHover={{ scale: 1.08, borderColor: "rgba(124,108,252,0.5)" }}
            className="px-3 py-1.5 rounded-full text-xs cursor-default"
            style={{
              border: "1px solid rgba(124,108,252,0.2)",
              color: "#a0a8d0",
              fontFamily: "'JetBrains Mono', monospace",
              background: "rgba(13,16,32,0.5)",
              transition: "all 0.2s",
            }}
          >
            {badge}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
