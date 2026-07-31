import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function Welcome({ onNext }) {
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
        color: "#fff",
        overflow: "hidden"
      }}
    >
      {/* Drifting Clouds Backdrop */}
      <div 
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "300px",
          height: "100px",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "cloud-drift 40s infinite linear",
          pointerEvents: "none"
        }}
      />
      <div 
        style={{
          position: "absolute",
          bottom: "20%",
          right: "-10%",
          width: "400px",
          height: "120px",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "cloud-drift 55s infinite linear reverse",
          pointerEvents: "none"
        }}
      />

      {/* Fireflies floating around */}
      <div style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="firefly"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 4}s`
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 2
        }}
      >
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 0.6, letterSpacing: "0.3em" }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            fontSize: "0.85rem",
            textTransform: "uppercase",
            color: "var(--color-pink)",
            marginBottom: "16px",
            fontWeight: 600
          }}
        >
          Chapter One
        </motion.span>

        <h1 
          className="font-cinematic text-gradient-gold text-glow"
          style={{
            fontSize: "calc(2.8rem + 3.5vw)",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "24px",
            letterSpacing: "-0.02em"
          }}
        >
          Happy Birthday
        </h1>

        <p 
          style={{
            fontSize: "calc(1.1rem + 0.3vw)",
            fontFamily: "var(--font-sans)",
            color: "var(--text-secondary)",
            fontWeight: 400,
            lineHeight: 1.6,
            marginBottom: "48px",
            maxWidth: "600px"
          }}
        >
          This journey was created especially for you.
        </p>

        <motion.button
          onClick={onNext}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8, type: "spring" }}
          className="premium-btn interactive-item animate-pulse-glow"
        >
          Let's Begin
          <ChevronRight size={20} style={{ marginLeft: "8px" }} />
        </motion.button>
      </motion.div>

      <style>{`
        @keyframes cloud-drift {
          0% { transform: translateX(-50vw); }
          100% { transform: translateX(150vw); }
        }
      `}</style>
    </div>
  );
}
