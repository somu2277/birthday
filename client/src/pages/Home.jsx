import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAdventure } from "../context/AdventureContext";

export default function Home() {
  const navigate = useNavigate();
  const { setPlayMusic, isMuted, setIsMuted } = useAdventure();

  // 10-second countdown for immediate testing and verification
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [isFinished, setIsFinished] = useState(false);

  // Dynamic speech bubble phrase rotations
  const mainPhrases = ["Hehe... Ready? 🐷💕", "I'm guarding your surprise! 😂", "Almost time!!", "So excited!!"];
  const coolPhrases = ["I've been waiting all day! 😎", "Hurry! 😂", "Let's Go!!", "I can't wait!!"];

  const [mainIdx, setMainIdx] = useState(0);
  const [coolIdx, setCoolIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          setPlayMusic(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const speechTimer = setInterval(() => {
      setMainIdx((prev) => (prev + 1) % mainPhrases.length);
      setCoolIdx((prev) => (prev + 1) % coolPhrases.length);
    }, 3500);

    return () => {
      clearInterval(timer);
      clearInterval(speechTimer);
    };
  }, [setPlayMusic]);

  // Local stars, sparkles, and background balloons config
  const stars = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 85}%`,
    left: `${Math.random() * 95}%`,
    size: Math.random() * 2 + 1.5,
    duration: Math.random() * 3 + 2.5
  }));

  const backgroundBalloons = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    left: `${15 + i * 22}%`,
    color: ["#FF8FB8", "#F4C542", "#3B82F6", "#a78bfa"][i],
    delay: i * 1.5
  }));

  const formatUnit = (num) => String(num).padStart(2, "0");

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
      {/* 3D Glossy Balloon Gradient Definitions */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="balloon-gold" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFDF0" />
            <stop offset="40%" stopColor="#F4C542" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>
          <radialGradient id="balloon-pink" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="40%" stopColor="#FF8FB8" />
            <stop offset="100%" stopColor="#be185d" />
          </radialGradient>
          <radialGradient id="balloon-purple" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#F8F0FF" />
            <stop offset="40%" stopColor="#A76BFF" />
            <stop offset="100%" stopColor="#6d28d9" />
          </radialGradient>
          <radialGradient id="balloon-rosegold" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF2F2" />
            <stop offset="40%" stopColor="#e0a9a9" />
            <stop offset="100%" stopColor="#9c6666" />
          </radialGradient>
          <radialGradient id="balloon-transparent" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(244,197,66,0.2)" />
          </radialGradient>
        </defs>
      </svg>

      {/* 1. Twinkling Night Sky & Lantern Glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            animate={{ opacity: [0.3, 1, 0.3] }}
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

        {/* Shooting Star */}
        <motion.div
          animate={{ x: ["-100px", "600px"], y: ["0px", "300px"], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 6, ease: "linear" }}
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "80px",
            height: "1px",
            background: "linear-gradient(to right, rgba(255,255,255,0), #FFF)",
            transform: "rotate(-25deg)"
          }}
        />

        {/* Corner Lantern Glows */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "220px", height: "220px", background: "radial-gradient(circle, rgba(244,197,66,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "220px", height: "220px", background: "radial-gradient(circle, rgba(244,197,66,0.08) 0%, transparent 70%)" }} />
      </div>

      {/* 2. Background Floating Balloons */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 1 }}>
        {backgroundBalloons.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: "105vh" }}
            animate={{ y: "-10vh" }}
            transition={{ duration: 15, repeat: Infinity, delay: b.delay, ease: "linear" }}
            style={{
              position: "absolute",
              left: b.left,
              width: "24px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: b.color,
              opacity: 0.35,
              boxShadow: "inset -2px -2px 6px rgba(0,0,0,0.3)"
            }}
          />
        ))}
      </div>

      {/* 2b. Rising Heart Balloon Release */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 12 }}>
        <motion.span
          initial={{ y: "105vh", x: "45vw", opacity: 0.8 }}
          animate={{ y: "-10vh", x: ["45vw", "48vw", "43vw", "45vw"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", fontSize: "1.8rem", color: "#FF8FB8", textShadow: "0 0 10px #FF8FB8" }}
        >
          🎈
        </motion.span>
      </div>

      {/* 3. PREMIUM 3D GLOSSY BALLOON CLUSTERS */}
      {/* Left Balloon Cluster */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "20px",
          top: "15%",
          width: "200px",
          height: "350px",
          pointerEvents: "none",
          zIndex: 9
        }}
      >
        <svg viewBox="0 0 200 350" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {/* Sparkles */}
          <circle cx="40" cy="50" r="2" fill="#F4C542" style={{ filter: "drop-shadow(0 0 3px #F4C542)" }} />
          <circle cx="160" cy="110" r="2" fill="#FFF" style={{ filter: "drop-shadow(0 0 3px #FFF)" }} />

          {/* Ribbon Strings */}
          <path d="M 60 90 Q 75 180, 100 280" stroke="#F4C542" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M 100 80 Q 95 180, 100 280" stroke="#F4C542" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M 140 100 Q 115 190, 100 280" stroke="#F4C542" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M 80 130 Q 90 200, 100 280" stroke="#F4C542" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M 120 140 Q 110 210, 100 280" stroke="#F4C542" strokeWidth="1.2" fill="none" opacity="0.6" />

          {/* Balloon Spheres */}
          <g style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))" }}>
            {/* Balloon 1: Purple */}
            <ellipse cx="60" cy="90" rx="26" ry="34" fill="url(#balloon-purple)" />
            {/* Balloon 2: Gold */}
            <ellipse cx="100" cy="80" rx="28" ry="36" fill="url(#balloon-gold)" />
            {/* Balloon 3: Pink */}
            <ellipse cx="140" cy="100" rx="26" ry="34" fill="url(#balloon-pink)" />
            {/* Balloon 4: Rose Gold */}
            <ellipse cx="80" cy="140" rx="24" ry="32" fill="url(#balloon-rosegold)" />
            {/* Balloon 5: Transparent Confetti */}
            <g>
              <ellipse cx="120" cy="140" rx="25" ry="33" fill="url(#balloon-transparent)" />
              {/* Internal gold confetti dots */}
              <circle cx="115" cy="130" r="2.5" fill="#F4C542" />
              <circle cx="125" cy="145" r="2" fill="#F4C542" />
              <circle cx="110" cy="140" r="1.5" fill="#F4C542" />
              <circle cx="128" cy="135" r="2" fill="#F4C542" />
            </g>
          </g>

          {/* Floating Gift Box between Left Balloons */}
          <g transform="translate(85, 230)" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>
            <rect x="0" y="0" width="24" height="22" rx="2" fill="#FF8FB8" />
            <line x1="12" y1="0" x2="12" y2="22" stroke="#F4C542" strokeWidth="2.5" />
            <line x1="0" y1="11" x2="24" y2="11" stroke="#F4C542" strokeWidth="2.5" />
          </g>
        </svg>
      </motion.div>

      {/* Right Balloon Cluster */}
      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          right: "20px",
          top: "15%",
          width: "200px",
          height: "350px",
          pointerEvents: "none",
          zIndex: 9
        }}
      >
        <svg viewBox="0 0 200 350" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {/* Sparkles */}
          <circle cx="50" cy="110" r="2" fill="#FFF" style={{ filter: "drop-shadow(0 0 3px #FFF)" }} />
          <circle cx="150" cy="60" r="2" fill="#FF8FB8" style={{ filter: "drop-shadow(0 0 3px #FF8FB8)" }} />

          {/* Ribbon Strings */}
          <path d="M 60 100 Q 80 190, 100 280" stroke="#F4C542" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M 100 90 Q 95 180, 100 280" stroke="#F4C542" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M 140 80 Q 120 180, 100 280" stroke="#F4C542" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M 80 140 Q 90 210, 100 280" stroke="#F4C542" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M 120 130 Q 110 200, 100 280" stroke="#F4C542" strokeWidth="1.2" fill="none" opacity="0.6" />

          {/* Balloon Spheres */}
          <g style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))" }}>
            {/* Balloon 1: Pink */}
            <ellipse cx="60" cy="100" rx="26" ry="34" fill="url(#balloon-pink)" />
            {/* Balloon 2: Purple */}
            <ellipse cx="100" cy="90" rx="27" ry="35" fill="url(#balloon-purple)" />
            {/* Balloon 3: Gold */}
            <ellipse cx="140" cy="80" rx="28" ry="36" fill="url(#balloon-gold)" />
            {/* Balloon 4: Transparent Confetti */}
            <g>
              <ellipse cx="80" cy="140" rx="25" ry="33" fill="url(#balloon-transparent)" />
              <circle cx="75" cy="130" r="2" fill="#F4C542" />
              <circle cx="85" cy="142" r="2" fill="#F4C542" />
              <circle cx="78" cy="148" r="1.5" fill="#F4C542" />
            </g>
            {/* Balloon 5: Rose Gold */}
            <ellipse cx="120" cy="130" rx="24" ry="32" fill="url(#balloon-rosegold)" />
          </g>

          {/* Floating Gift Box between Right Balloons */}
          <g transform="translate(90, 220)" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>
            <rect x="0" y="0" width="22" height="20" rx="2" fill="#F4C542" />
            <line x1="11" y1="0" x2="11" y2="20" stroke="#FF8FB8" strokeWidth="2.5" />
            <line x1="0" y1="10" x2="22" y2="10" stroke="#FF8FB8" strokeWidth="2.5" />
          </g>
        </svg>
      </motion.div>

      {/* 4. Header Logotype & Music Toggle */}
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
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#F4C542",
            fontFamily: "'Georgia', serif"
          }}
        >
          To My Brother 💛
        </span>

        <button
          onClick={() => {
            setIsMuted(!isMuted);
            setPlayMusic(true);
          }}
          className="glassmorphism interactive-item"
          style={{
            padding: "8px 16px",
            borderRadius: "9999px",
            border: "1.5px solid var(--glass-border)",
            color: "#FFF8F0",
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: "pointer",
            outline: "none"
          }}
        >
          {isMuted ? "🔇 Music Muted" : "🎵 Music ON"}
        </button>
      </div>

      {/* 5. Three-Column Character & Content layout */}
      <div 
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "40px",
          alignItems: "center",
          width: "100%",
          maxWidth: "1150px",
          zIndex: 10,
          marginBottom: "40px"
        }}
      >
        {/* A. LEFT COLUMN CHARACTER: Crown Pig & wooden direction signs */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "220px" }}>
          {/* Wood Sign boards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center" }}>
            <div className="glassmorphism" style={{ padding: "8px 18px", borderRadius: "8px", border: "1.5px solid #F4C542", fontSize: "0.85rem", fontWeight: 700, color: "#F4C542", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}>
              😊 Smile Loading...
            </div>
            <div className="glassmorphism" style={{ padding: "8px 18px", borderRadius: "8px", border: "1.5px solid #FF8FB8", fontSize: "0.85rem", fontWeight: 700, color: "#FF8FB8", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}>
              💖 Happiness Ahead...
            </div>
            <div className="glassmorphism" style={{ padding: "8px 18px", borderRadius: "8px", border: "1.5px solid var(--color-gold)", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-gold)", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}>
              🎉 Best Brother Ever!
            </div>
          </div>

          {/* Left Crown Pig Vector */}
          <motion.div
            animate={{ y: [-4, 4, -4], rotate: [-2, 2, -2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "110px", height: "110px", marginTop: "12px" }}
          >
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
              <ellipse cx="50" cy="82" rx="35" ry="10" fill="#FFFFFF" opacity="0.9" />
              <circle cx="50" cy="52" r="23" fill="#FFB6C1" />
              <circle cx="50" cy="32" r="17" fill="#FFB6C1" />
              
              {/* Gold Crown */}
              <polygon points="40,16 43,10 50,14 57,10 60,16" fill="#F4C542" stroke="#FFF8F0" strokeWidth="1" />
              
              {/* Ears */}
              <path d="M 39 21 Q 32 10 41 16" fill="#FFB6C1" />
              <path d="M 61 21 Q 68 10 59 16" fill="#FFB6C1" />
              
              {/* Snout */}
              <ellipse cx="50" cy="40" rx="6.5" ry="4" fill="#F43F5E" opacity="0.5" />
              
              {/* Blinking eyes */}
              <circle cx="44" cy="29" r="2.2" fill="#0F172A" />
              <circle cx="56" cy="29" r="2.2" fill="#0F172A" />
            </svg>
          </motion.div>
        </div>

        {/* B. CENTER COLUMN: Main Glass Card & Blink Pig */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glassmorphism"
          style={{
            width: "100%",
            maxWidth: "460px",
            padding: "36px 28px",
            borderRadius: "28px",
            border: "1.5px solid var(--color-gold)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(167,107,255,0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative"
          }}
        >
          {/* Main Character Pig Sitting on Fluffy Clouds */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "150px", height: "150px", marginBottom: "16px", position: "relative" }}
          >
            <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              {/* Fluffy clouds base */}
              <g fill="#FFFFFF" opacity="0.9">
                <ellipse cx="100" cy="165" rx="55" ry="16" />
                <ellipse cx="65" cy="160" rx="35" ry="14" fill="#FFF8F0" />
                <ellipse cx="135" cy="160" rx="35" ry="14" fill="#FFF8F0" />
              </g>

              {/* Pig Chubby Body */}
              <ellipse cx="100" cy="120" rx="46" ry="42" fill="#FFB6C1" />

              {/* Pig Head */}
              <circle cx="100" cy="85" r="38" fill="#FFB6C1" />

              {/* Rosy Cheeks */}
              <circle cx="72" cy="88" r="6" fill="#F43F5E" opacity="0.35" />
              <circle cx="128" cy="88" r="6" fill="#F43F5E" opacity="0.35" />

              {/* Twitching Ear left */}
              <motion.path 
                animate={{ rotate: [-2, 4, -2] }} 
                transition={{ duration: 2, repeat: Infinity }} 
                d="M 68 62 Q 54 36 76 48 Z" 
                fill="#FFB6C1" 
              />
              {/* Right Ear */}
              <path d="M 132 62 Q 146 36 124 48 Z" fill="#FFB6C1" />

              {/* Snout */}
              <ellipse cx="100" cy="95" rx="14" ry="9" fill="#F43F5E" opacity="0.5" />
              <circle cx="95" cy="95" r="2" fill="#9F1239" />
              <circle cx="105" cy="95" r="2" fill="#9F1239" />

              {/* Waving Arm Left */}
              <motion.ellipse 
                animate={{ rotate: [0, 25, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "70px 115px" }}
                cx="64" cy="116" rx="8" ry="10" 
                fill="#FFB6C1" 
              />
              <ellipse cx="136" cy="116" rx="8" ry="10" fill="#FFB6C1" />

              {/* Blinking eyes */}
              <motion.circle 
                animate={{ scaleY: [1, 0.1, 1, 1, 1, 0.1, 1] }} 
                transition={{ duration: 4, repeat: Infinity }} 
                cx="82" cy="74" r="5.5" 
                fill="#0F172A" 
                style={{ transformOrigin: "82px 74px" }}
              />
              <motion.circle 
                animate={{ scaleY: [1, 0.1, 1, 1, 1, 0.1, 1] }} 
                transition={{ duration: 4, repeat: Infinity }}
                cx="118" cy="74" r="5.5" 
                fill="#0F172A" 
                style={{ transformOrigin: "118px 74px" }}
              />

              {/* Legs */}
              <ellipse cx="78" cy="152" rx="10" ry="7" fill="#FFB6C1" />
              <ellipse cx="122" cy="152" rx="10" ry="7" fill="#FFB6C1" />

              {/* Smile */}
              <path d="M 97 106 Q 100 109 103 106" stroke="#9F1239" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>

            {/* Bubble speech */}
            <div 
              className="glassmorphism"
              style={{
                position: "absolute",
                top: "-36px",
                left: "75px",
                padding: "6px 12px",
                borderRadius: "12px",
                fontSize: "0.72rem",
                border: "1px solid rgba(255,255,255,0.08)",
                whiteSpace: "nowrap",
                fontWeight: 600
              }}
            >
              {mainPhrases[mainIdx]}
            </div>
          </motion.div>

          {/* Heading */}
          <h3 
            className="font-cinematic text-gradient-gold text-glow"
            style={{ fontSize: "1.45rem", fontWeight: 700, marginBottom: "8px", color: "var(--color-gold)" }}
          >
            ✨ A Little Surprise Is Waiting... ✨
          </h3>

          {/* Subtitle */}
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "24px", fontWeight: 500 }}>
            Every second brings you closer to something made with love. 💖
          </p>

          {/* Countdown Cards */}
          <div 
            style={{ 
              display: "flex", 
              gap: "10px", 
              marginBottom: "32px" 
            }}
          >
            {/* Days card */}
            <div className="glassmorphism" style={{ padding: "8px 12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", minWidth: "55px", textAlign: "center" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 700 }}>00</span>
              <div style={{ fontSize: "0.55rem", color: "var(--text-secondary)", marginTop: "2px", fontWeight: 700 }}>DAYS</div>
            </div>
            {/* Hours card */}
            <div className="glassmorphism" style={{ padding: "8px 12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", minWidth: "55px", textAlign: "center" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 700 }}>00</span>
              <div style={{ fontSize: "0.55rem", color: "var(--text-secondary)", marginTop: "2px", fontWeight: 700 }}>HOURS</div>
            </div>
            {/* Minutes card */}
            <div className="glassmorphism" style={{ padding: "8px 12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", minWidth: "55px", textAlign: "center" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 700 }}>00</span>
              <div style={{ fontSize: "0.55rem", color: "var(--text-secondary)", marginTop: "2px", fontWeight: 700 }}>MINUTES</div>
            </div>
            {/* Seconds card */}
            <motion.div 
              animate={secondsLeft < 10 && !isFinished ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="glassmorphism" 
              style={{ 
                padding: "8px 12px", 
                borderRadius: "12px", 
                border: "1.5px solid var(--color-gold)", 
                minWidth: "60px", 
                textAlign: "center",
                boxShadow: "0 0 8px rgba(244,197,66,0.15)"
              }}
            >
              <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-gold)" }}>
                {formatUnit(secondsLeft)}
              </span>
              <div style={{ fontSize: "0.55rem", color: "var(--color-gold)", marginTop: "2px", fontWeight: 700 }}>SECONDS</div>
            </motion.div>
          </div>

          {/* Target Surprise unlocking Button */}
          <motion.button
            onClick={() => isFinished && navigate("/wish")}
            disabled={!isFinished}
            whileHover={isFinished ? { scale: 1.05, y: -2 } : {}}
            whileTap={isFinished ? { scale: 0.95 } : {}}
            className={isFinished ? "premium-btn interactive-item animate-pulse-glow" : ""}
            style={{
              padding: "14px 32px",
              borderRadius: "9999px",
              border: isFinished ? "none" : "1.5px solid var(--glass-border)",
              backgroundColor: isFinished ? "#F4C542" : "rgba(255,255,255,0.03)",
              color: isFinished ? "#080C24" : "rgba(255,255,255,0.25)",
              cursor: isFinished ? "pointer" : "not-allowed",
              fontWeight: 700,
              fontSize: "0.98rem",
              boxShadow: isFinished ? "0 5px 25px rgba(244,197,66,0.4)" : "none",
              outline: "none"
            }}
          >
            🎁 Open Your Surprise
          </motion.button>
        </motion.div>

        {/* C. RIGHT COLUMN CHARACTER: Sunglasses Pig & speech signs */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "220px" }}>
          {/* Speech bubble */}
          <div 
            className="glassmorphism"
            style={{
              padding: "10px 14px",
              borderRadius: "16px",
              fontSize: "0.75rem",
              color: "#FFF8F0",
              maxWidth: "140px",
              border: "1px solid rgba(255,255,255,0.08)",
              textAlign: "center",
              marginBottom: "12px"
            }}
          >
            {coolPhrases[coolIdx]}
          </div>

          {/* Right Cool Pig Vector */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "110px", height: "110px" }}
          >
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
              <ellipse cx="50" cy="82" rx="35" ry="10" fill="#FFFFFF" opacity="0.9" />
              <circle cx="50" cy="52" r="23" fill="#FFB6C1" />
              <circle cx="50" cy="32" r="17" fill="#FFB6C1" />
              
              {/* Black Sunglasses */}
              <polygon points="32,26 48,26 44,32 34,32" fill="#0F172A" />
              <polygon points="52,26 68,26 66,32 56,32" fill="#0F172A" />
              <line x1="48" y1="28" x2="52" y2="28" stroke="#0F172A" strokeWidth="2.5" />
              
              {/* Ears */}
              <path d="M 38 21 Q 32 10 41 16" fill="#FFB6C1" />
              <path d="M 61 21 Q 68 10 59 16" fill="#FFB6C1" />

              {/* Snout */}
              <ellipse cx="50" cy="40" rx="6.5" ry="4" fill="#F43F5E" opacity="0.5" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* 6. Bottom glassmorphism Quote Card */}
      <div 
        className="glassmorphism"
        style={{
          width: "100%",
          maxWidth: "520px",
          padding: "20px 24px",
          borderRadius: "20px",
          border: "1.5px solid var(--glass-border)",
          boxShadow: "var(--glass-shadow)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          zIndex: 10,
          marginBottom: "24px"
        }}
      >
        <span style={{ fontSize: "1.2rem" }}>❤️</span>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontStyle: "italic", lineHeight: 1.5, textAlign: "center", flex: 1 }}>
          "Some surprises aren't wrapped in paper. <br />
          They're wrapped in love, memories and laughter. ❤️"
        </p>
        <span style={{ fontSize: "1.2rem", color: "var(--color-gold)" }}>★</span>
      </div>

      {/* 7. Bottom Banner */}
      <div 
        className="glassmorphism"
        style={{
          padding: "12px 24px",
          borderRadius: "9999px",
          border: "1px solid rgba(255,255,255,0.06)",
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "#FFF8F0",
          zIndex: 10,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 0 10px rgba(167,107,255,0.1)"
        }}
      >
        <span>🎂 Get ready for cuteness overload and lots of beautiful memories! 🎉</span>
        <span>💕</span>
      </div>
    </div>
  );
}
