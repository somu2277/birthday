import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Lock, Award, Sparkles } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import confetti from "canvas-confetti";

export default function SecretTreasure({ onBack, onComplete }) {
  const [chestOpened, setChestOpened] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);

  const handleOpenChest = () => {
    if (chestOpened) return;
    setChestOpened(true);

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#fbbf24", "#8b5cf6", "#ec4899"]
    });
  };

  const letterText = "Wishing you endless happiness, success, good health, laughter, unforgettable memories, and everything you've been working toward. Thank you for always being there. May this year be your best one yet.";

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
      {!letterOpen && (
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
      )}

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-gold)", fontWeight: 600 }}>
          Level Five
        </span>
        <h2 
          className="font-cinematic text-gradient-gold"
          style={{ fontSize: "calc(1.8rem + 1.5vw)", fontWeight: 700, marginTop: "8px" }}
        >
          The Secret Treasure
        </h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "12px" }}>
          {!chestOpened 
            ? "Click the magical chest below to unlock the final treasure." 
            : !letterOpen 
              ? "The chest has opened! Click the letter inside to read it." 
              : "Read the special birthday letter chosen for you."}
        </p>
      </div>

      {/* Chest Container */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "350px" }}>
        <AnimatePresence mode="wait">
          {!chestOpened ? (
            <motion.div
              key="closed-chest"
              onClick={handleOpenChest}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="interactive-item"
              style={{
                width: "200px",
                height: "160px",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "16px 16px 8px 8px",
                border: "2px solid var(--color-gold)",
                boxShadow: "0 0 35px var(--color-gold-glow)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
              }}
            >
              {/* Chest Lock */}
              <div 
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#06090f",
                  border: "2px solid var(--color-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-gold)"
                }}
              >
                <Lock size={20} />
              </div>
            </motion.div>
          ) : !letterOpen ? (
            <motion.div
              key="opened-chest"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}
            >
              {/* Gold light beams */}
              <div 
                style={{
                  position: "absolute",
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, var(--color-gold-glow) 0%, rgba(0,0,0,0) 70%)",
                  zIndex: 1,
                  pointerEvents: "none"
                }}
              />

              {/* Envelope */}
              <motion.div
                onClick={() => setLetterOpen(true)}
                whileHover={{ scale: 1.05 }}
                className="envelope-wrapper interactive-item"
                style={{ zIndex: 5 }}
              >
                <div className="envelope-flap" />
                <div 
                  className="letter-sheet"
                  style={{
                    backgroundColor: "#fff",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                    zIndex: 2,
                    height: "180px",
                    width: "300px",
                    left: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Award size={48} color="var(--color-gold)" />
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="letter-view"
              initial={{ scale: 0.95, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="glassmorphism"
              style={{
                width: "100%",
                maxWidth: "600px",
                borderRadius: "24px",
                padding: "36px",
                border: "1.5px solid var(--glass-border)",
                backgroundColor: "#fff",
                color: "#1f2937",
                boxShadow: "0 15px 35px rgba(0,0,0,0.4)"
              }}
            >
              <h4 
                className="font-cinematic" 
                style={{ 
                  color: "var(--color-purple)", 
                  fontSize: "1.6rem", 
                  fontStyle: "italic",
                  marginBottom: "20px",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  paddingBottom: "10px"
                }}
              >
                Dear Brother,
              </h4>
              
              <div style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#374151", minHeight: "130px" }}>
                <TypeAnimation
                  sequence={[
                    letterText,
                    1000
                  ]}
                  wrapper="p"
                  speed={65}
                  cursor={false}
                />
              </div>

              <div 
                className="font-cinematic" 
                style={{ 
                  textAlign: "right", 
                  fontWeight: 600, 
                  fontSize: "1.25rem", 
                  color: "var(--color-purple)",
                  fontStyle: "italic",
                  marginTop: "20px"
                }}
              >
                — Yours, Brother
              </div>

              {/* Action to complete Level 5 */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                <motion.button
                  onClick={onComplete}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="premium-btn interactive-item animate-pulse-glow"
                  style={{
                    background: "linear-gradient(135deg, var(--color-purple), var(--color-pink))",
                    color: "#fff",
                    boxShadow: "0 4px 15px rgba(236,72,153,0.3)"
                  }}
                >
                  Unveil Celebration
                  <Sparkles size={16} fill="#fff" style={{ marginLeft: "8px" }} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
