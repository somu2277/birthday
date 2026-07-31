import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

export default function WishTree() {
  const [selectedWish, setSelectedWish] = useState(null);
  const [activatedLeaves, setActivatedLeaves] = useState([]);

  const leaves = [
    { id: 1, cx: 130, cy: 110, r: 18, color: "#10b981", wish: "May your code compile bug-free on the first run! 💻" },
    { id: 2, cx: 270, cy: 110, r: 18, color: "#3b82f6", wish: "May your road be filled with laughter and loyalty. 🌟" },
    { id: 3, cx: 170, cy: 70, r: 18, color: "#ec4899", wish: "Wishing you health, endless peace, and happiness. 🍃" },
    { id: 4, cx: 230, cy: 70, r: 18, color: "#a78bfa", wish: "May every big dream you are building become reality. 🚀" },
    { id: 5, cx: 200, cy: 130, r: 18, color: "#fbbf24", wish: "Thank you for being the brother I can always rely on. 🤝" }
  ];

  const handleLeafClick = (leaf) => {
    setSelectedWish(leaf.wish);
    if (!activatedLeaves.includes(leaf.id)) {
      setActivatedLeaves([...activatedLeaves, leaf.id]);
    }
  };

  return (
    <div 
      className="glassmorphism"
      style={{
        padding: "40px calc(20px + 2vw)",
        borderRadius: "24px",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
        maxWidth: "700px",
        width: "100%",
        margin: "50px auto"
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h3 className="font-cinematic text-gradient-gold" style={{ fontSize: "1.6rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <Sparkles size={20} color="var(--color-gold)" style={{ flexShrink: 0 }} />
          The Magic Wish Tree
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "6px" }}>
          Click the glowing colored fruits on the tree to harvest a custom blessing.
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: "400px", height: "280px", position: "relative" }}>
        <svg viewBox="0 0 400 280" style={{ width: "100%", height: "100%" }}>
          <circle cx="200" cy="140" r="100" fill="var(--color-purple-glow)" opacity="0.1" filter="blur(20px)" />
          
          <path 
            d="M 185 280 L 195 190 Q 195 160 170 140 Q 155 130 145 135 L 140 120 Q 160 115 185 135 Q 200 150 205 170 Q 210 145 230 125 Q 245 110 265 115 L 260 125 Q 245 120 230 135 Q 210 155 205 190 L 215 280 Z" 
            fill="#d97706" 
          />
          
          <path 
            d="M 130 120 C 100 120, 100 80, 130 70 C 120 50, 160 30, 180 50 C 200 20, 240 30, 240 60 C 270 40, 300 70, 280 90 C 310 110, 290 140, 270 140 C 260 160, 210 170, 190 150 C 160 170, 120 150, 130 120 Z" 
            fill="rgba(16, 185, 129, 0.15)"
            stroke="rgba(16, 185, 129, 0.3)"
            strokeWidth="1.5"
          />

          {leaves.map((leaf) => {
            const isActivated = activatedLeaves.includes(leaf.id);
            return (
              <g key={leaf.id} style={{ cursor: "pointer" }} onClick={() => handleLeafClick(leaf)}>
                <motion.circle
                  cx={leaf.cx}
                  cy={leaf.cy}
                  r={leaf.r + 6}
                  fill="none"
                  stroke={isActivated ? "var(--color-gold)" : leaf.color}
                  strokeWidth="2"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: leaf.id * 0.3
                  }}
                />
                
                <motion.circle
                  cx={leaf.cx}
                  cy={leaf.cy}
                  r={leaf.r}
                  fill={isActivated ? "var(--color-gold)" : leaf.color}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    boxShadow: "0 0 10px rgba(255,255,255,0.4)",
                    filter: "drop-shadow(0px 3px 6px rgba(0,0,0,0.3))"
                  }}
                />

                <circle cx={leaf.cx} cy={leaf.cy} r="4" fill="#fff" opacity="0.8" />
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ height: "80px", display: "flex", alignItems: "center", justifyItems: "center", width: "100%", justifyContent: "center" }}>
        <AnimatePresence mode="wait">
          {selectedWish ? (
            <motion.div
              key={selectedWish}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="glassmorphism"
              style={{
                padding: "16px 24px",
                borderRadius: "16px",
                border: "1px solid var(--color-gold)",
                color: "#fff",
                fontSize: "1.05rem",
                fontWeight: 500,
                textAlign: "center",
                boxShadow: "0 0 15px var(--color-gold-glow)",
                maxWidth: "500px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <Heart size={18} fill="var(--color-pink)" color="var(--color-pink)" style={{ flexShrink: 0 }} />
              {selectedWish}
            </motion.div>
          ) : (
            <span style={{ color: "var(--text-muted)", fontStyle: "italic", fontSize: "0.95rem" }}>
              Select a glowing fruit to receive a blessing...
            </span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
