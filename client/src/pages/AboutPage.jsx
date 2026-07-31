import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, ShieldAlert, Award } from "lucide-react";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div 
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "90px 24px 40px",
        color: "#fff",
        position: "relative",
        zIndex: 10,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-gold)", fontWeight: 600 }}>
          Documentary Segment
        </span>
        <h2 
          className="font-cinematic text-gradient-gold text-glow"
          style={{ fontSize: "calc(1.8rem + 1.5vw)", fontWeight: 700, marginTop: "8px" }}
        >
          About Our Connection
        </h2>
      </div>

      {/* Main Content Layout splits */}
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "40px",
          alignItems: "center"
        }}
      >
        {/* Left Column: Duplicate Placeholder Visual */}
        <div 
          style={{
            height: "360px",
            borderRadius: "24px",
            overflow: "hidden",
            backgroundImage: "url(https://picsum.photos/900/1200?random=1)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1.5px solid var(--glass-border)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
          }}
        />

        {/* Right Column: Documentary descriptions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="glassmorphism" style={{ padding: "28px", borderRadius: "20px", border: "1px solid var(--glass-border)" }}>
            <h4 style={{ fontWeight: 600, color: "var(--color-gold)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Compass size={18} />
              The Foundation
            </h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
              Bonds aren't built on words alone—they are forged through late night trials, shared code reviews, road adventures, and mutual growth. From day one, this partnership has stood as the pillar of our success.
            </p>
          </div>

          <div className="glassmorphism" style={{ padding: "28px", borderRadius: "20px", border: "1px solid var(--glass-border)" }}>
            <h4 style={{ fontWeight: 600, color: "var(--color-pink)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Award size={18} />
              The Goal
            </h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
              We keep building, mapping new territories, and debugger sprints. This portal is a tribute to the brother who stands strong at every checkpoint.
            </p>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <motion.button
          onClick={() => navigate("/journey")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="premium-btn interactive-item"
        >
          Continue Journey
        </motion.button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}
