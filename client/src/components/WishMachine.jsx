import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Play } from "lucide-react";
import confetti from "canvas-confetti";

export default function WishMachine() {
  const attributes = ["Happiness 💖", "Success 🚀", "Health 🍃", "Peace 🕊️", "Dreams 🌟", "Love 💝"];
  
  const [slots, setSlots] = useState(["Happiness 💖", "Success 🚀", "Health 🍃"]);
  const [isSpinning, setIsSpinning] = useState(false);

  const startSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    let count = 0;
    const interval = setInterval(() => {
      setSlots([
        attributes[Math.floor(Math.random() * attributes.length)],
        attributes[Math.floor(Math.random() * attributes.length)],
        attributes[Math.floor(Math.random() * attributes.length)]
      ]);
      count++;
      if (count > 15) {
        clearInterval(interval);
        
        const final = [
          attributes[Math.floor(Math.random() * attributes.length)],
          attributes[Math.floor(Math.random() * attributes.length)],
          attributes[Math.floor(Math.random() * attributes.length)]
        ];
        setSlots(final);
        setIsSpinning(false);

        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#fbbf24", "#8b5cf6", "#ec4899"]
        });
      }
    }, 100);
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
        <h3 className="font-cinematic text-gradient-purple-pink" style={{ fontSize: "1.6rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <Sparkles size={20} color="var(--color-pink)" style={{ flexShrink: 0 }} />
          Birthday Wish Generator
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "6px" }}>
          Press generate to run the machine slot loops and harvest a triple blast of positive energy!
        </p>
      </div>

      <div style={{ display: "flex", gap: "16px", justifyContent: "center", width: "100%", flexWrap: "wrap" }}>
        {slots.map((slot, idx) => (
          <motion.div
            key={idx}
            animate={isSpinning ? { y: [-10, 10, -10] } : {}}
            transition={{ repeat: isSpinning ? Infinity : 0, duration: 0.15 }}
            className="glassmorphism"
            style={{
              padding: "20px 24px",
              borderRadius: "16px",
              border: "1.5px solid var(--glass-border)",
              backgroundColor: "rgba(15, 23, 42, 0.4)",
              minWidth: "150px",
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: 700,
              boxShadow: "inset 0 0 15px rgba(0,0,0,0.5)",
              color: idx === 0 ? "var(--color-pink)" : idx === 1 ? "var(--color-purple)" : "var(--color-gold)"
            }}
          >
            {slot}
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={startSpin}
        disabled={isSpinning}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="premium-btn interactive-item"
        style={{
          background: isSpinning ? "var(--bg-secondary)" : "linear-gradient(135deg, #a78bfa, #ec4899)",
          color: "#fff",
          boxShadow: "0 4px 15px rgba(236,72,153,0.3)",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        <Play size={16} fill="#fff" />
        {isSpinning ? "Spinning..." : "Generate Wishes"}
      </motion.button>
    </div>
  );
}
