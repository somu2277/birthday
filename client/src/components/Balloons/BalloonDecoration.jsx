import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function BalloonDecoration() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const floatingBalloons = [
    { id: 1, left: "7%", delay: 0, duration: 34, type: "gold", size: 36 },
    { id: 2, left: "26%", delay: 5, duration: 40, type: "pearl", size: 28 },
    { id: 3, left: "64%", delay: 2, duration: 36, type: "rosegold", size: 42 },
    { id: 4, left: "91%", delay: 8, duration: 44, type: "lavender", size: 34 },
    { id: 5, left: "44%", delay: 11, duration: 38, type: "transparent", size: 36 }
  ];

  // Fairy light coordinate offsets for corner ribbons
  const leftLights = [
    { cx: 62, cy: 110, delay: 0.1 },
    { cx: 74, cy: 140, delay: 0.4 },
    { cx: 83, cy: 170, delay: 0.7 },
    { cx: 89, cy: 200, delay: 1.0 },
    { cx: 85, cy: 228, delay: 1.3 }
  ];

  const rightLights = [
    { cx: 158, cy: 110, delay: 0.2 },
    { cx: 146, cy: 140, delay: 0.5 },
    { cx: 137, cy: 170, delay: 0.8 },
    { cx: 131, cy: 200, delay: 1.1 },
    { cx: 135, cy: 228, delay: 1.4 }
  ];

  return (
    <div 
      className="global-balloon-layer"
      style={{ 
        position: "fixed", 
        inset: 0, 
        pointerEvents: "none", 
        zIndex: 2, 
        overflow: "hidden" 
      }}
    >
      {/* 3D Glossy Balloon Gradient Definitions */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="lux-gold" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFEE8" />
            <stop offset="30%" stopColor="#F5C542" />
            <stop offset="70%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="#7A5807" />
          </radialGradient>
          <radialGradient id="lux-rosegold" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFEAEA" />
            <stop offset="30%" stopColor="#E2A1A1" />
            <stop offset="75%" stopColor="#C47F7F" />
            <stop offset="100%" stopColor="#7C4545" />
          </radialGradient>
          <radialGradient id="lux-pearl" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F0ECE6" />
            <stop offset="85%" stopColor="#D5CFC6" />
            <stop offset="100%" stopColor="#9C958A" />
          </radialGradient>
          <radialGradient id="lux-pink" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFF2F5" />
            <stop offset="45%" stopColor="#FFB7CA" />
            <stop offset="100%" stopColor="#E08BA1" />
          </radialGradient>
          <radialGradient id="lux-blue" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#F0F9FF" />
            <stop offset="45%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#60A5FA" />
          </radialGradient>
          <radialGradient id="lux-lavender" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FAF5FF" />
            <stop offset="40%" stopColor="#D8B4FE" />
            <stop offset="75%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </radialGradient>
          <radialGradient id="lux-transparent" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.55)" />
            <stop offset="45%" stopColor="rgba(255, 255, 255, 0.2)" />
            <stop offset="100%" stopColor="rgba(244, 197, 66, 0.08)" />
          </radialGradient>
        </defs>
      </svg>

      {/* Helper definitions for ribbons, bows, and foil shapes */}
      <svg style={{ display: "none" }}>
        <g id="svg-bow" fill="#F5C542">
          <path d="M -6 -2 C -11 -9, -2 -9, 0 -2 C 2 -9, 11 -9, 6 -2 L 3 5 L -3 5 Z" />
          <circle cx="0" cy="-2" r="1.8" fill="#FFF" />
        </g>
        <g id="svg-foil-heart">
          <path 
            d="M 20 6 C 15 0, 5 3, 5 10 C 5 17, 12 21, 20 28 C 28 21, 35 17, 35 10 C 35 3, 25 0, 20 6 Z" 
            style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
          />
          {/* Heart glossy highlight reflection */}
          <path d="M 9 8 C 8 11, 10 13, 11 10 C 11 8, 10 7, 9 8 Z" fill="rgba(255,255,255,0.6)" />
        </g>
        <g id="svg-foil-star">
          <path 
            d="M 20 2 L 25 12 L 36 14 L 28 22 L 30 32 L 20 27 L 10 32 L 12 22 L 4 14 L 15 12 Z" 
            style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
          />
          {/* Star glossy highlight reflection */}
          <path d="M 18 6 L 16 11 L 19 9 Z" fill="rgba(255,255,255,0.6)" />
        </g>
      </svg>

      {/* 1. TOP-LEFT BALLOON CLUSTER WITH FAIRY LIGHTS & RIBBON CURLS */}
      <motion.div
        animate={{ y: [-5, 5, -5], rotate: [-0.5, 0.5, -0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "var(--balloon-left-offset)",
          top: isHomePage ? "var(--balloon-home-top)" : "var(--balloon-top-offset)",
          width: isHomePage ? "var(--balloon-home-width)" : "var(--balloon-top-width)",
          height: isHomePage ? "var(--balloon-home-height)" : "var(--balloon-top-height)",
          zIndex: 1
        }}
      >
        <svg viewBox="0 0 220 260" style={{ width: "100%", height: "100%" }}>
          {/* Ribbon Curls */}
          <path d="M 50 70 Q 70 150, 90 240" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M 90 60 C 80 110, 105 160, 85 240" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M 130 80 Q 110 160, 90 240" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M 70 120 C 60 160, 80 190, 75 248" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M 110 120 Q 100 180, 90 240" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.4" />

          {/* Fairy Lights on Ribbon */}
          {leftLights.map((l, idx) => (
            <motion.circle
              key={idx}
              cx={l.cx}
              cy={l.cy}
              r="2.5"
              fill="#FFE28A"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.2, 0.85] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: l.delay, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 4px #fbbf24)" }}
            />
          ))}

          {/* Balloon Spheres */}
          <g style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.35))" }}>
            {/* Lavender balloon */}
            <ellipse cx="50" cy="70" rx="24" ry="32" fill="url(#lux-lavender)" />
            <use href="#svg-bow" x="50" y="102" />

            {/* Gold balloon */}
            <ellipse cx="90" cy="60" rx="26" ry="34" fill="url(#lux-gold)" />
            <use href="#svg-bow" x="90" y="94" />

            {/* Foil Star Gold Balloon */}
            <use href="#svg-foil-star" x="110" y="60" fill="url(#lux-gold)" />
            <use href="#svg-bow" x="130" y="92" />

            {/* Pink balloon */}
            <ellipse cx="70" cy="120" rx="22" ry="30" fill="url(#lux-pink)" />
            <use href="#svg-bow" x="70" y="150" />

            {/* Transparent balloon */}
            <g>
              <ellipse cx="110" cy="120" rx="23" ry="31" fill="url(#lux-transparent)" />
              <circle cx="106" cy="112" r="2" fill="#F5C542" />
              <circle cx="114" cy="125" r="1.5" fill="#F5C542" />
              <circle cx="102" cy="122" r="1.2" fill="#F5C542" />
              <circle cx="116" cy="116" r="1.8" fill="#F5C542" />
              <use href="#svg-bow" x="110" y="151" />
            </g>
          </g>
        </svg>
      </motion.div>

      {/* 2. TOP-RIGHT BALLOON CLUSTER WITH FAIRY LIGHTS & RIBBON CURLS */}
      <motion.div
        animate={{ y: [5, -5, 5], rotate: [0.5, -0.5, 0.5] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          right: "var(--balloon-left-offset)",
          top: isHomePage ? "var(--balloon-home-top)" : "var(--balloon-top-offset)",
          width: isHomePage ? "var(--balloon-home-width)" : "var(--balloon-top-width)",
          height: isHomePage ? "var(--balloon-home-height)" : "var(--balloon-top-height)",
          zIndex: 1
        }}
      >
        <svg viewBox="0 0 220 260" style={{ width: "100%", height: "100%" }}>
          {/* Ribbon Curls */}
          <path d="M 90 80 Q 110 160, 130 240" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M 130 60 C 140 110, 115 160, 135 240" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M 170 70 Q 150 150, 130 240" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M 110 120 Q 120 180, 130 240" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M 150 120 C 160 160, 140 190, 145 248" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.4" />

          {/* Fairy Lights on Ribbon */}
          {rightLights.map((l, idx) => (
            <motion.circle
              key={idx}
              cx={l.cx}
              cy={l.cy}
              r="2.5"
              fill="#FFE28A"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.2, 0.85] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: l.delay, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 4px #fbbf24)" }}
            />
          ))}

          {/* Balloon Spheres */}
          <g style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.35))" }}>
            {/* Rose Gold balloon */}
            <ellipse cx="90" cy="80" rx="24" ry="32" fill="url(#lux-rosegold)" />
            <use href="#svg-bow" x="90" y="112" />

            {/* Gold balloon */}
            <ellipse cx="130" cy="60" rx="26" ry="34" fill="url(#lux-gold)" />
            <use href="#svg-bow" x="130" y="94" />

            {/* Foil Heart Rose Gold Balloon */}
            <use href="#svg-foil-heart" x="150" y="45" fill="url(#lux-rosegold)" />
            <use href="#svg-bow" x="170" y="73" />

            {/* Transparent balloon */}
            <g>
              <ellipse cx="110" cy="120" rx="23" ry="31" fill="url(#lux-transparent)" />
              <circle cx="106" cy="112" r="2" fill="#F5C542" />
              <circle cx="114" cy="125" r="1.5" fill="#F5C542" />
              <circle cx="102" cy="122" r="1.2" fill="#F5C542" />
              <circle cx="116" cy="116" r="1.8" fill="#F5C542" />
              <use href="#svg-bow" x="110" y="151" />
            </g>

            {/* Sky Blue balloon */}
            <ellipse cx="150" cy="120" rx="22" ry="30" fill="url(#lux-blue)" />
            <use href="#svg-bow" x="150" y="150" />
          </g>
        </svg>
      </motion.div>

      {/* 3. MIDDLE FLANKING CLUSTERS, BOTTOM BUNCHES & FLOATING BACKGROUND BALLOONS (HIDDEN ON HOME PATH) */}
      {!isHomePage && (
        <>
          {/* Left Flanking Cluster */}
          <motion.div
            className="flanking-balloons-left"
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: "calc(50% - 400px)",
              top: "28%",
              width: "120px",
              height: "190px",
              zIndex: 1
            }}
          >
            <svg viewBox="0 0 120 190" style={{ width: "100%", height: "100%" }}>
              <path d="M 40 85 Q 50 125, 60 180" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.35" />
              <path d="M 60 70 Q 60 125, 60 180" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.35" />
              <path d="M 80 85 Q 70 125, 60 180" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.35" />

              <g style={{ filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.3))" }}>
                <ellipse cx="40" cy="85" rx="18" ry="25" fill="url(#lux-pearl)" />
                <ellipse cx="80" cy="85" rx="18" ry="25" fill="url(#lux-lavender)" />
                <ellipse cx="60" cy="70" rx="20" ry="27" fill="url(#lux-gold)" />
              </g>
            </svg>
          </motion.div>

          {/* Right Flanking Cluster */}
          <motion.div
            className="flanking-balloons-right"
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              right: "calc(50% - 400px)",
              top: "28%",
              width: "120px",
              height: "190px",
              zIndex: 1
            }}
          >
            <svg viewBox="0 0 120 190" style={{ width: "100%", height: "100%" }}>
              <path d="M 40 85 Q 50 125, 60 180" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.35" />
              <path d="M 60 70 Q 60 125, 60 180" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.35" />
              <path d="M 80 85 Q 70 125, 60 180" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.35" />

              <g style={{ filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.3))" }}>
                <ellipse cx="40" cy="85" rx="18" ry="25" fill="url(#lux-rosegold)" />
                <ellipse cx="80" cy="85" rx="18" ry="25" fill="url(#lux-pearl)" />
                <ellipse cx="60" cy="70" rx="20" ry="27" fill="url(#lux-gold)" />
              </g>
            </svg>
          </motion.div>

          {/* BOTTOM-LEFT CORNER BALLOON BUNCH */}
          <motion.div
            animate={{ y: [-4, 4, -4], rotate: [-0.3, 0.3, -0.3] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: "var(--balloon-left-offset)",
              bottom: "var(--balloon-top-offset)",
              width: "var(--balloon-bottom-width)",
              height: "var(--balloon-bottom-height)",
              zIndex: 1
            }}
          >
            <svg viewBox="0 0 140 180" style={{ width: "100%", height: "100%" }}>
              <path d="M 40 80 Q 55 120, 70 170" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.3" />
              <path d="M 70 65 Q 70 120, 70 170" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.3" />
              <path d="M 100 80 Q 85 120, 70 170" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.3" />

              <g style={{ filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.3))" }}>
                <ellipse cx="40" cy="80" rx="20" ry="27" fill="url(#lux-gold)" />
                <ellipse cx="100" cy="80" rx="20" ry="27" fill="url(#lux-rosegold)" />
                <ellipse cx="70" cy="65" rx="22" ry="29" fill="url(#lux-pearl)" />
              </g>
            </svg>
          </motion.div>

          {/* BOTTOM-RIGHT CORNER BALLOON BUNCH */}
          <motion.div
            animate={{ y: [4, -4, 4], rotate: [0.3, -0.3, 0.3] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              right: "var(--balloon-left-offset)",
              bottom: "var(--balloon-top-offset)",
              width: "var(--balloon-bottom-width)",
              height: "var(--balloon-bottom-height)",
              zIndex: 1
            }}
          >
            <svg viewBox="0 0 140 180" style={{ width: "100%", height: "100%" }}>
              <path d="M 40 80 Q 55 120, 70 170" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.3" />
              <path d="M 70 65 Q 70 120, 70 170" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.3" />
              <path d="M 100 80 Q 85 120, 70 170" stroke="#F5C542" strokeWidth="1.2" fill="none" opacity="0.3" />

              <g style={{ filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.3))" }}>
                <ellipse cx="40" cy="80" rx="20" ry="27" fill="url(#lux-pearl)" />
                <ellipse cx="100" cy="80" rx="20" ry="27" fill="url(#lux-gold)" />
                <ellipse cx="70" cy="65" rx="22" ry="29" fill="url(#lux-rosegold)" />
              </g>
            </svg>
          </motion.div>

          {/* SLOW FLOATING BACKGROUND BALLOONS (LOW OPACITY) */}
          {floatingBalloons.map((fb) => (
            <motion.div
              key={fb.id}
              initial={{ y: "105vh" }}
              animate={{ y: "-15vh" }}
              transition={{
                duration: fb.duration,
                repeat: Infinity,
                delay: fb.delay,
                ease: "linear"
              }}
              style={{
                position: "absolute",
                left: fb.left,
                width: fb.size * 1.2,
                height: fb.size * 1.6,
                opacity: 0.15,
                pointerEvents: "none"
              }}
            >
              <svg viewBox="0 0 40 60" style={{ width: "100%", height: "100%" }}>
                <ellipse cx="20" cy="25" rx="18" ry="24" fill={`url(#lux-${fb.type})`} />
                <path d="M 20 49 Q 18 55, 22 60" stroke="#F5C542" strokeWidth="1" fill="none" />
              </svg>
            </motion.div>
          ))}
        </>
      )}

      {/* Inject responsive sizes, flanking clusters visibility & layout adjustments */}
      <style>{`
        :root {
          --balloon-top-width: 220px;
          --balloon-top-height: 260px;
          --balloon-home-width: 245px;
          --balloon-home-height: 285px;
          --balloon-bottom-width: 140px;
          --balloon-bottom-height: 180px;
          --balloon-left-offset: -25px;
          --balloon-top-offset: -25px;
          --balloon-home-top: 90px;
        }

        @media (max-width: 1023px) {
          :root {
            --balloon-top-width: 170px;
            --balloon-top-height: 200px;
            --balloon-home-width: 175px;
            --balloon-home-height: 205px;
            --balloon-bottom-width: 110px;
            --balloon-bottom-height: 140px;
            --balloon-left-offset: -20px;
            --balloon-top-offset: -20px;
            --balloon-home-top: 70px;
          }
          .flanking-balloons-left,
          .flanking-balloons-right {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          :root {
            --balloon-top-width: 120px;
            --balloon-top-height: 140px;
            --balloon-home-width: 125px;
            --balloon-home-height: 145px;
            --balloon-bottom-width: 80px;
            --balloon-bottom-height: 100px;
            --balloon-left-offset: -15px;
            --balloon-top-offset: -15px;
            --balloon-home-top: 45px;
          }
        }
      `}</style>
    </div>
  );
}
