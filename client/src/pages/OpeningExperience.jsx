import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Moon } from "lucide-react";

export default function OpeningExperience({ onComplete, onPlayMusic }) {
  const [stage, setStage] = useState("unlock");

  useEffect(() => {
    if (stage === "sentence1") {
      const t = setTimeout(() => setStage("sentence2"), 3000);
      return () => clearTimeout(t);
    }
    if (stage === "sentence2") {
      const t = setTimeout(() => setStage("sentence3"), 3000);
      return () => clearTimeout(t);
    }
    if (stage === "sentence3") {
      const t = setTimeout(() => setStage("gift_ready"), 3500);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const handleUnlock = () => {
    onPlayMusic();
    setStage("sentence1");
  };

  return (
    <div 
      onClick={stage === "unlock" ? handleUnlock : undefined}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        overflow: "hidden",
        cursor: stage === "unlock" ? "pointer" : "default"
      }}
    >
      {stage !== "unlock" && (
        <div style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: "2px",
                height: "2px",
                backgroundColor: "#fff",
                borderRadius: "50%"
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: Math.random() * 3 + 2, delay: Math.random() * 2 }}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {stage === "unlock" && (
          <motion.div
            key="unlock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: "center", cursor: "pointer", padding: "24px" }}
            onClick={handleUnlock}
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ color: "var(--color-gold)", marginBottom: "16px", display: "flex", justifyContent: "center" }}
            >
              <Sparkles size={36} />
            </motion.div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Tap to enter the story
            </h3>
          </motion.div>
        )}

        {stage === "sentence1" && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 1 }}
            style={{ textAlign: "center", maxWidth: "600px", padding: "24px" }}
          >
            <h2 className="font-cinematic" style={{ fontSize: "calc(1.4rem + 0.8vw)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.6 }}>
              "Some people are born into our lives."
            </h2>
          </motion.div>
        )}

        {stage === "sentence2" && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 1 }}
            style={{ textAlign: "center", maxWidth: "600px", padding: "24px" }}
          >
            <h2 className="font-cinematic" style={{ fontSize: "calc(1.4rem + 0.8vw)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.6 }}>
              "Some become family by choice."
            </h2>
          </motion.div>
        )}

        {stage === "sentence3" && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 1 }}
            style={{ textAlign: "center", maxWidth: "600px", padding: "24px" }}
          >
            <h2 className="font-cinematic text-gradient-gold" style={{ fontSize: "calc(1.4rem + 0.8vw)", fontWeight: 600, fontStyle: "italic", lineHeight: 1.6 }}>
              "And today is about celebrating one of those special people."
            </h2>
          </motion.div>
        )}

        {stage === "gift_ready" && (
          <motion.div
            key="gift_ready"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{
                width: "90px",
                height: "90px",
                color: "var(--color-gold)",
                filter: "drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))",
                marginBottom: "16px"
              }}
            >
              <Moon size={90} fill="var(--color-gold)" stroke="none" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{ color: "var(--color-pink)", filter: "drop-shadow(0 0 25px var(--color-pink-glow))" }}
            >
              <Gift size={64} fill="var(--color-pink)" />
            </motion.div>

            <motion.button
              onClick={onComplete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="premium-btn interactive-item"
              style={{ marginTop: "20px" }}
            >
              Start the Journey
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
