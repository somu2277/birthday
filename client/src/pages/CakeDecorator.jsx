import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Flame, Check, RotateCcw } from "lucide-react";

export default function CakeDecorator() {
  const navigate = useNavigate();

  // Active step: 1 (Flavor), 2 (Frosting), 3 (Decorations), 4 (Candles), 5 (Light), 6 (Wish), 7 (Celebrate)
  const [decorStep, setDecorStep] = useState(1);
  const [flavor, setFlavor] = useState("Chocolate");
  const [frosting, setFrosting] = useState("White Cream");
  const [selectedDecors, setSelectedDecors] = useState([]);
  const [candlesCount, setCandlesCount] = useState(0);
  const [candlesLit, setCandlesLit] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);

  // Flavor to base cake color mapping
  const flavorColors = {
    Chocolate: "#5C3D2E",
    Vanilla: "#FFF8EE",
    Strawberry: "#FFB6C1",
    "Red Velvet": "#991B1B"
  };

  // Frosting to drip color mapping
  const frostingColors = {
    "White Cream": "#FCF8F2",
    Chocolate: "#4A2E2B",
    "Pink Strawberry": "#FFA3B1",
    "Sky Blue": "#7DD3FC"
  };

  const handleToggleDecor = (decor) => {
    setSelectedDecors((prev) =>
      prev.includes(decor) ? prev.filter((d) => d !== decor) : [...prev, decor]
    );
  };

  const handleReset = () => {
    setDecorStep(1);
    setFlavor("Chocolate");
    setFrosting("White Cream");
    setSelectedDecors([]);
    setCandlesCount(0);
    setCandlesLit(false);
    setCandlesBlown(false);
  };

  const triggerBlowOutEffects = () => {
    setCandlesBlown(true);
    setDecorStep(7);
    
    // Confetti burst
    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#F4C542", "#FF8FB8", "#A76BFF", "#FFFFFF"]
    });
  };

  // Staggered candle offset coordinates
  const getCandleCoords = () => {
    if (candlesCount === 1) return [{ x: 160, y: 76 }];
    if (candlesCount === 3) return [
      { x: 140, y: 76 }, { x: 160, y: 76 }, { x: 180, y: 76 }
    ];
    if (candlesCount === 5) return [
      { x: 140, y: 76 }, { x: 160, y: 76 }, { x: 180, y: 76 },
      { x: 120, y: 146 }, { x: 200, y: 146 }
    ];
    if (candlesCount === 10) return [
      { x: 140, y: 76 }, { x: 160, y: 76 }, { x: 180, y: 76 },
      { x: 110, y: 146 }, { x: 135, y: 146 }, { x: 160, y: 146 }, { x: 185, y: 146 }, { x: 210, y: 146 },
      { x: 90, y: 216 }, { x: 230, y: 216 }
    ];
    return [];
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#080C24",
        color: "#FFF8F0",
        position: "relative",
        overflowX: "hidden",
        padding: "100px 24px 80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* 1. Starry sky with local twinkling sparkles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
            style={{
              position: "absolute",
              top: `${10 + i * 8}%`,
              left: `${5 + (i * 19) % 90}%`,
              width: "2px",
              height: "2px",
              backgroundColor: "#FFF"
            }}
          />
        ))}
      </div>

      {/* 2. Main Title */}
      <div style={{ textAlign: "center", marginBottom: "32px", zIndex: 10 }}>
        <h2
          className="font-cinematic text-gradient-gold text-glow"
          style={{ fontSize: "2.1rem", fontWeight: 700 }}
        >
          🎂 Create the Perfect Birthday Cake
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginTop: "4px", fontWeight: 500 }}>
          Make a beautiful custom masterpiece step-by-step
        </p>
      </div>

      {/* 3. Symmetrical Layout Grid (Cake Visual on Left, Controls on Right) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "40px",
          alignItems: "center",
          width: "100%",
          maxWidth: "1000px",
          zIndex: 10,
          marginBottom: "40px"
        }}
      >
        {/* LEFT COLUMN: Cake Stand & Visual Renderer */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "320px", position: "relative" }}>
          
          {/* Spotlight behind cake stand */}
          <div style={{ position: "absolute", bottom: "30px", width: "240px", height: "240px", background: "radial-gradient(circle, rgba(244,197,66,0.12) 0%, transparent 70%)", filter: "blur(20px)", zIndex: 1, pointerEvents: "none" }} />

          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "320px", height: "340px", zIndex: 5 }}
          >
            <svg viewBox="0 0 320 340" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              {/* Stand / Pedestal */}
              <ellipse cx="160" cy="300" rx="100" ry="12" fill="#E5E7EB" stroke="#9ca3af" strokeWidth="1.5" />
              <path d="M 120 300 Q 160 305 200 300 L 180 330 L 140 330 Z" fill="#D1D5DB" />
              <ellipse cx="160" cy="330" rx="40" ry="6" fill="#9CA3AF" />

              {/* Bottom Tier (Tier 1) */}
              <g>
                <rect x="70" y="210" width="180" height="80" fill={flavorColors[flavor]} rx="6" stroke="#F4C542" strokeWidth="1" />
                {/* Frosting Drips */}
                {decorStep >= 2 && (
                  <path d="M 70 210 Q 80 225 90 210 Q 105 230 115 210 Q 130 228 140 210 Q 160 226 170 210 Q 185 232 195 210 Q 210 226 220 210 Q 235 228 245 210 L 250 210" fill="none" stroke={frostingColors[frosting]} strokeWidth="6" strokeLinecap="round" />
                )}
              </g>

              {/* Middle Tier (Tier 2) */}
              <g>
                <rect x="95" y="140" width="130" height="70" fill={flavorColors[flavor]} rx="6" stroke="#F4C542" strokeWidth="1" />
                {/* Frosting Drips */}
                {decorStep >= 2 && (
                  <path d="M 95 140 Q 110 156 120 140 Q 135 158 145 140 Q 160 156 170 140 Q 185 158 195 140 Q 210 156 220 140 L 225 140" fill="none" stroke={frostingColors[frosting]} strokeWidth="6" strokeLinecap="round" />
                )}
              </g>

              {/* Top Tier (Tier 3) */}
              <g>
                <rect x="120" y="76" width="80" height="64" fill={flavorColors[flavor]} rx="6" stroke="#F4C542" strokeWidth="1" />
                {/* Frosting Drips */}
                {decorStep >= 2 && (
                  <path d="M 120 76 Q 135 92 145 76 Q 160 92 170 76 Q 185 92 195 76 L 200 76" fill="none" stroke={frostingColors[frosting]} strokeWidth="6" strokeLinecap="round" />
                )}
              </g>

              {/* Step 3: Popping Decorations */}
              {decorStep >= 3 && (
                <g>
                  {/* Strawberries */}
                  {selectedDecors.includes("Strawberries") && (
                    <g fill="#EF4444">
                      <circle cx="160" cy="66" r="6" />
                      <circle cx="130" cy="130" r="5" />
                      <circle cx="190" cy="130" r="5" />
                    </g>
                  )}
                  {/* Cherries */}
                  {selectedDecors.includes("Cherries") && (
                    <g fill="#991B1B">
                      <circle cx="150" cy="68" r="4.5" />
                      <circle cx="170" cy="68" r="4.5" />
                    </g>
                  )}
                  {/* Chocolate Bars */}
                  {selectedDecors.includes("Chocolate Bars") && (
                    <g fill="#451A03">
                      <rect x="155" y="115" width="10" height="20" rx="1" transform="rotate(15 155 115)" />
                    </g>
                  )}
                  {/* Donuts */}
                  {selectedDecors.includes("Donuts") && (
                    <g fill="#F472B6" stroke="#FFF" strokeWidth="1">
                      <circle cx="105" cy="190" r="7" />
                      <circle cx="215" cy="190" r="7" />
                    </g>
                  )}
                  {/* Cookies */}
                  {selectedDecors.includes("Cookies") && (
                    <g fill="#D97706">
                      <circle cx="115" cy="270" r="8" />
                      <circle cx="205" cy="270" r="8" />
                    </g>
                  )}
                  {/* Flowers */}
                  {selectedDecors.includes("Flowers") && (
                    <g fill="#FFB6C1">
                      <circle cx="85" cy="270" r="6" />
                      <circle cx="235" cy="270" r="6" />
                    </g>
                  )}
                  {/* Hearts */}
                  {selectedDecors.includes("Hearts") && (
                    <g fill="#F43F5E">
                      <circle cx="150" cy="180" r="4" />
                      <circle cx="170" cy="180" r="4" />
                    </g>
                  )}
                  {/* Golden Stars */}
                  {selectedDecors.includes("Golden Stars") && (
                    <g fill="#F4C542">
                      <polygon points="160,110 162,115 167,115 163,118 165,123 160,120 155,123 157,118 153,115 158,115" />
                    </g>
                  )}
                  {/* Ribbon */}
                  {selectedDecors.includes("Ribbon") && (
                    <path d="M 70 280 Q 160 286, 250 280" fill="none" stroke="#F4C542" strokeWidth="4" />
                  )}
                  {/* Sprinkles */}
                  {selectedDecors.includes("Sprinkles") && (
                    <g fill="#3B82F6">
                      <circle cx="110" cy="155" r="1.5" />
                      <circle cx="150" cy="160" r="1.5" fill="#EF4444" />
                      <circle cx="180" cy="155" r="1.5" fill="#F4C542" />
                      <circle cx="95" cy="235" r="1.5" />
                      <circle cx="160" cy="230" r="1.5" fill="#EF4444" />
                      <circle cx="210" cy="235" r="1.5" fill="#F4C542" />
                    </g>
                  )}
                </g>
              )}

              {/* Step 4 & 5: Candles Rendering */}
              {decorStep >= 4 && (
                <g>
                  {getCandleCoords().map((c, i) => (
                    <g key={i}>
                      {/* Candle Body */}
                      <rect x={c.x - 3} y={c.y - 24} width="6" height="24" fill={i % 2 === 0 ? "#FF8FB8" : "#F4C542"} rx="1" />
                      
                      {/* Flickering Flame (if lit and not blown) */}
                      {candlesLit && !candlesBlown && (
                        <motion.circle
                          animate={{ scale: [1, 1.2, 1], y: [0, -1.5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.4 }}
                          cx={c.x}
                          cy={c.y - 30}
                          r="5.5"
                          fill="#EF4444"
                          style={{ filter: "drop-shadow(0 0 5px #F4C542)" }}
                        />
                      )}

                      {/* Smoke trail (if blown) */}
                      {candlesBlown && (
                        <motion.path
                          initial={{ opacity: 0.8, y: 0 }}
                          animate={{ opacity: 0, y: -20 }}
                          transition={{ duration: 1.5 }}
                          d={`M ${c.x} ${c.y - 26} Q ${c.x - 4} ${c.y - 36}, ${c.x} ${c.y - 46}`}
                          stroke="#E2E8F0"
                          strokeWidth="2"
                          fill="none"
                        />
                      )}
                    </g>
                  ))}
                </g>
              )}
            </svg>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Glass Controls dashboard */}
        <div 
          className="glassmorphism"
          style={{
            width: "100%",
            maxWidth: "460px",
            padding: "32px 28px",
            borderRadius: "24px",
            border: "1.5px solid var(--glass-border)",
            boxShadow: "var(--glass-shadow)"
          }}
        >
          {/* Active step indicators */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
              <div 
                key={s} 
                style={{ 
                  flex: 1, 
                  height: "4px", 
                  backgroundColor: decorStep >= s ? "#F4C542" : "rgba(255,255,255,0.06)",
                  borderRadius: "2px",
                  transition: "all 0.3s ease"
                }} 
              />
            ))}
          </div>

          {/* Stepper Content */}
          <div style={{ minHeight: "220px" }}>
            {decorStep === 1 && (
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F4C542", marginBottom: "8px" }}>
                  Step 1: Choose Cake Flavor
                </h4>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "18px" }}>
                  Select the base cake sponge flavor of your choice.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {Object.keys(flavorColors).map((fl) => (
                    <button
                      key={fl}
                      onClick={() => setFlavor(fl)}
                      className="glassmorphism interactive-item"
                      style={{
                        padding: "12px 18px",
                        borderRadius: "12px",
                        border: flavor === fl ? "1.5px solid #F4C542" : "1.5px solid var(--glass-border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#FFF8F0",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      <span>{fl}</span>
                      {flavor === fl && <Check size={16} color="#F4C542" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {decorStep === 2 && (
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F4C542", marginBottom: "8px" }}>
                  Step 2: Choose Frosting Flavor
                </h4>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "18px" }}>
                  Select a delicious frosting color to apply to your cake.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {Object.keys(frostingColors).map((fr) => (
                    <button
                      key={fr}
                      onClick={() => setFrosting(fr)}
                      className="glassmorphism interactive-item"
                      style={{
                        padding: "12px 18px",
                        borderRadius: "12px",
                        border: frosting === fr ? "1.5px solid #F4C542" : "1.5px solid var(--glass-border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#FFF8F0",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      <span>{fr}</span>
                      {frosting === fr && <Check size={16} color="#F4C542" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {decorStep === 3 && (
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F4C542", marginBottom: "8px" }}>
                  Step 3: Decorate the Cake
                </h4>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
                  Add multiple toppings with animated pops.
                </p>
                <div 
                  style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(2, 1fr)", 
                    gap: "10px",
                    maxHeight: "180px",
                    overflowY: "auto",
                    paddingRight: "6px"
                  }}
                >
                  {["Strawberries", "Cherries", "Chocolate Bars", "Donuts", "Cookies", "Flowers", "Hearts", "Golden Stars", "Ribbon", "Sprinkles"].map((decor) => (
                    <button
                      key={decor}
                      onClick={() => handleToggleDecor(decor)}
                      className="glassmorphism interactive-item"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: selectedDecors.includes(decor) ? "1.5px solid #F4C542" : "1.5px solid var(--glass-border)",
                        color: "#FFF8F0",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      {decor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {decorStep === 4 && (
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F4C542", marginBottom: "8px" }}>
                  Step 4: Add Candles
                </h4>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "18px" }}>
                  Choose how many candles to place on the cake tiers.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[1, 3, 5, 10].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCandlesCount(c)}
                      className="glassmorphism interactive-item"
                      style={{
                        padding: "12px 18px",
                        borderRadius: "12px",
                        border: candlesCount === c ? "1.5px solid #F4C542" : "1.5px solid var(--glass-border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#FFF8F0",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      <span>{c} {c === 1 ? "Candle" : "Candles"}</span>
                      {candlesCount === c && <Check size={16} color="#F4C542" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {decorStep === 5 && (
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F4C542", marginBottom: "8px" }}>
                  Step 5: Light the Candles
                </h4>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
                  Click the button below to light the birthday candles.
                </p>
                <button
                  onClick={() => {
                    setCandlesLit(true);
                    setDecorStep(6);
                  }}
                  className="premium-btn interactive-item animate-pulse-glow"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px"
                  }}
                >
                  <Flame size={16} />
                  Light Candles
                </button>
              </div>
            )}

            {decorStep === 6 && (
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F4C542", marginBottom: "8px" }}>
                  Step 6: Make a Birthday Wish
                </h4>
                <p style={{ fontSize: "0.88rem", fontStyle: "italic", color: "#FFB6C1", marginBottom: "24px" }}>
                  "✨ Close your eyes and make a wish..."
                </p>
                <button
                  onClick={triggerBlowOutEffects}
                  className="premium-btn interactive-item animate-pulse-glow"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px",
                    background: "linear-gradient(135deg, #10B981, #059669)"
                  }}
                >
                  💨 Blow the Candles
                </button>
              </div>
            )}

            {decorStep === 7 && (
              <div style={{ textAlign: "center" }}>
                <h4 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#F4C542", marginBottom: "4px" }}>
                  🎉 Your Cake Is Ready! 🎂
                </h4>
                <p style={{ fontSize: "1.15rem", fontWeight: 700, color: "#FFB6C1", marginBottom: "20px" }}>
                  Happy Birthday Anna ❤️
                </p>

                {/* Navigation actions */}
                <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                  <button
                    onClick={handleReset}
                    className="glassmorphism interactive-item"
                    style={{
                      padding: "10px 18px",
                      borderRadius: "9999px",
                      border: "1.5px solid var(--glass-border)",
                      color: "#FFF8F0",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <RotateCcw size={14} />
                    Decorate Again
                  </button>

                  <button
                    onClick={() => navigate("/puzzle")}
                    className="premium-btn interactive-item animate-pulse-glow"
                    style={{
                      padding: "10px 18px",
                      fontSize: "0.8rem",
                      fontWeight: 700
                    }}
                  >
                    🎁 Birthday Challenge
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Previous / Next Stepper buttons (hidden at final step) */}
          {decorStep < 5 && (
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button
                disabled={decorStep === 1}
                onClick={() => setDecorStep((prev) => prev - 1)}
                className="glassmorphism"
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1px solid var(--glass-border)",
                  color: decorStep === 1 ? "rgba(255,255,255,0.2)" : "#FFF8F0",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  cursor: decorStep === 1 ? "not-allowed" : "pointer"
                }}
              >
                Back
              </button>

              <button
                onClick={() => setDecorStep((prev) => prev + 1)}
                className="premium-btn interactive-item"
                style={{
                  padding: "6px 14px",
                  fontSize: "0.78rem"
                }}
              >
                Next Step
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
