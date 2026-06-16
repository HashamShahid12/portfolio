import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const projects = [
  {
    title: "Shop at Orient",
    description:
      "Shopify Hydrogen headless storefront built for a modern eCommerce experience with optimized performance, reusable components, and dynamic product handling.",
    image:
      "https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Shopify Hydrogen", "React", "GraphQL", "Tailwind CSS"],
    href: "https://shopatorient.com/",
    accent: "#7c6cfc",
    stat: "Headless Commerce",
  },
  {
    title: "Linens Limited",
    description:
      "High-performance Shopify Hydrogen storefront focused on clean UI, fast navigation, and scalable product architecture for a modern shopping experience.",
    image:
      "https://images.unsplash.com/photo-1534973098198-6b2de48816b7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Shopify Hydrogen", "Next.js", "Storefront API", "CSS"],
    href: "https://linenslimited.com/",
    accent: "#00d4ff",
    stat: "Hydrogen Build",
  },
  {
    title: "Sapphire Fibres",
    description:
      "Next.js-based corporate website with responsive UI, optimized performance, and reusable component architecture for a professional brand presence.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Next.js", "JavaScript", "CSS", "Responsive UI"],
    href: "https://sapphirefibres.com/",
    accent: "#ff6b9d",
    stat: "Next.js App",
  },
  {
    title: "Route2Health",
    description:
      "Custom Shopify theme development with improved UX, optimized product pages, and performance-focused implementation for better conversions.",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Shopify Theme", "Liquid", "JavaScript", "CSS"],
    href: "https://route2health.com/",
    accent: "#7c6cfc",
    stat: "Theme Customization",
  },
];

function TiltCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 30 });
  const springY = useSpring(y, { stiffness: 200, damping: 30 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0); y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        className="rounded-2xl overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div
          style={{
            background: "rgba(13,16,32,0.9)",
            border: `1px solid ${hovered ? project.accent + "50" : "rgba(124,108,252,0.15)"}`,
            boxShadow: hovered ? `0 20px 60px ${project.accent}25` : "none",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
        >
          {/* Image */}
          <div className="relative overflow-hidden" style={{ height: 220 }}>
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 40%, rgba(13,16,32,0.95) 100%), linear-gradient(135deg, ${project.accent}15, transparent)`,
              }}
            />
            <span
              className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-mono"
              style={{
                background: `${project.accent}20`,
                border: `1px solid ${project.accent}40`,
                color: project.accent,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {project.stat}
            </span>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 style={{ color: "#f0f0ff", fontSize: "1.2rem", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "8px" }}>
              {project.title}
            </h3>
            <p style={{ color: "#6070a0", fontSize: "0.875rem", lineHeight: 1.6, fontFamily: "'Inter', sans-serif", marginBottom: "16px" }}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs px-2.5 py-1 rounded-md"
                  style={{
                    background: "rgba(124,108,252,0.08)",
                    border: "1px solid rgba(124,108,252,0.2)",
                    color: "#a0a8d0",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <motion.button
              animate={{ opacity: hovered ? 1 : 0.5 }}
              style={{
                color: project.accent,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onClick={() => window.open(project.href, "_blank")}
            >
              View project
              <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
                →
              </motion.span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div style={{ color: "#7c6cfc", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.2em", marginBottom: "12px" }}>
          03 / PROJECTS
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#f0f0ff", lineHeight: 1.1 }}>
          Things I've shipped
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <TiltCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
