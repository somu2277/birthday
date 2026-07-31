import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Countdown({ onComplete }) {
  const [number, setNumber] = useState(3);

  useEffect(() => {
    if (number === 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      const timer = setTimeout(onComplete, 1500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setNumber(prev => prev - 1);
    }, 1200);

    return () => clearTimeout(timer);
  }, [number, onComplete]);

  return (
    <div 
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--bg-primary)",
        position: "relative",
        zIndex: 10,
        color: "#fff"
      }}
    >
      <AnimatePresence mode="wait">
        {number > 0 ? (
          <motion.div
            key={number}
            initial={{ scale: 0.2, opacity: 0, rotate: -20 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              rotate: 0,
              textShadow: "0 0 40px var(--color-purple)"
            }}
            exit={{ scale: 2.2, opacity: 0, filter: "blur(10px)", rotate: 10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              fontSize: "12rem",
              fontWeight: 800,
              fontFamily: "var(--font-sans)",
              color: number === 3 ? "var(--color-blue)" : number === 2 ? "var(--color-purple)" : "var(--color-pink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {number}
          </motion.div>
        ) : (
          <motion.div
            key="happy-birthday"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              textShadow: "0 0 50px var(--color-gold-glow)"
            }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              textAlign: "center"
            }}
          >
            <h1 
              className="font-cinematic text-gradient-gold"
              style={{
                fontSize: "calc(2.5rem + 4vw)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1
              }}
            >
              Surprise! 🎉
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", letterSpacing: "0.1em" }}>
              Welcome to your birthday journey.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
