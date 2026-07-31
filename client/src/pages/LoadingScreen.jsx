import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, Volume2, VolumeX } from "lucide-react";

export default function LoadingScreen({ onComplete, onPlayMusic, isMuted, onToggleMute }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1.5;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#06090f",
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
        padding: "24px"
      }}
    >
      {/* Top right Audio toggle */}
      <div style={{ position: "absolute", top: "24px", right: "24px" }}>
        <button
          onClick={() => {
            onPlayMusic();
            onToggleMute();
          }}
          className="glassmorphism"
          style={{
            border: "1px solid var(--glass-border)",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-gold)",
            cursor: "pointer"
          }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Animated Compass Logo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          width: "90px",
          height: "90px",
          color: "var(--color-gold)",
          filter: "drop-shadow(0 0 15px var(--color-gold-glow))",
          marginBottom: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Compass size={80} />
      </motion.div>

      {/* Message */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          fontSize: "1.15rem",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
          marginBottom: "24px",
          textAlign: "center"
        }}
      >
        Preparing your adventure...
      </motion.h3>

      {/* Progress Bar Container */}
      <div 
        style={{
          width: "100%",
          maxWidth: "320px",
          height: "6px",
          backgroundColor: "rgba(255,255,255,0.06)",
          borderRadius: "9999px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.04)"
        }}
      >
        <motion.div 
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(to right, var(--color-purple), var(--color-pink), var(--color-gold))"
          }}
        />
      </div>

      <div style={{ marginTop: "16px", fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600 }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
}
