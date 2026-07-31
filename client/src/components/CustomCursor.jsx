import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const innerX = useMotionValue(-100);
  const innerY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      innerX.set(e.clientX - 4);
      innerY.set(e.clientY - 4);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") || 
        target.closest(".interactive-item") ||
        target.style.cursor === "pointer";
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, [cursorX, cursorY, innerX, innerY, isVisible]);

  useEffect(() => {
    if (isVisible) {
      document.documentElement.classList.add("custom-cursor-enabled");
    } else {
      document.documentElement.classList.remove("custom-cursor-enabled");
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid var(--color-gold)",
          boxShadow: isHovered 
            ? "0 0 20px var(--color-purple)" 
            : "0 0 8px var(--color-gold-glow)",
          pointerEvents: "none",
          zIndex: 1001,
          transformOrigin: "center center"
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? "var(--color-purple)" : "var(--color-gold)",
          backgroundColor: isHovered ? "rgba(139, 92, 246, 0.15)" : "rgba(0, 0, 0, 0)"
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />
      {/* Inner Dot */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: innerX,
          y: innerY,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "var(--color-pink)",
          boxShadow: "0 0 8px var(--color-pink-glow)",
          pointerEvents: "none",
          zIndex: 1001
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? "var(--color-purple)" : "var(--color-pink)"
        }}
      />
    </>
  );
}
