import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useAdventure } from "../context/AdventureContext";

export default function Navbar() {
  const { playMusic, setPlayMusic, isMuted, setIsMuted } = useAdventure();

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        zIndex: 100,
        background: "rgba(7, 11, 25, 0.2)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.03)"
      }}
    >
      <span 
        className="font-cinematic text-gradient-gold"
        style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          letterSpacing: "0.05em"
        }}
      >
        To My Brother ❤️
      </span>

      {/* Global Mute control */}
      <button
        onClick={() => {
          if (!playMusic) setPlayMusic(true);
          setIsMuted(!isMuted);
        }}
        className="interactive-item"
        style={{
          background: "none",
          border: "none",
          color: "var(--color-gold)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          outline: "none"
        }}
      >
        {isMuted || !playMusic ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </header>
  );
}
