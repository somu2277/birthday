import React from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div 
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px",
        color: "#fff"
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px"
        }}
      >
        <span 
          style={{
            fontSize: "6rem",
            fontWeight: 800,
            color: "var(--color-pink)",
            textShadow: "0 0 30px var(--color-pink-glow)",
            lineHeight: 1
          }}
        >
          404
        </span>
        <h1 className="font-cinematic" style={{ fontSize: "2rem", fontWeight: 700 }}>Lost in Space? 🚀</h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
          It seems the surprise page you're looking for doesn't exist, or has floated away. Let's return to the main path.
        </p>

        <Link to="/" style={{ textDecoration: "none", marginTop: "20px" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="premium-btn interactive-item"
            style={{
              padding: "12px 28px",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <Home size={16} />
            Go to Welcome Screen
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
