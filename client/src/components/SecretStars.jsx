import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";

export default function SecretStars() {
  const [activeStar, setActiveStar] = useState(null);

  const secretStarsList = [
    { id: 1, top: "15%", left: "8%", joke: "Remember that time we argued for 45 minutes about whether HTML is a programming language? Good times! 💻" },
    { id: 2, top: "55%", left: "88%", joke: "Joke: Why do programmers wear glasses? Because they can't C#! 🤓" },
    { id: 3, top: "82%", left: "5%", joke: "Secret memory: The epic 3 AM coffee run where we got locked out of the building. We solved the bug on the porch! ☕" }
  ];

  return (
    <>
      {secretStarsList.map((star) => (
        <motion.div
          key={star.id}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            zIndex: 10,
            cursor: "pointer"
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.9, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: star.id * 0.8
          }}
          onClick={() => setActiveStar(star)}
          className="interactive-item"
        >
          <Star size={18} fill="var(--color-gold)" color="var(--color-gold)" style={{ filter: "drop-shadow(0 0 6px var(--color-gold))" }} />
        </motion.div>
      ))}

      {/* Star Bubble Modal */}
      <AnimatePresence>
        {activeStar && (
          <div 
            onClick={() => setActiveStar(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "24px"
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glassmorphism"
              style={{
                maxWidth: "360px",
                width: "100%",
                borderRadius: "20px",
                padding: "24px",
                border: "1px solid var(--color-gold)",
                textAlign: "center",
                boxShadow: "0 0 20px var(--color-gold-glow)",
                position: "relative"
              }}
            >
              <button
                onClick={() => setActiveStar(null)}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: "none",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer"
                }}
              >
                <X size={16} />
              </button>

              <h4 className="font-cinematic" style={{ fontSize: "1.2rem", color: "var(--color-gold)", marginBottom: "12px" }}>
                🌟 Secret Star Found!
              </h4>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#fff" }}>
                "{activeStar.joke}"
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
