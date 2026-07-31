import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Compass, Play } from "lucide-react";

export default function WelcomeGate({ onStart, onPlayMusic }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleStart = () => {
    onPlayMusic();
    setIsOpening(true);
    setTimeout(onStart, 1200); // Allow open animation to finish
  };

  return (
    <div 
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff"
      }}
    >
      {/* Split Gate doors */}
      <motion.div
        animate={isOpening ? { x: "-100%" } : { x: "0%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "#0d1321",
          borderRight: "3px solid var(--color-gold)",
          zIndex: 11,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          boxShadow: "10px 0 30px rgba(0,0,0,0.8)",
          overflow: "hidden"
        }}
      >
        {/* Right Half of Gate emblem */}
        <div style={{ marginRight: "-45px", color: "var(--color-gold)", opacity: 0.15, transform: "scale(2.5)" }}>
          <Compass size={90} />
        </div>
      </motion.div>

      <motion.div
        animate={isOpening ? { x: "100%" } : { x: "0%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "#0d1321",
          borderLeft: "3px solid var(--color-gold)",
          zIndex: 11,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.8)",
          overflow: "hidden"
        }}
      >
        {/* Left Half of Gate emblem */}
        <div style={{ marginLeft: "-45px", color: "var(--color-gold)", opacity: 0.15, transform: "scale(2.5)" }}>
          <Compass size={90} />
        </div>
      </motion.div>

      {/* Center Gate Lock & Handle */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute",
              zIndex: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              textAlign: "center",
              padding: "24px"
            }}
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 0.7, letterSpacing: "0.25em" }}
              style={{
                fontSize: "0.9rem",
                textTransform: "uppercase",
                color: "var(--color-pink)",
                fontWeight: 600
              }}
            >
              The Birthday Adventure
            </motion.span>

            <h1 
              className="font-cinematic text-gradient-gold text-glow"
              style={{
                fontSize: "calc(2.5rem + 3.2vw)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.01em"
              }}
            >
              Welcome, Hero!
            </h1>

            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "480px" }}>
              The gates to your personalized journey are locked. Unlock the adventure to reach the final surprise.
            </p>

            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="premium-btn interactive-item animate-pulse-glow"
              style={{ marginTop: "16px" }}
            >
              Start Adventure
              <Play size={16} fill="#111827" style={{ marginLeft: "8px" }} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
