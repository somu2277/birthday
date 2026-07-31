import React from "react";
import { motion } from "framer-motion";
import { TreePine, Trophy, Key, CheckCircle, Lock } from "lucide-react";

export default function AdventureMap({ completedPaths, onSelectPath }) {
  const isForestDone = completedPaths.includes("forest");
  const isChallengeDone = completedPaths.includes("challenge");
  const isTreasureUnlocked = isForestDone && isChallengeDone;

  const paths = [
    {
      id: "forest",
      title: "Memory Forest",
      description: "Walk down the lane of our brotherhood milestones and shared photos.",
      icon: <TreePine size={36} />,
      color: "var(--color-purple)",
      border: "rgba(139,92,246,0.2)",
      bg: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.01))",
      isCompleted: isForestDone,
      locked: false
    },
    {
      id: "challenge",
      title: "Fun Challenge",
      description: "Test your quick clicks and catch falling gifts to harvest your Adventure Badge.",
      icon: <Trophy size={36} />,
      color: "var(--color-pink)",
      border: "rgba(236,72,153,0.2)",
      bg: "linear-gradient(135deg, rgba(236,72,153,0.12), rgba(236,72,153,0.01))",
      isCompleted: isChallengeDone,
      locked: false
    },
    {
      id: "treasure",
      title: "Secret Treasure",
      description: "Unlock the final chest to read the private letter (requires both badges).",
      icon: isTreasureUnlocked ? <Key size={36} /> : <Lock size={36} />,
      color: "var(--color-gold)",
      border: "rgba(251,191,36,0.2)",
      bg: "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(251,191,36,0.01))",
      isCompleted: completedPaths.includes("treasure"),
      locked: !isTreasureUnlocked
    }
  ];

  return (
    <div 
      style={{
        maxWidth: "1050px",
        margin: "0 auto",
        padding: "100px 24px",
        color: "#fff",
        position: "relative",
        zIndex: 10,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-pink)", fontWeight: 600 }}>
          Level Two
        </span>
        <h2 
          className="font-cinematic text-gradient-gold text-glow"
          style={{ fontSize: "calc(1.8rem + 1.6vw)", fontWeight: 700, marginTop: "8px" }}
        >
          Choose Your Path
        </h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "1.05rem" }}>
          Complete the trials to gather the badges and unlock the secret chest.
        </p>
      </div>

      {/* Grid of paths */}
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px"
        }}
      >
        {paths.map((path) => (
          <motion.div
            key={path.id}
            onClick={() => !path.locked && onSelectPath(path.id)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={!path.locked ? { 
              scale: 1.05,
              borderColor: path.color,
              boxShadow: `0 10px 30px ${path.color}33`
            } : {}}
            className="glassmorphism"
            style={{
              padding: "36px",
              borderRadius: "24px",
              border: `1.5px solid ${path.locked ? "rgba(255,255,255,0.03)" : path.border}`,
              background: path.bg,
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              position: "relative",
              cursor: path.locked ? "not-allowed" : "pointer",
              opacity: path.locked ? 0.45 : 1,
              transition: "border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease"
            }}
          >
            {/* Status indicator on top right */}
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              {path.isCompleted ? (
                <div style={{ color: "#10b981", filter: "drop-shadow(0 0 8px rgba(16,185,129,0.5))" }}>
                  <CheckCircle size={24} />
                </div>
              ) : path.locked ? (
                <div style={{ color: "var(--text-muted)" }}>
                  <Lock size={20} />
                </div>
              ) : null}
            </div>

            {/* Icon */}
            <div 
              style={{
                display: "inline-flex",
                color: path.color,
                backgroundColor: "rgba(255,255,255,0.03)",
                padding: "16px",
                borderRadius: "16px",
                width: "fit-content"
              }}
            >
              {path.icon}
            </div>

            {/* Text details */}
            <div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 600, color: "#fff", marginBottom: "12px" }}>
                {path.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.98rem", lineHeight: 1.6 }}>
                {path.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
