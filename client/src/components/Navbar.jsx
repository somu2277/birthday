import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X as CloseIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Wish", path: "/wish" },
    { label: "Cake", path: "/decorate" },
    { label: "Challenge", path: "/puzzle" },
    { label: "Memories", path: "/memories" },
    { label: "Letter", path: "/final" }
  ];

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

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
        background: "rgba(7, 11, 25, 0.5)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)"
      }}
    >
      {/* Brand Logotype */}
      <span 
        onClick={() => handleNav("/")}
        className="font-cinematic text-gradient-gold"
        style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          letterSpacing: "0.05em",
          cursor: "pointer"
        }}
      >
        To My Brother ❤️
      </span>

      {/* Desktop Links (Visible on screen width >= 768px) */}
      <nav 
        className="desktop-only"
        style={{ 
          display: "flex", 
          gap: "20px", 
          alignItems: "center"
        }}
      >
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <span
              key={link.path}
              onClick={() => handleNav(link.path)}
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: isActive ? "#F4C542" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "color 0.2s ease"
              }}
            >
              {link.label}
            </span>
          );
        })}
      </nav>

      {/* Right Controls Area (Hamburger toggle) */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

        {/* Mobile Hamburger button (Visible on screen width < 768px) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-only"
          style={{
            background: "none",
            border: "none",
            color: "var(--color-gold)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            outline: "none"
          }}
        >
          {isOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer menu container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glassmorphism mobile-only"
            style={{
              position: "absolute",
              top: "64px",
              left: 0,
              width: "100%",
              padding: "16px 24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              zIndex: 99,
              borderBottom: "1.5px solid var(--color-gold)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.5)"
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <span
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: isActive ? "#F4C542" : "#FFF8EE",
                    cursor: "pointer",
                    padding: "4px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)"
                  }}
                >
                  {link.label}
                </span>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar helper stylesheet injection */}
      <style>{`
        .mobile-only {
          display: none !important;
        }
        .desktop-only {
          display: flex !important;
        }
        @media (max-width: 767px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
          button.mobile-only {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}
