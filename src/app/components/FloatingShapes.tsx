import { motion } from "motion/react";

const shapes = [
  { id: 1, type: "sphere", size: 280, x: "8%", y: "12%", color: "rgba(124,108,252,0.18)", delay: 0, dur: 8 },
  { id: 2, type: "sphere", size: 180, x: "82%", y: "6%", color: "rgba(0,212,255,0.15)", delay: 1.5, dur: 10 },
  { id: 3, type: "sphere", size: 120, x: "72%", y: "70%", color: "rgba(124,108,252,0.12)", delay: 0.8, dur: 7 },
  { id: 4, type: "cube", size: 60, x: "15%", y: "75%", color: "rgba(0,212,255,0.2)", delay: 2, dur: 9 },
  { id: 5, type: "ring", size: 200, x: "88%", y: "45%", color: "rgba(124,108,252,0.1)", delay: 0.3, dur: 12 },
  { id: 6, type: "cube", size: 40, x: "45%", y: "88%", color: "rgba(0,212,255,0.15)", delay: 1, dur: 6 },
];

function Sphere({ size, color }: { size: number; color: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${color}, transparent 70%)`,
        backdropFilter: "blur(2px)",
        border: `1px solid ${color}`,
        boxShadow: `0 0 ${size / 2}px ${color}, inset 0 0 ${size / 3}px ${color}`,
      }}
    />
  );
}

function Cube({ size, color }: { size: number; color: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `1.5px solid ${color}`,
        boxShadow: `0 0 20px ${color}`,
        transform: "rotate(45deg)",
        background: `linear-gradient(135deg, ${color}, transparent)`,
      }}
    />
  );
}

function Ring({ size, color }: { size: number; color: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        boxShadow: `0 0 30px ${color}, inset 0 0 30px ${color}`,
      }}
    />
  );
}

export function FloatingShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {shapes.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -24, 0],
            rotate: s.type === "cube" ? [0, 360] : [0, 5, 0],
          }}
          transition={{
            opacity: { duration: 1.2, delay: s.delay },
            scale: { duration: 1.2, delay: s.delay },
            y: { duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay },
            rotate: s.type === "cube"
              ? { duration: s.dur * 2, repeat: Infinity, ease: "linear" }
              : { duration: s.dur, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {s.type === "sphere" && <Sphere size={s.size} color={s.color} />}
          {s.type === "cube" && <Cube size={s.size} color={s.color} />}
          {s.type === "ring" && <Ring size={s.size} color={s.color} />}
        </motion.div>
      ))}
    </div>
  );
}
