import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const localMemoriesFallback = [
  {
    _id: "6a6c78e2444e3f17327a4beb",
    title: "First Pic",
    date: "October 2021",
    description: "It started with a simple project collaboration, and we quickly realized we clicked perfectly. Your guidance and positive attitude set the foundation for our friendship.",
    category: "work",
    image: "/images/gallery/memory1.jpeg",
    position: 0
  },
  {
    _id: "6a6c78e2444e3f17327a4bec",
    title: "Blessed Bond",
    date: "March 2022",
    description: "Remember when we stayed up till 4 AM debugging that obscure memory leak? We were exhausted but laughing the entire time. Those nights defined our grit.",
    category: "adventure",
    image: "/images/gallery/memory3.jpeg",
    position: 1
  },
  {
    _id: "6a6c78e2444e3f17327a4bed",
    title: "The Unplanned Trip",
    date: "August 2022",
    description: "Taking off on a whim with no hotel booked, just a playlist of our favorite songs and a quest for the best highway diner. Absolutely unforgettable vibes.",
    category: "travel",
    image: "/images/gallery/memory2.jpeg",
    position: 2
  },
  {
    _id: "6a6c78e2444e3f17327a4bee",
    title: "Temple Vibes",
    date: "January 2024",
    description: "When you landed that major milestone, celebrating together felt like a win for both of us. Seeing you succeed is always one of my favorite things.",
    category: "celebration",
    image: "/images/gallery/memory4.jpeg",
    position: 3
  },
  {
    _id: "6a6c78e2444e3f17327a4bef",
    title: "Best Company",
    date: "June 2025",
    description: "When things got tough, you were the first person to offer support. No judgment, just pure loyalty and sound advice. You're more than just a friend; you're family.",
    category: "support",
    image: "/images/gallery/memory5.jpeg",
    position: 4
  },
  {
    _id: "6a6c78e2444e3f17327a4bf0",
    title: "Timeless Moments",
    date: "July 2026",
    description: "Always standing by each other and sharing the best laughs. Looking forward to many more milestones together.",
    category: "chat",
    image: "/images/gallery/memory6.jpeg",
    position: 5
  }
];

// Cache memories at the module level to act as an SWR/React Query cache
let cachedMemories = localMemoriesFallback;
let cachedIsLoaded = false;

