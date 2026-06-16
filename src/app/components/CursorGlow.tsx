import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(124,108,252,0.12) 0%, rgba(0,212,255,0.04) 50%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
