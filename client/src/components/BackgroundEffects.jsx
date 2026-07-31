import React from "react";

export default function BackgroundEffects() {
  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
        background: "linear-gradient(to bottom, #070b19 0%, #0c0f1d 50%, #03050b 100%)"
      }}
    >
      {/* Soft Gold Light Center Glow */}
      <div 
        style={{
          position: "absolute",
          top: "-15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70vw",
          height: "50vh",
          background: "radial-gradient(circle, rgba(251, 191, 36, 0.045) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 100%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          zIndex: 1
        }}
      />
    </div>
  );
}
