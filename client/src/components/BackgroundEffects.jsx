import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function BackgroundEffects() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const allParticles = useMemo(() => {
    const types = ["star", "sparkle", "dust", "heart", "bokeh"];
    return Array.from({ length: 35 }).map((_, i) => {
      const type = types[i % types.length];
      let char = "✨";
      let size = 8;
      let color = "rgba(244, 197, 66, 0.4)";
      let blur = "none";
      
      if (type === "star") {
        char = "⭐";
        size = Math.random() * 6 + 6;
      } else if (type === "sparkle") {
        char = "✨";
        size = Math.random() * 8 + 8;
      } else if (type === "dust") {
        char = "•";
        size = Math.random() * 4 + 3;
      } else if (type === "heart") {
        char = "❤️";
        size = Math.random() * 5 + 5;
        color = "rgba(224, 169, 169, 0.35)"; // Rose gold pinkish
      } else if (type === "bokeh") {
        char = "";
        size = Math.random() * 12 + 10;
        color = "rgba(251, 191, 36, 0.15)";
        blur = "blur(2px)";
      }

      return {
        id: i,
        char,
        size,
        type,
        color,
        blur,
        left: `${Math.random() * 96}%`,
        delay: Math.random() * 20,
        duration: Math.random() * 18 + 12
      };
    });
  }, []);

  const activeParticles = useMemo(() => {
    return isHomePage ? allParticles.slice(0, 15) : allParticles;
  }, [isHomePage, allParticles]);

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
        background: "linear-gradient(to bottom, #070b19 0%, #0c0f1d 50%, #03050b 100%)"
      }}
    >
      {/* Soft Gold Light Center Glow */}
      <div 
        style={{
          position: "absolute",
          top: "-15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70vw",
          height: "50vh",
          background: "radial-gradient(circle, rgba(251, 191, 36, 0.045) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 100%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          zIndex: 1
        }}
      />

      {/* Floating Sparkles, Gold Dust & Shimmers Layer */}
      {activeParticles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "105vh", opacity: 0 }}
          animate={{ 
            y: "-10vh",
            opacity: [0, 0.8, 0.8, 0],
            x: ["0px", `${(p.id % 2 === 0 ? 1 : -1) * 30}px`, "0px"]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            left: p.left,
            fontSize: `${p.size}px`,
            color: p.color,
            filter: p.blur,
            textShadow: p.type !== "dust" && p.type !== "bokeh" ? `0 0 ${p.size / 2}px ${p.color}` : "none",
            width: p.type === "bokeh" ? `${p.size}px` : "auto",
            height: p.type === "bokeh" ? `${p.size}px` : "auto",
            backgroundColor: p.type === "bokeh" ? p.color : "transparent",
            borderRadius: p.type === "bokeh" ? "50%" : "0"
          }}
        >
          {p.char}
        </motion.div>
      ))}
    </div>
  );
}
