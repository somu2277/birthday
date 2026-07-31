import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

export default function LetterPage() {
  const navigate = useNavigate();

  // Animation states: "closed" -> "open" -> "sliding" -> "expanded"
  const [envelopeState, setEnvelopeState] = useState("closed");

  useEffect(() => {
    // 1. Initial Closed state
    // 2. Open flap after 1.2 seconds
    const t1 = setTimeout(() => {
      setEnvelopeState("open");
    }, 1200);

    // 3. Slide letter out after 2.4 seconds
    const t2 = setTimeout(() => {
      setEnvelopeState("sliding");
    }, 2400);

    // 4. Morph/expand into a full paper card after 3.8 seconds
    const t3 = setTimeout(() => {
      setEnvelopeState("expanded");
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleReplay = () => {
    navigate("/");
  };

  return (
    <div 
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "90px 24px 60px",
        color: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center",
        position: "relative"
      }}
    >
      {/* 1. Slow golden sparkles in background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: ["0px", "-30px", "0px"],
              opacity: [0.2, 0.7, 0.2]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
            style={{
              position: "absolute",
              top: `${15 + (i * 12) % 75}%`,
              left: `${8 + (i * 17) % 85}%`,
              width: "3px",
              height: "3px",
              backgroundColor: "#F5C542",
              borderRadius: "50%",
              boxShadow: "0 0 6px #F5C542"
            }}
          />
        ))}
      </div>

      {/* 2. Soft glowing light behind the letter card */}
      <div 
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(245, 197, 66, 0.15) 0%, rgba(0,0,0,0) 70%)",
          zIndex: 2,
          pointerEvents: "none"
        }}
      />

      {/* 3. Envelope opening intro scene (fades out when expanded) */}
      <AnimatePresence>
        {envelopeState !== "expanded" && (
          <motion.div
            key="envelope-scene"
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.6 }}
            style={{
              width: "340px",
              height: "220px",
              position: "relative",
              perspective: "800px",
              zIndex: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "40px"
            }}
          >
            {/* Back Envelope Base */}
            <div 
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#0F172A",
                borderRadius: "8px",
                border: "2px solid var(--color-gold)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                zIndex: 1
              }}
            />

            {/* Sliding Letter Card Inside Pocket */}
            <motion.div
              animate={
                envelopeState === "sliding"
                  ? { y: -160, scale: 1.05 }
                  : { y: 0, scale: 0.95 }
              }
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                position: "absolute",
                width: "290px",
                height: "170px",
                backgroundColor: "#FFFDF6",
                borderRadius: "4px",
                border: "1.5px solid var(--color-gold)",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
              }}
            >
              <span 
                style={{ 
                  color: "#0f172a", 
                  fontFamily: "'Georgia', serif", 
                  fontSize: "1.2rem", 
                  fontWeight: "bold" 
                }}
              >
                Dear Brother ❤️
              </span>
            </motion.div>

            {/* Front Bottom & Side Triangular Pocket */}
            <div 
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "115px",
                background: "linear-gradient(to top, #1E293B, #0F172A)",
                clipPath: "polygon(0% 100%, 100% 100%, 50% 0%)",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
                border: "1.5px solid var(--color-gold)",
                zIndex: 3
              }}
            />

            {/* Front Flap */}
            <motion.div
              animate={envelopeState !== "closed" ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 4 }}
              transition={{ duration: 0.8 }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "110px",
                background: "#1E293B",
                clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                border: "1.5px solid var(--color-gold)",
                transformOrigin: "top"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Full Expanded Letter Card */}
      <AnimatePresence>
        {envelopeState === "expanded" && (
          <motion.div
            key="expanded-letter"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              width: "100%",
              maxWidth: "520px",
              backgroundColor: "#FFFDF6", // Warm cream paper color
              padding: "40px 32px 32px",
              borderRadius: "16px",
              border: "2px solid var(--color-gold)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              color: "#0f172a",
              textAlign: "center",
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            {/* Elegant SVG Gold Floral Borders (Top Left/Right) */}
            <svg width="24" height="24" style={{ position: "absolute", top: "12px", left: "12px", stroke: "var(--color-gold)", fill: "none" }}>
              <path d="M 0 24 L 0 0 L 24 0 M 6 6 L 6 18 M 6 6 L 18 6" strokeWidth="1.5" />
            </svg>
            <svg width="24" height="24" style={{ position: "absolute", top: "12px", right: "12px", stroke: "var(--color-gold)", fill: "none" }}>
              <path d="M 24 24 L 24 0 L 0 0 M 18 6 L 18 18 M 18 6 L 6 6" strokeWidth="1.5" />
            </svg>

            {/* Sibling Starry Night photo frame */}
             <div style={{ position: "relative", marginBottom: "24px" }}>
               {/* Small golden heart above the frame */}
               <span style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", fontSize: "1.1rem", color: "var(--color-gold)", zIndex: 15, textShadow: "0 0 4px var(--color-gold)" }}>
                 💛
               </span>
               <div 
                 style={{
                   width: "120px",
                   height: "120px",
                   borderRadius: "50%",
                   overflow: "hidden",
                   border: "2.5px solid var(--color-gold)",
                   boxShadow: "0 0 20px rgba(245, 197, 66, 0.4)",
                   backgroundImage: "url(/images/siblings_starry.jpg)",
                   backgroundSize: "cover",
                   backgroundPosition: "center",
                   zIndex: 12
                 }}
               />
             </div>

            {/* Cursive Handwriting Header */}
            <h3 
              style={{ 
                fontFamily: "'Georgia', serif", 
                fontSize: "1.6rem", 
                fontWeight: "bold",
                color: "#1E293B",
                marginBottom: "20px",
                fontStyle: "italic"
              }}
            >
              Dear Brother ❤️
            </h3>

            {/* Core message block */}
            <p 
              style={{
                fontSize: "0.98rem",
                lineHeight: 1.8,
                color: "#334155",
                fontWeight: 500,
                textAlign: "left",
                maxWidth: "440px",
                marginBottom: "24px"
              }}
            >
              I don't know how to thank you for everything you've done for me. 
              You always stood beside me. You supported me when I needed someone. 
              You made me smile during difficult days.
              <br /><br />
              You are not just my brother. You are my comfort, my strength, and one of the greatest blessings in my life.
              I pray that this birthday brings you endless happiness, success, good health and peace.
            </p>

            {/* Italic quote */}
            <p 
              style={{ 
                fontStyle: "italic", 
                fontSize: "0.88rem", 
                color: "#64748B", 
                lineHeight: 1.5,
                borderLeft: "2.5px solid var(--color-gold)",
                paddingLeft: "12px",
                textAlign: "left",
                maxWidth: "420px",
                marginBottom: "28px"
              }}
            >
              "Some bonds are not made by blood alone, but by love, trust, and countless beautiful memories."
            </p>

            {/* Glowing gold birthday greetings block */}
            <div 
              style={{
                background: "rgba(245, 197, 66, 0.08)",
                border: "1px dashed var(--color-gold)",
                borderRadius: "12px",
                padding: "16px",
                width: "100%",
                maxWidth: "440px",
                marginBottom: "32px"
              }}
            >
              <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#b45309", marginBottom: "4px" }}>
                🎉 Happy Birthday, Anna! 🎂
              </h4>
              <p style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600 }}>
                May your smile always shine as brightly as today.
              </p>
            </div>

            {/* Relive Journey button */}
            <motion.button
              onClick={handleReplay}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="premium-btn interactive-item animate-pulse-glow"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 32px"
              }}
            >
              <RotateCcw size={16} />
              Relive the Journey
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Floating gold hearts and stars at the bottom */}
      <div 
        style={{ 
          position: "absolute", 
          bottom: "20px", 
          left: 0, 
          width: "100%", 
          height: "80px", 
          pointerEvents: "none", 
          overflow: "hidden", 
          zIndex: 1 
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -32, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 3 + (i % 2) * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
            style={{
              position: "absolute",
              left: `${15 + i * 11}%`,
              fontSize: i % 2 === 0 ? "1.2rem" : "0.9rem",
              color: "var(--color-gold)",
              textShadow: "0 0 4px var(--color-gold)"
            }}
          >
            {i % 2 === 0 ? "❤️" : "✨"}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
