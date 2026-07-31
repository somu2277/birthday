import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Share2, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export default function FinalCelebration({ onReplay }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
        position: "relative",
        zIndex: 10,
        color: "#fff"
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          maxWidth: "650px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px"
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--color-pink)" }}
        >
          <Heart size={48} fill="var(--color-pink)" />
        </motion.div>

        <h1 
          className="font-cinematic text-gradient-gold text-glow"
          style={{
            fontSize: "calc(2.5rem + 3vw)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.01em"
          }}
        >
          Happy Birthday!
        </h1>

        <p 
          style={{
            fontSize: "1.2rem",
            lineHeight: 1.8,
            color: "var(--text-primary)",
            fontFamily: "var(--font-sans)",
            fontWeight: 400
          }}
        >
          Thank you for being such an important part of my life. I hope today brings you as much happiness as you've brought to those around you.
        </p>

        <div style={{ display: "flex", gap: "20px", marginTop: "30px", flexWrap: "wrap", justifyContent: "center" }}>
          <motion.button
            onClick={onReplay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="premium-btn interactive-item"
            style={{
              padding: "12px 28px",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #a78bfa, #8b5cf6)",
              boxShadow: "0 4px 15px rgba(139,92,246,0.3)",
              color: "#fff"
            }}
          >
            <RotateCcw size={16} />
            Replay Experience
          </motion.button>

          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glassmorphism interactive-item"
            style={{
              padding: "12px 28px",
              fontSize: "1rem",
              borderRadius: "9999px",
              border: "1px solid var(--glass-border)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--color-gold)",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            <Share2 size={16} />
            Share Link
          </motion.button>
        </div>

        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="glassmorphism"
              style={{
                position: "fixed",
                bottom: "100px",
                padding: "10px 20px",
                borderRadius: "9999px",
                border: "1px solid var(--color-gold)",
                color: "var(--color-gold)",
                fontSize: "0.9rem",
                fontWeight: 500,
                boxShadow: "0 4px 15px rgba(251,191,36,0.2)"
              }}
            >
              URL copied to clipboard! Share the love! 🌟
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
