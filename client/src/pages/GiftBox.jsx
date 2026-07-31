import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import confetti from "canvas-confetti";

export default function GiftBox({ onOpen }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const containerRef = useRef(null);
  const boxRef = useRef(null);

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#fbbf24", "#8b5cf6", "#ec4899", "#3b82f6"]
    });

    const tl = gsap.timeline({
      onComplete: onOpen
    });

    tl.to(boxRef.current, {
      scale: 1.2,
      duration: 0.4,
      ease: "power2.out"
    })
    .to(boxRef.current, {
      scale: 18,
      opacity: 0,
      filter: "blur(15px)",
      duration: 1.4,
      ease: "power3.in"
    });
  };

  return (
    <div 
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 10,
        color: "#fff",
        overflow: "hidden"
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-pink)", fontWeight: 600 }}>
            Chapter Two
          </span>
          <h2 
            className="font-cinematic text-gradient-gold text-glow"
            style={{ fontSize: "2.5rem", fontWeight: 700, marginTop: "8px" }}
          >
            The Magic Gift
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginTop: "12px" }}>
            A magical gift box floats in space. Click to unbox.
          </p>
        </div>

        <div ref={boxRef} style={{ transformOrigin: "center center" }}>
          <motion.div
            onMouseEnter={() => setIsShaking(true)}
            onMouseLeave={() => setIsShaking(false)}
            onClick={handleOpen}
            animate={
              isOpened 
                ? {}
                : isShaking 
                  ? { x: [-3, 3, -3, 3, -3, 3, 0], y: [-2, 2, -2, 2, -2, 2, 0], rotate: [-2, 2, -2, 2, 0] }
                  : { y: [-10, 10, -10] }
            }
            transition={
              isOpened 
                ? {}
                : isShaking 
                  ? { duration: 0.5, repeat: Infinity }
                  : { repeat: Infinity, duration: 4, ease: "easeInOut" }
            }
            className="interactive-item"
            style={{
              width: "160px",
              height: "160px",
              position: "relative",
              cursor: "pointer"
            }}
          >
            <motion.div
              animate={isOpened ? { y: -80, opacity: 0, rotate: -25 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: 0,
                left: "-10px",
                width: "180px",
                height: "40px",
                backgroundColor: "var(--color-purple)",
                borderRadius: "4px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                zIndex: 3,
                display: "flex",
                justifyContent: "center"
              }}
            >
              <div style={{ position: "absolute", top: 0, bottom: 0, width: "30px", backgroundColor: "var(--color-gold)" }} />
              <div style={{ position: "absolute", top: "-20px", width: "40px", height: "20px", borderRadius: "50%", border: "6px solid var(--color-gold)", backgroundColor: "transparent", transform: "rotate(-20deg)", left: "50px" }} />
              <div style={{ position: "absolute", top: "-20px", width: "40px", height: "20px", borderRadius: "50%", border: "6px solid var(--color-gold)", backgroundColor: "transparent", transform: "rotate(20deg)", right: "50px" }} />
            </motion.div>

            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "160px",
                height: "125px",
                backgroundColor: "var(--color-pink)",
                borderRadius: "0 0 8px 8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 -10px 20px rgba(0,0,0,0.2)",
                zIndex: 2,
                overflow: "hidden"
              }}
            >
              <div style={{ position: "absolute", left: "65px", top: 0, bottom: 0, width: "30px", backgroundColor: "var(--color-gold)" }} />
            </div>

            <div 
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "240px",
                height: "240px",
                borderRadius: "50%",
                background: "radial-gradient(circle, var(--color-gold-glow) 0%, rgba(0,0,0,0) 70%)",
                zIndex: 1,
                pointerEvents: "none"
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
