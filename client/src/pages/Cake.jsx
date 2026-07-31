import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Cake({ onBlownOut }) {
  const [candles, setCandles] = useState([
    { id: 1, isLit: true, left: "30%" },
    { id: 2, isLit: true, left: "50%" },
    { id: 3, isLit: true, left: "70%" }
  ]);
  const [allExtinguished, setAllExtinguished] = useState(false);

  const blowCandle = (id) => {
    setCandles(prev => prev.map(c => c.id === id ? { ...c, isLit: false } : c));
  };

  useEffect(() => {
    const activeCandles = candles.filter(c => c.isLit);
    if (activeCandles.length === 0 && !allExtinguished) {
      setAllExtinguished(true);
      
      const duration = 4 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      onBlownOut();
    }
  }, [candles, allExtinguished, onBlownOut]);

  return (
    <div 
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        position: "relative",
        zIndex: 10,
        color: "#fff"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "65px" }}>
        <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-pink)", fontWeight: 600 }}>
          Make a Wish
        </span>
        <h2 
          className="font-cinematic text-gradient-gold"
          style={{ fontSize: "calc(1.8rem + 1.5vw)", fontWeight: 700, marginTop: "8px" }}
        >
          Blow Out the Candles
        </h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "12px" }}>
          {allExtinguished 
            ? "Your wish is set! Let's celebrate! 🎉" 
            : "Click each candle flame to blow them out."}
        </p>
      </div>

      {/* Visual Cake Container */}
      <div 
        style={{
          width: "320px",
          height: "350px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end"
        }}
      >
        {/* Candles sitting on cake */}
        <div style={{ position: "absolute", bottom: "160px", width: "100%", height: "80px" }}>
          {candles.map((candle) => (
            <div
              key={candle.id}
              onClick={() => blowCandle(candle.id)}
              style={{
                position: "absolute",
                left: candle.left,
                bottom: 0,
                width: "12px",
                height: "60px",
                background: "linear-gradient(to right, #ec4899, #f43f5e)",
                borderRadius: "6px 6px 0 0",
                cursor: "pointer",
                transform: "translateX(-50%)",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
              }}
            >
              {/* Wick */}
              <div 
                style={{
                  position: "absolute",
                  top: "-8px",
                  left: "5px",
                  width: "2px",
                  height: "8px",
                  backgroundColor: "#475569"
                }}
              />
              
              {/* Flame */}
              <AnimatePresence>
                {candle.isLit && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [1, 1.15, 0.9, 1.1, 1],
                      y: [0, -2, 1, -1, 0]
                    }}
                    exit={{ 
                      scale: 0, 
                      opacity: 0,
                      transition: { duration: 0.2 }
                    }}
                    transition={{ 
                      scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                      y: { repeat: Infinity, duration: 1, ease: "easeInOut" }
                    }}
                    style={{
                      position: "absolute",
                      top: "-24px",
                      left: "-6px",
                      width: "24px",
                      height: "24px",
                      background: "radial-gradient(circle, #fff 10%, #fbbf24 40%, #ea580c 70%, transparent 90%)",
                      borderRadius: "50% 50% 20% 50% / 50% 50% 20% 20%",
                      transform: "rotate(-45deg)",
                      boxShadow: "0 0 20px #fbbf24, 0 0 40px #ea580c",
                      cursor: "pointer"
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Cake Body Layers */}
        {/* Layer 2 (Top) */}
        <div 
          style={{
            width: "180px",
            height: "60px",
            backgroundColor: "var(--bg-secondary)",
            border: "2px solid rgba(255,255,255,0.05)",
            borderBottom: "none",
            borderRadius: "40px / 15px",
            position: "relative",
            zIndex: 3,
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
          }}
        >
          {/* Frosting drips */}
          <div style={{ position: "absolute", top: "10px", left: 0, width: "100%", height: "15px", display: "flex", justifyContent: "space-around" }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <div 
                key={i} 
                style={{
                  width: "12px",
                  height: i % 2 === 0 ? "16px" : "10px",
                  backgroundColor: "var(--color-pink)",
                  borderRadius: "0 0 6px 6px",
                  boxShadow: "0 3px 3px rgba(0,0,0,0.2)"
                }}
              />
            ))}
          </div>
          <div style={{ position: "absolute", top: 0, width: "100%", height: "12px", backgroundColor: "var(--color-pink)", borderRadius: "40px / 10px" }} />
        </div>

        {/* Layer 1 (Bottom) */}
        <div 
          style={{
            width: "260px",
            height: "100px",
            backgroundColor: "var(--bg-secondary)",
            border: "2px solid rgba(255,255,255,0.05)",
            borderRadius: "40px / 15px",
            position: "relative",
            marginTop: "-15px",
            zIndex: 2,
            boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
            overflow: "hidden"
          }}
        >
          <div style={{ position: "absolute", top: 0, width: "100%", height: "18px", backgroundColor: "var(--color-purple)", borderRadius: "40px / 10px" }} />
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                style={{
                  width: "6px",
                  height: "14px",
                  borderRadius: "3px",
                  transform: `rotate(${i * 45}deg)`,
                  backgroundColor: ["#fbbf24", "#3b82f6", "#ec4899", "#10b981"][i % 4]
                }}
              />
            ))}
          </div>
        </div>

        {/* Plate */}
        <div 
          style={{
            width: "320px",
            height: "35px",
            background: "linear-gradient(to bottom, #f3f4f6, #d1d5db)",
            border: "1.5px solid #9ca3af",
            borderRadius: "50%",
            marginTop: "-15px",
            zIndex: 1,
            boxShadow: "0 15px 35px rgba(0,0,0,0.6)"
          }}
        />
      </div>
    </div>
  );
}