export default function GalleryPage() {
  const navigate = useNavigate();
  const [memories, setMemories] = useState(cachedMemories);
  const [activeIdx, setActiveIdx] = useState(null);
  const [error, setError] = useState(null);

  // Helper function to preload images
  const preloadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = () => resolve(src);
    });
  };

  // Deterministic rotations to prevent hydration/render mismatch
  const rotations = [-2.5, 1.8, -1.2, 2.4, -1.8, 1.5];

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        controller.abort();
      }
    }, 8000); // 8-second timeout

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5099";

    fetch(`${API_URL}/api/memories`, { signal: controller.signal })
      .then((res) => {
        if (isMounted) {
          clearTimeout(timeoutId);
        }
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;

        let list = [];
        if (data && data.success && Array.isArray(data.memories)) {
          list = data.memories;
        } else if (Array.isArray(data)) {
          list = data;
        } else {
          throw new Error("Invalid response format from database server.");
        }

        // Enforce exactly 6 memory items by padding with local fallbacks if needed
        if (list.length > 0 && list.length < 6) {
          const filledList = [...list];
          for (let i = list.length; i < 6; i++) {
            filledList.push(localMemoriesFallback[i]);
          }
          list = filledList;
        }

        if (list.length > 0) {
          // Preload all images in the background before updating state to prevent flicker
          const preloadPromises = list.map((item) => preloadImage(item.image));
          Promise.all(preloadPromises)
            .then(() => {
              if (!isMounted) return;
              setMemories(list);
              cachedMemories = list;
              cachedIsLoaded = true;
              setError(null);
            })
            .catch(() => {
              // Even if preloading some images fails, update state to keep UI stable
              if (!isMounted) return;
              setMemories(list);
              cachedMemories = list;
              cachedIsLoaded = true;
              setError(null);
            });
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        clearTimeout(timeoutId);
        // Only set error if we don't have any cached/loaded memories to prevent UI disruption
        if (!cachedIsLoaded) {
          setError(err.name === "AbortError"
            ? "Request timed out. The backend memories server is taking too long to respond."
            : `Failed to connect to backend memories server: ${err.message}`
          );
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, []);

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? memories.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === memories.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      className="responsive-container"
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "90px 20px 60px",
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
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 700, marginTop: "8px" }}
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
          {error 
            ? "⚠️ Connection Error" 
            : `📸 ${memories.length} Beautiful ${memories.length === 1 ? "Memory" : "Memories"}`
          }
        </div>
      </div>

      {/* 3. Loading state, Error state, or Polaroid Grid Layout */}
      {error && memories.length === 0 ? (
        <div 
          className="glassmorphism animate-pulse-glow"
          style={{
            maxWidth: "600px",
            margin: "0 auto 40px",
            padding: "24px 32px",
            borderRadius: "20px",
            border: "1.5px solid rgba(239, 68, 68, 0.4)",
            boxShadow: "var(--glass-shadow)",
            textAlign: "center",
            color: "#FFFDF6",
            zIndex: 10
          }}
        >
          <span style={{ fontSize: "1.2rem", display: "block", marginBottom: "8px" }}>⚠️ API Connection Failed</span>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.5 }}>
            {error}
          </p>
        </div>
      ) : memories.length === 0 ? (
        <div 
          className="glassmorphism"
          style={{
            maxWidth: "600px",
            margin: "0 auto 40px",
            padding: "24px 32px",
            borderRadius: "20px",
            border: "1.5px solid var(--glass-border)",
            boxShadow: "var(--glass-shadow)",
            textAlign: "center",
            color: "#FFFDF6",
            zIndex: 10
          }}
        >
          <span style={{ fontSize: "1.2rem", display: "block", marginBottom: "8px" }}>📸 No Memories Found</span>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.5 }}>
            No memories have been added to the database yet.
          </p>
        </div>
      ) : (
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "36px",
            marginBottom: "50px",
            zIndex: 5
          }}
        >
          {memories.map((item, idx) => {
            const rotation = rotations[idx % rotations.length];
            return (
              <motion.div
                key={item._id || item.id}
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
                    backgroundImage: `url(${item.image})`,
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
                    fontSize: "0.95rem",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  {item.title}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 4. Bottom Glass Card message */}
      <div 
        className="glassmorphism"
        style={{
          maxWidth: "600px",
          width: "100%",
          margin: "0 auto 40px",
          padding: "24px",
          borderRadius: "20px",
          border: "1.5px solid var(--glass-border)",
          boxShadow: "var(--glass-shadow)",
          textAlign: "center",
          zIndex: 10
        }}
      >
        <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6, fontWeight: 500 }}>
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
        {activeIdx !== null && memories.length > 0 && (
          <div 
            onClick={() => setActiveIdx(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(5, 8, 22, 0.92)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "20px"
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
                left: "16px",
                background: "rgba(255,255,255,0.06)",
                border: "none",
                borderRadius: "50%",
                padding: "10px",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1010
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Lightbox Polaroid Content Frame */}
            <motion.div
              key={activeIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "400px",
                width: "100%",
                backgroundColor: "#FFFFFF",
                padding: "16px 16px 28px",
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
                  height: "260px",
                  backgroundImage: `url(${memories[activeIdx].image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "4px"
                }}
              />
              <div 
                style={{
                  marginTop: "20px",
                  color: "#0f172a",
                  textAlign: "center",
                  width: "100%"
                }}
              >
                <h4 style={{ fontFamily: "'Georgia', serif", fontSize: "1.15rem", fontWeight: "bold", marginBottom: "4px" }}>
                  {memories[activeIdx].title}
                </h4>
                <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 700 }}>
                  {memories[activeIdx].date}
                </span>
                <p style={{ fontSize: "0.85rem", color: "#334155", marginTop: "10px", lineHeight: 1.5, fontFamily: "sans-serif", fontWeight: 500 }}>
                  {memories[activeIdx].description}
                </p>
              </div>
            </motion.div>

            {/* Right Nav trigger */}
            <button
              onClick={handleNext}
              style={{
                position: "absolute",
                right: "16px",
                background: "rgba(255,255,255,0.06)",
                border: "none",
                borderRadius: "50%",
                padding: "10px",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1010
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
