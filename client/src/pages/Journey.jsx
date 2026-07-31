import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, Compass, Plane, Trophy, HeartHandshake } from "lucide-react";
import { memories as localMemories } from "../data/memories";

const getCategoryIcon = (category) => {
  switch (category) {
    case "work": return <Briefcase size={28} />;
    case "adventure": return <Compass size={28} />;
    case "travel": return <Plane size={28} />;
    case "celebration": return <Trophy size={28} />;
    case "support": return <HeartHandshake size={28} />;
    default: return <Calendar size={28} />;
  }
};

const getCategoryGradient = (category) => {
  switch (category) {
    case "work": return "linear-gradient(135deg, #fbbf24, #ea580c)";
    case "adventure": return "linear-gradient(135deg, #a78bfa, #ec4899)";
    case "travel": return "linear-gradient(135deg, #3b82f6, #06b6d4)";
    case "celebration": return "linear-gradient(135deg, #10b981, #059669)";
    case "support": return "linear-gradient(135deg, #ec4899, #f43f5e)";
    default: return "linear-gradient(135deg, #6b7280, #374151)";
  }
};

export default function Journey() {
  const [memories, setMemories] = useState(localMemories);

  useEffect(() => {
    fetch("/api/memories")
      .then(res => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) setMemories(data);
      })
      .catch(err => {
        console.log("Could not load API memories, using seed fallback:", err);
      });
  }, []);

  return (
    <div style={{ color: "#fff", position: "relative", zIndex: 10 }}>
      <div 
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px 0"
        }}
      >
        <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--color-pink)", fontWeight: 600 }}>
          Chapter Three
        </span>
        <h2 
          className="font-cinematic text-gradient-gold text-glow"
          style={{ fontSize: "calc(2.2rem + 1.5vw)", fontWeight: 700, marginTop: "12px" }}
        >
          Our Story
        </h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "12px", maxWidth: "600px" }}>
          Every memory is a step in our journey. Scroll down to enter the chapters of our brotherhood.
        </p>
      </div>

      {memories.map((memory, idx) => {
        const isEven = idx % 2 === 0;
        const gradient = getCategoryGradient(memory.category);

        return (
          <section 
            key={memory.id} 
            className="story-chapter-section"
            style={{
              background: idx % 2 === 0 ? "rgba(0,0,0,0.1)" : "transparent"
            }}
          >
            <div 
              style={{
                position: "absolute",
                top: 0,
                left: isEven ? "0%" : "50%",
                width: "50%",
                height: "100%",
                background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.04) 0%, transparent 60%)",
                pointerEvents: "none"
              }}
            />

            <div 
              className="story-chapter-container"
              style={{
                direction: isEven ? "ltr" : "rtl"
              }}
            >
              {/* Left Column: Fullscreen Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="glassmorphism"
                style={{
                  height: "350px",
                  borderRadius: "30px",
                  background: gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1.5px solid var(--glass-border)",
                  boxShadow: "var(--glass-shadow)",
                  position: "relative",
                  overflow: "hidden",
                  direction: "ltr"
                }}
              >
                <div style={{ opacity: 0.1, transform: "scale(7)", position: "absolute" }}>
                  {getCategoryIcon(memory.category)}
                </div>
                <div 
                  className="font-cinematic"
                  style={{
                    fontSize: "4.5rem",
                    fontWeight: 700,
                    color: "rgba(255, 255, 255, 0.25)",
                    textShadow: "0 4px 10px rgba(0,0,0,0.1)"
                  }}
                >
                  0{idx + 1}
                </div>
              </motion.div>

              {/* Right Column: Descriptions */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? 80 : -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  textAlign: "left",
                  direction: "ltr"
                }}
              >
                <span 
                  style={{
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "var(--color-gold)",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  {getCategoryIcon(memory.category)}
                  {memory.date}
                </span>

                <h3 
                  className="font-cinematic text-gradient-purple-pink"
                  style={{ fontSize: "calc(1.6rem + 0.6vw)", fontWeight: 700, lineHeight: 1.2 }}
                >
                  {memory.title}
                </h3>

                <p 
                  style={{
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                    color: "var(--text-secondary)"
                  }}
                >
                  {memory.description}
                </p>
              </motion.div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
