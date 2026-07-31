import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

export default function GalleryPage() {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(null);

  // Deterministic rotations to prevent hydration/render mismatch
  const rotations = [-2.5, 1.8, -1.2, 2.4, -1.8, 1.5];

  const items = [
    { id: 1, caption: "Our Best Moment ❤️", seed: 44 },
    { id: 2, caption: "Forever Together 🤝", seed: 23 },
    { id: 3, caption: "Unforgettable Day 🌟", seed: 87 },
    { id: 4, caption: "Always My Brother 💙", seed: 15 },
    { id: 5, caption: "Happy Memories 😊", seed: 62 },
    { id: 6, caption: "Brotherhood Goals 🤜🤛", seed: 39 }
  ];

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "90px 24px 60px",
        color: "#F8FAFC",
        position: "relative",
        zIndex: 10,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      {/* 1. Animated background floating sparkles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: ["0px", "-40px", "0px"],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 4 + (i % 3) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
            style={{
              position: "absolute",
              top: `${10 + (i * 85) % 80}%`,
              left: `${5 + (i * 73) % 90}%`,
              width: "4px",
              height: "4px",
              backgroundColor: "#F5C542",
              borderRadius: "50%",
              boxShadow: "0 0 8px #F5C542"
            }}
          />
        ))}
      </div>

      {/* 2. Header and Subtitles */}
      <div style={{ textAlign: "center", marginBottom: "40px", zIndex: 10 }}>
        <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#F5C542", fontWeight: 600 }}>
          Visual Album
        </span>
        <h2 
          className="font-cinematic text-gradient-gold text-glow"
          style={{ fontSize: "2.2rem", fontWeight: 700, marginTop: "8px" }}
        >
          ✨ Our Beautiful Memories ✨
        </h2>
        <p 
          style={{ 
            color: "var(--text-secondary)", 
            maxWidth: "500px", 
            margin: "12px auto 0", 
            fontSize: "0.95rem", 
            lineHeight: 1.5,
            fontStyle: "italic"
          }}
        >
          "Every picture tells a story, and every story reminds me how lucky I am to have you."
        </p>

        {/* Progress indicator */}
        <div style={{ marginTop: "16px", fontSize: "0.85rem", color: "#F5C542", fontWeight: 600 }}>
          📸 6 Beautiful Memories
        </div>
      </div>

      {/* 3. Polaroid Grid Layout */}
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "36px",
          marginBottom: "50px",
          zIndex: 5
        }}
      >
        {items.map((item, idx) => {
          const rotation = rotations[idx % rotations.length];
          return (
            <motion.div
              key={item.id}
              onClick={() => setActiveIdx(idx)}
              initial={{ opacity: 0, y: 30, rotate: rotation }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -12, 
                rotate: 0,
                scale: 1.02,
                boxShadow: "0 20px 30px rgba(245, 197, 66, 0.25)"
              }}
              style={{
                backgroundColor: "#FFFFFF",
                padding: "12px 12px 24px",
                borderRadius: "4px",
                cursor: "pointer",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.35)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              {/* Image Frame */}
              <div 
                style={{
                  width: "100%",
                  height: "220px",
                  backgroundImage: `url(https://picsum.photos/500/500?random=${item.seed})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "2px",
                  border: "1px solid rgba(0,0,0,0.06)"
                }}
              />

              {/* Handwritten style caption */}
              <div 
                style={{
                  marginTop: "16px",
                  color: "#0f172a",
                  fontFamily: "'Georgia', serif",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                {item.caption}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 4. Bottom Glass Card message */}
      <div 
        className="glassmorphism"
        style={{
          maxWidth: "600px",
          margin: "0 auto 40px",
          padding: "24px",
          borderRadius: "20px",
          border: "1.5px solid var(--glass-border)",
          boxShadow: "var(--glass-shadow)",
          textAlign: "center",
          zIndex: 10
        }}
      >
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, fontWeight: 500 }}>
          These are only a few memories. <br />
          Many more beautiful moments are waiting for us. <br />
          <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>Happy Birthday, Anna! ❤️</span>
        </p>
      </div>

      {/* 5. Glowing Letter Button */}
      <div style={{ display: "flex", justifyContent: "center", zIndex: 10 }}>
        <motion.button
          onClick={() => navigate("/final")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="premium-btn interactive-item animate-pulse-glow"
        >
          💌 Read My Final Letter
        </motion.button>
      </div>

      {/* 6. Lightbox Slider Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <div 
            onClick={() => setActiveIdx(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(5, 8, 22, 0.92)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "24px"
            }}
          >
            {/* Close trigger button */}
            <button
              onClick={() => setActiveIdx(null)}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(255,255,255,0.06)",
                border: "none",
                borderRadius: "50%",
                padding: "8px",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <X size={24} />
            </button>

            {/* Left Nav trigger */}
            <button
              onClick={handlePrev}
              style={{
                position: "absolute",
                left: "24px",
                background: "rgba(255,255,255,0.06)",
                border: "none",
                borderRadius: "50%",
                padding: "12px",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1010
              }}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Lightbox Polaroid Content Frame */}
            <motion.div
              key={activeIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "420px",
                width: "100%",
                backgroundColor: "#FFFFFF",
                padding: "16px 16px 32px",
                borderRadius: "6px",
                boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div 
                style={{
                  width: "100%",
                  height: "360px",
                  backgroundImage: `url(https://picsum.photos/500/500?random=${items[activeIdx].seed})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "4px"
                }}
              />
              <div 
                style={{
                  marginTop: "20px",
                  color: "#0f172a",
                  fontFamily: "'Georgia', serif",
                  fontSize: "1.2rem",
                  fontWeight: "bold"
                }}
              >
                {items[activeIdx].caption}
              </div>
            </motion.div>

            {/* Right Nav trigger */}
            <button
              onClick={handleNext}
              style={{
                position: "absolute",
                right: "24px",
                background: "rgba(255,255,255,0.06)",
                border: "none",
                borderRadius: "50%",
                padding: "12px",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1010
              }}
            >
              <ChevronRight size={28} />
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
