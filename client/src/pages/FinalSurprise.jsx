import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Download, Share2, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export default function FinalSurprise({ onReplay }) {
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

  const handleDownload = () => {
    // Triggers download of placeholder memory snapshot
    const link = document.createElement("a");
    link.href = "https://picsum.photos/800/600";
    link.download = "Memory_Snapshot.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px",
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
          animate={{ scale: [1, 1.15, 1] }}
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
          Thank You, Hero!
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
          Thank you for completing this trial. You've walked down Memory Forest, conquered the Balloon Popping trials, and opened the Secret Chest.
        </p>

        {/* Premium Note Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", marginTop: "20px" }}>
          <div 
            className="glassmorphism"
            style={{
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid var(--glass-border)",
              textAlign: "left"
            }}
          >
            <h4 style={{ fontWeight: 600, color: "var(--color-gold)", marginBottom: "8px" }}>Best Wishes</h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              May your codebase always compile, your servers always scale, and your journey be filled with laughter and loyalty.
            </p>
          </div>

          <div 
            className="glassmorphism"
            style={{
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid var(--glass-border)",
              textAlign: "left"
            }}
          >
            <h4 style={{ fontWeight: 600, color: "var(--color-pink)", marginBottom: "8px" }}>Personal Note</h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              You're more than just a friend; you are a brother. Through every late-night coding session, sprint planning, and life checkpoint, having you by my side has made the road unforgettable.
            </p>
          </div>
        </div>

        {/* Buttons Grid */}
        <div style={{ display: "flex", gap: "16px", marginTop: "40px", flexWrap: "wrap", justifyContent: "center" }}>
          <motion.button
            onClick={onReplay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="premium-btn interactive-item"
            style={{
              padding: "12px 24px",
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #a78bfa, #8b5cf6)",
              boxShadow: "0 4px 15px rgba(139,92,246,0.3)",
              color: "#fff"
            }}
          >
            <RotateCcw size={16} />
            Replay Adventure
          </motion.button>

          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glassmorphism interactive-item"
            style={{
              padding: "12px 24px",
              fontSize: "0.95rem",
              borderRadius: "9999px",
              border: "1px solid var(--glass-border)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--color-pink)",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            <Download size={16} />
            Download Snapshot
          </motion.button>

          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glassmorphism interactive-item"
            style={{
              padding: "12px 24px",
              fontSize: "0.95rem",
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
            Share Celebration
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
