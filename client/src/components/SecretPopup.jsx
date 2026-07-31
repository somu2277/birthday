import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import confetti from "canvas-confetti";

export default function SecretPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedKeys, setTypedKeys] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      const char = e.key.toLowerCase();
      if (char.length === 1 && /[a-z]/.test(char)) {
        const nextKeys = (typedKeys + char).slice(-4);
        setTypedKeys(nextKeys);
        
        if (nextKeys === "gift" || nextKeys === "bday") {
          setIsOpen(true);
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ["#fbbf24", "#8b5cf6", "#ec4899"]
          });
          setTypedKeys("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typedKeys]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(17, 24, 39, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 100 }}
            className="glassmorphism"
            style={{
              maxWidth: "500px",
              width: "100%",
              borderRadius: "24px",
              padding: "32px",
              position: "relative",
              textAlign: "center",
              border: "2px solid var(--color-gold)"
            }}
          >
            {/* Close button */}
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                outline: "none"
              }}
            >
              <X size={20} />
            </button>

            {/* Icon */}
            <div style={{ display: "inline-flex", marginBottom: "16px", color: "var(--color-gold)" }}>
              <Sparkles className="animate-float" size={40} />
            </div>

            {/* Heading */}
            <h3 
              className="font-cinematic text-gradient-gold"
              style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "16px" }}
            >
              You Discovered the Easter Egg! 🌟
            </h3>

            {/* Message */}
            <p style={{ color: "var(--text-primary)", lineHeight: 1.7, fontSize: "1.05rem", marginBottom: "20px" }}>
              "Here's a secret message: true bonds aren't defined by blood, but by choice, loyalty, and the battles we fight side-by-side. You are the family I chose. No matter where life takes us, I've always got your back. May we conquer all our goals and codebases. Happy Birthday!"
            </p>

            {/* Hint */}
            <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              (Tip: You triggered this by typing 'gift' or 'bday' on your keyboard!)
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
