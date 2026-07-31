import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Laugh, Flame, Sparkles, Shield } from "lucide-react";

const reasons = [
  {
    id: 1,
    title: "Always Supporting",
    description: "The way you always support people, offering guidance and standing by their side through every coding block and life challenge.",
    icon: <Shield size={32} />,
    color: "var(--color-purple)",
    border: "rgba(139,92,246,0.2)",
    bg: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.02))"
  },
  {
    id: 2,
    title: "Making Us Laugh",
    description: "The way you make everyone laugh. Your humor is unmatched, turning stressful sprints into memorable joke-fests.",
    icon: <Laugh size={32} />,
    color: "var(--color-pink)",
    border: "rgba(236,72,153,0.2)",
    bg: "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(236,72,153,0.02))"
  },
  {
    id: 3,
    title: "Genuine Kindness",
    description: "The kindness you show to everyone around you, treating peers and friends like family without asking for anything in return.",
    icon: <Heart size={32} />,
    color: "var(--color-blue)",
    border: "rgba(59,130,246,0.2)",
    bg: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.02))"
  },
  {
    id: 4,
    title: "Strength & Grit",
    description: "The strength you have. Facing tough situations and bugs head-on, inspiring others to carry on with your determination.",
    icon: <Flame size={32} />,
    color: "var(--color-gold)",
    border: "rgba(251,191,36,0.2)",
    bg: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,191,36,0.02))"
  },
  {
    id: 5,
    title: "Spreading Positivity",
    description: "The positivity you spread. Your optimism changes the room, giving energy to everyone working toward their goals.",
    icon: <Sparkles size={32} />,
    color: "var(--color-pink)",
    border: "rgba(236,72,153,0.2)",
    bg: "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(236,72,153,0.02))"
  }
];

function LittleThingCard({ item }) {
  const [hearts, setHearts] = useState([]);

  const handleMouseEnter = () => {
    const newHearts = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
      size: Math.random() * 12 + 8,
      delay: i * 0.1
    }));
    setHearts(newHearts);
  };

  const handleMouseLeave = () => {
    setHearts([]);
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.05, 
        borderColor: item.color,
        boxShadow: `0 10px 30px ${item.color}33`
      }}
      className="glassmorphism"
      style={{
        padding: "36px",
        borderRadius: "24px",
        border: `1.5px solid ${item.border}`,
        background: item.bg,
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer"
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {hearts.map((h) => (
          <motion.svg
            key={h.id}
            viewBox="0 0 24 24"
            style={{
              position: "absolute",
              bottom: "10px",
              left: `calc(50% + ${h.x}px)`,
              width: h.size,
              height: h.size,
              fill: "var(--color-pink)",
              opacity: 0.6
            }}
            initial={{ y: 0, opacity: 0.6, scale: 0.8 }}
            animate={{ y: -150, opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.2, delay: h.delay, ease: "easeOut" }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </motion.svg>
        ))}
      </div>

      <div 
        style={{
          display: "inline-flex",
          color: item.color,
          backgroundColor: "rgba(255,255,255,0.03)",
          padding: "16px",
          borderRadius: "16px",
          width: "fit-content",
          zIndex: 2
        }}
      >
        {item.icon}
      </div>

      <div style={{ zIndex: 2 }}>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 600, color: "#fff", marginBottom: "12px" }}>
          {item.title}
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.98rem", lineHeight: 1.6 }}>
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Reasons() {
  return (
    <section 
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 10,
        color: "#fff",
        maxWidth: "1050px",
        margin: "0 auto"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-pink)", fontWeight: 600 }}>
          Chapter Five
        </span>
        <h2 
          className="font-cinematic text-gradient-gold text-glow"
          style={{ fontSize: "calc(1.8rem + 1.5vw)", fontWeight: 700, marginTop: "8px" }}
        >
          The Little Things
        </h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "12px" }}>
          A tribute to the character, strength, and heart that define you as a brother. Hover to interact.
        </p>
      </div>

      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "30px"
        }}
      >
        {reasons.map((item) => (
          <LittleThingCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
