import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Volume2, Sparkles } from "lucide-react";

export default function WishPage() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  
  const fullMessage = "I want to take a moment to say Thank You for everything. You are not just my Brother; you are my guide, my protector, and my constant Support. Every Raksha Bandhan reminds me of the beautiful bond we share, and today, on your Happy Birthday, I want to promise that I will always stand by you, just like you have stood by me.";

  // Typing effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullMessage.charAt(index));
      index++;
      if (index >= fullMessage.length) {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, []);

  // Format typed text with golden highlighted keywords
  const getFormattedMessage = () => {
    const keywords = ["Thank You", "Brother", "Raksha Bandhan", "Support", "Happy Birthday"];
    let parts = [typedText];

    keywords.forEach((keyword) => {
      const newParts = [];
      parts.forEach((part) => {
        if (typeof part === "string") {
          const splitPart = part.split(new RegExp(`(${keyword})`, "gi"));
          splitPart.forEach((subPart) => {
            if (subPart.toLowerCase() === keyword.toLowerCase()) {
              newParts.push(
                <span 
                  key={Math.random()} 
                  style={{ 
                    color: "#F4C542", 
                    fontWeight: 700, 
                    textShadow: "0 0 6px rgba(244,197,66,0.3)" 
                  }}
                >
                  {subPart}
                </span>
              );
            } else {
              newParts.push(subPart);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return parts;
  };

  // Local stars, sparkles, and minimal hearts config
  const stars = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 85}%`,
    left: `${Math.random() * 95}%`,
    size: Math.random() * 2 + 1.2,
    duration: Math.random() * 3 + 2.5
  }));

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #081126 0%, #03060c 100%)",
        color: "#FFF8EE",
        position: "relative",
        overflowX: "hidden",
        padding: "110px 24px 80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* 1. Header Navigation */}
      <div 
        style={{
          position: "absolute",
          top: "24px",
          left: "32px",
          right: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 50,
          width: "calc(100% - 64px)"
        }}
      >
        <span 
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "#F4C542",
            fontFamily: "'Georgia', serif"
          }}
        >
          To My Brother 💛
        </span>

        {/* Gold speaker icon */}
        <div style={{ color: "#F4C542", display: "flex", alignItems: "center" }}>
          <Volume2 size={20} />
        </div>
      </div>

      {/* 2. Twinkling Stars, Sparkles, and Bokeh Lights */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              backgroundColor: "#FFF",
              borderRadius: "50%",
              boxShadow: "0 0 6px #FFF"
            }}
          />
        ))}

        {/* Slow floating gold sparkles and light rays */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -60, 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0.15, 0.45, 0.15]
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: "absolute",
              top: `${20 + i * 12}%`,
              left: `${10 + i * 16}%`,
              width: "4px",
              height: "4px",
              backgroundColor: "#F4C542",
              borderRadius: "50%",
              boxShadow: "0 0 10px #F4C542"
            }}
          />
        ))}

        {/* Minimal floating hearts */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{ y: [30, -30], opacity: [0, 0.4, 0] }}
            transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: "15%",
              left: `${20 + i * 20}%`,
              fontSize: "0.8rem",
              color: "#F4C542"
            }}
          >
            ❤️
          </motion.span>
        ))}
      </div>

      {/* 3. Soft warm spotlight behind greeting card */}
      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "480px",
          height: "480px",
          background: "radial-gradient(circle, rgba(244,197,66,0.06) 0%, transparent 70%)",
          zIndex: 2,
          filter: "blur(30px)",
          pointerEvents: "none"
        }}
      />

      {/* 4. Centered Content Stack */}
      <div 
        style={{
          width: "100%",
          maxWidth: "560px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
          position: "relative"
        }}
      >
        {/* Main Title Header (glowing serif text) */}
        <div style={{ textAlign: "center", marginBottom: "32px", position: "relative", width: "100%" }}>
          {/* Subtle glowing halo behind header */}
          <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", width: "200px", height: "45px", background: "radial-gradient(circle, rgba(244,197,66,0.1) 0%, transparent 60%)", filter: "blur(10px)", zIndex: -1 }} />
          
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-cinematic text-gradient-gold text-glow"
            style={{ fontSize: "2.6rem", fontWeight: 700, marginBottom: "8px" }}
          >
            🎉 Happy Birthday Anna 💛
          </motion.h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", fontWeight: 500 }}>
            Today is all about celebrating the wonderful person you are.
          </p>
          <div style={{ width: "100px", height: "1px", backgroundColor: "#F4C542", margin: "18px auto 0", opacity: 0.4 }} />
        </div>

        {/* 5. Luxury Greeting Card */}
        <div 
          className="glassmorphism"
          style={{
            padding: "16px",
            borderRadius: "24px",
            border: "1.5px solid var(--glass-border)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            width: "100%",
            marginBottom: "32px"
          }}
        >
          {/* Stationery cream paper card */}
          <div 
            style={{
              backgroundColor: "#FFF8EE",
              borderRadius: "14px",
              padding: "42px 32px",
              color: "#0B1026",
              border: "1.5px solid #F4C542",
              position: "relative",
              width: "100%"
            }}
          >
            {/* Elegant SVG gold corners */}
            <svg width="24" height="24" style={{ position: "absolute", top: "12px", left: "12px", stroke: "#F4C542", fill: "none" }}>
              <path d="M 0 24 L 0 0 L 24 0 M 5 5 L 5 16 M 5 5 L 16 5" strokeWidth="1.2" />
            </svg>
            <svg width="24" height="24" style={{ position: "absolute", top: "12px", right: "12px", stroke: "#F4C542", fill: "none" }}>
              <path d="M 24 24 L 24 0 L 0 0 M 19 5 L 19 16 M 19 5 L 8 5" strokeWidth="1.2" />
            </svg>
            <svg width="24" height="24" style={{ position: "absolute", bottom: "12px", left: "12px", stroke: "#F4C542", fill: "none" }}>
              <path d="M 0 0 L 0 24 L 24 24 M 5 19 L 5 8 M 5 19 L 16 19" strokeWidth="1.2" />
            </svg>
            <svg width="24" height="24" style={{ position: "absolute", bottom: "12px", right: "12px", stroke: "#F4C542", fill: "none" }}>
              <path d="M 24 0 L 24 24 L 0 24 M 19 19 L 19 8 M 19 19 L 8 19" strokeWidth="1.2" />
            </svg>

            {/* Letter Title */}
            <h4 
              style={{ 
                fontFamily: "'Georgia', serif", 
                fontSize: "1.45rem", 
                fontWeight: "bold", 
                color: "#0B1026",
                marginBottom: "20px",
                fontStyle: "italic",
                borderBottom: "1.5px solid rgba(0,0,0,0.06)",
                paddingBottom: "10px"
              }}
            >
              Dear Brother,
            </h4>

            {/* Typing letter body with highlighted keywords */}
            <p style={{ fontSize: "0.98rem", lineHeight: 1.85, color: "#1e293b", fontWeight: 500, minHeight: "150px" }}>
              {getFormattedMessage()}
            </p>
          </div>
        </div>

        {/* 6. Quote Card with gold quotation mark & leaf corners */}
        <div 
          className="glassmorphism"
          style={{
            width: "100%",
            padding: "24px 32px",
            borderRadius: "20px",
            border: "1.5px solid var(--glass-border)",
            borderLeft: "4px solid #F4C542", // Gold accent line
            boxShadow: "var(--glass-shadow)",
            textAlign: "center",
            marginBottom: "36px",
            position: "relative"
          }}
        >
          <span style={{ fontSize: "2rem", color: "#F4C542", fontFamily: "Georgia, serif", position: "absolute", top: "4px", left: "16px", opacity: 0.35 }}>
            “
          </span>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.86rem", fontStyle: "italic", lineHeight: 1.55 }}>
            "Some people come into our lives and make every ordinary day extraordinary. <br />
            Thank you for being that person."
          </p>
        </div>

        {/* 7. Cake Decorator Redirect Button */}
        <motion.button
          onClick={() => navigate("/decorate")}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="premium-btn interactive-item animate-pulse-glow"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 36px"
          }}
        >
          <Sparkles size={16} />
          🎂 Decorate Your Birthday Cake
        </motion.button>
      </div>
    </div>
  );
}
