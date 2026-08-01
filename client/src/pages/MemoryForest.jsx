import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Maximize2, Image as ImageIcon, Heart, Calendar } from "lucide-react";
const localMemories = [];
const localGallery = [];

export default function MemoryForest({ onBack }) {
  const [memories, setMemories] = useState(localMemories);
  const [gallery, setGallery] = useState(localGallery);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  useEffect(() => {
    // Fetch memories from API
    fetch(`${import.meta.env.VITE_API_URL}/api/memories`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setMemories(data); })
      .catch(err => console.log("Using seed memories fallbacks:", err));

    // Fetch gallery from API
    fetch(`${import.meta.env.VITE_API_URL}/api/gallery`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setGallery(data); })
      .catch(err => console.log("Using seed gallery fallbacks:", err));
  }, []);

  return (
    <div 
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "100px 24px",
        color: "#fff",
        position: "relative",
        zIndex: 10
      }}
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        whileHover={{ x: -5 }}
        className="glassmorphism interactive-item"
        style={{
          border: "1px solid var(--glass-border)",
          borderRadius: "9999px",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--color-gold)",
          cursor: "pointer",
          fontWeight: 600,
          marginBottom: "40px"
        }}
      >
        <ChevronLeft size={16} />
        Back to Map
      </motion.button>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-purple)", fontWeight: 600 }}>
          Level Three
        </span>
        <h2 
          className="font-cinematic text-gradient-purple-pink"
          style={{ fontSize: "calc(1.8rem + 1.5vw)", fontWeight: 700, marginTop: "8px" }}
        >
          The Memory Forest
        </h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "12px", maxWidth: "600px", margin: "12px auto 0" }}>
          Every leaf on these trees represents a milestone in our bond. Explore them all to unlock the forest checkmark.
        </p>
      </div>

      {/* Grid of Memory Cards with Floating Hearts */}
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "30px",
          marginBottom: "80px"
        }}
      >
        {memories.map((memory, idx) => (
          <MemoryForestCard key={memory.id} memory={memory} index={idx} />
        ))}
      </div>

      {/* Visual Photo Gallery */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h3 className="font-cinematic text-gradient-gold" style={{ fontSize: "1.8rem", fontWeight: 600 }}>
          Visual Photo Log
        </h3>
      </div>

      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
          marginBottom: "80px"
        }}
      >
        {gallery.map((img, idx) => (
          <motion.div
            key={img.id}
            onClick={() => setActiveImageIndex(idx)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="glassmorphism interactive-item"
            style={{
              borderRadius: "24px",
              height: "260px",
              overflow: "hidden",
              cursor: "pointer",
              border: "1px solid var(--glass-border)",
              position: "relative"
            }}
          >
            <div 
              style={{
                width: "100%",
                height: "100%",
                background: img.gradient || "none",
                backgroundImage: img.imageUrl ? `url(${img.imageUrl})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {!img.gradient && !img.imageUrl && (
                <ImageIcon size={40} color="var(--text-muted)" />
              )}
              
              <div 
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  padding: "16px",
                  background: "linear-gradient(to top, rgba(15,23,42,0.95), transparent)"
                }}
              >
                <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#fff" }}>{img.title}</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "2px" }}>{img.caption}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Complete trial button */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="premium-btn interactive-item animate-pulse-glow"
        >
          Complete Trial & Return
        </motion.button>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <div 
            onClick={() => setActiveImageIndex(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "24px"
            }}
          >
            <motion.div
              key={activeImageIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glassmorphism"
              style={{
                maxWidth: "600px",
                width: "100%",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid var(--glass-border)",
                boxShadow: "var(--glass-shadow)"
              }}
            >
              <div 
                style={{
                  height: "380px",
                  background: gallery[activeImageIndex].gradient || "none",
                  backgroundImage: gallery[activeImageIndex].imageUrl ? `url(${gallery[activeImageIndex].imageUrl})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
              <div style={{ padding: "24px", backgroundColor: "var(--bg-secondary)" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--color-pink)", fontWeight: 600 }}>
                  {gallery[activeImageIndex].category || "Memory"}
                </span>
                <h3 className="font-cinematic" style={{ fontSize: "1.4rem", fontWeight: 700, margin: "6px 0" }}>
                  {gallery[activeImageIndex].title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                  {gallery[activeImageIndex].caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Memory card that handles hover-based heart emission
function MemoryForestCard({ memory, index }) {
  const [hearts, setHearts] = useState([]);

  const handleHoverStart = () => {
    const newHearts = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 - 40,
      size: Math.random() * 12 + 8,
      delay: i * 0.15
    }));
    setHearts(newHearts);
  };

  const handleHoverEnd = () => {
    setHearts([]);
  };

  return (
    <motion.div
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, borderColor: "var(--color-purple)", boxShadow: "0 10px 30px rgba(139,92,246,0.15)" }}
      className="glassmorphism"
      style={{
        padding: "30px",
        borderRadius: "24px",
        border: "1px solid var(--glass-border)",
        background: "linear-gradient(135deg, rgba(139,92,246,0.05), transparent)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Floating hearts container */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {hearts.map((h) => (
          <motion.svg
            key={h.id}
            viewBox="0 0 24 24"
            style={{
              position: "absolute",
              bottom: "20px",
              left: `calc(50% + ${h.x}px)`,
              width: h.size,
              height: h.size,
              fill: "var(--color-pink)",
              opacity: 0.6
            }}
            initial={{ y: 0, opacity: 0.6, scale: 0.8 }}
            animate={{ y: -160, opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.2, delay: h.delay, ease: "easeOut" }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </motion.svg>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center", color: "var(--color-purple)", marginBottom: "16px" }}>
        <Calendar size={18} />
        <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{memory.date}</span>
      </div>

      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
        {memory.title}
      </h3>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
        {memory.description}
      </p>
    </motion.div>
  );
}
