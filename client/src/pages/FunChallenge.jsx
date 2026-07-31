import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Trophy, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function FunChallenge({ onBack }) {
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState([]);
  const [challengeComplete, setChallengeComplete] = useState(false);

  // Spawns balloons at random intervals
  useEffect(() => {
    if (challengeComplete) return;

    const spawnInterval = setInterval(() => {
      if (balloons.length >= 8) return; // Cap maximum active balloons

      const newBalloon = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10, // Avoid far borders
        color: ["#fbbf24", "#8b5cf6", "#ec4899", "#3b82f6", "#10b981"][Math.floor(Math.random() * 5)],
        speed: Math.random() * 4 + 4, // Seconds to float to top
        size: Math.random() * 20 + 35 // Diameter
      };
      setBalloons((prev) => [...prev, newBalloon]);
    }, 1100);

    return () => clearInterval(spawnInterval);
  }, [balloons, challengeComplete]);

  const handlePop = (id) => {
    // Pop confetti at the click coordinate
    confetti({
      particleCount: 25,
      spread: 60,
      colors: ["#fbbf24", "#8b5cf6", "#ec4899"]
    });

    setBalloons((prev) => prev.filter((b) => b.id !== id));
    setScore((prev) => {
      const nextScore = prev + 1;
      if (nextScore >= 10) {
        setChallengeComplete(true);
        confetti({
          particleCount: 150,
          spread: 80,
          colors: ["#fbbf24", "#8b5cf6", "#ec4899"]
        });
      }
      return nextScore;
    });
  };

  const handleCleanBalloon = (id) => {
    // Clean balloons that floated out of the screen
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div 
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "100px 24px",
        color: "#fff",
        position: "relative",
        zIndex: 10,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
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
          marginBottom: "40px",
          alignSelf: "flex-start"
        }}
      >
        <ChevronLeft size={16} />
        Back to Map
      </motion.button>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-pink)", fontWeight: 600 }}>
          Level Four
        </span>
        <h2 
          className="font-cinematic text-gradient-purple-pink"
          style={{ fontSize: "calc(1.8rem + 1.5vw)", fontWeight: 700, marginTop: "8px" }}
        >
          Pop the Balloons!
        </h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "12px" }}>
          Click or tap the floating balloons. Pop 10 to claim your Adventure Badge.
        </p>
      </div>

      {/* Score Tracker */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
        <div 
          className="glassmorphism"
          style={{
            padding: "12px 28px",
            borderRadius: "9999px",
            border: "1px solid var(--glass-border)",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "var(--color-gold)"
          }}
        >
          Score: {score} / 10
        </div>
      </div>

      {/* Play Area */}
      <div 
        style={{
          flex: 1,
          minHeight: "350px",
          position: "relative",
          borderRadius: "24px",
          border: "1.5px dashed var(--glass-border)",
          backgroundColor: "rgba(255,255,255,0.01)",
          overflow: "hidden"
        }}
      >
        <AnimatePresence>
          {!challengeComplete && balloons.map((b) => (
            <motion.div
              key={b.id}
              initial={{ y: "450px", opacity: 1 }}
              animate={{ y: "-100px" }}
              exit={{ scale: 0, opacity: 0 }}
              onAnimationComplete={(definition) => {
                // Remove balloon when animation reaches top
                handleCleanBalloon(b.id);
              }}
              onClick={() => handlePop(b.id)}
              transition={{ duration: b.speed, ease: "linear" }}
              className="interactive-item"
              style={{
                position: "absolute",
                left: `${b.x}%`,
                width: b.size,
                height: b.size * 1.3,
                borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
                backgroundColor: b.color,
                boxShadow: `inset -4px -4px 8px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2), 0 0 12px ${b.color}44`,
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                zIndex: 5
              }}
            >
              {/* String */}
              <div 
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  width: "1px",
                  height: "20px",
                  backgroundColor: "rgba(255,255,255,0.4)"
                }}
              />
              {/* Knot */}
              <div 
                style={{
                  position: "absolute",
                  bottom: "-2px",
                  borderLeft: "3px solid transparent",
                  borderRight: "3px solid transparent",
                  borderBottom: `5px solid ${b.color}`
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Challenge Complete Modal */}
        <AnimatePresence>
          {challengeComplete && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(6, 9, 15, 0.9)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "24px",
                gap: "24px",
                zIndex: 10
              }}
            >
              <div style={{ color: "var(--color-gold)", filter: "drop-shadow(0 0 15px var(--color-gold-glow))" }}>
                <Trophy size={64} className="animate-float" />
              </div>

              <h3 className="font-cinematic text-gradient-gold" style={{ fontSize: "2rem", fontWeight: 700 }}>
                Challenge Completed!
              </h3>
              
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "420px" }}>
                You popped all balloons and unlocked the **Adventure Badge**! You're one step closer to the treasure.
              </p>

              <motion.button
                onClick={onBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="premium-btn interactive-item"
                style={{ display: "flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #10b981, #059669)" }}
              >
                Claim Badge & Exit
                <Sparkles size={16} fill="#fff" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
