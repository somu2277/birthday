import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import WorldMap from "../components/WorldMap";
import { useAdventure } from "../context/AdventureContext";
import { memories } from "../data/memories";

export default function JourneyPage() {
  const navigate = useNavigate();
  const { visitedChapters, addVisitedChapter, isLetterUnlocked, totalChapters } = useAdventure();
  
  const [activeChapterId, setActiveChapterId] = useState(null);

  const handleSelectMarker = (id) => {
    if (id === 6) {
      if (isLetterUnlocked) {
        navigate("/letter");
      }
      return;
    }
    setActiveChapterId(id);
    addVisitedChapter(id);
  };

  const handleClose = () => {
    setActiveChapterId(null);
  };

  const handleNext = () => {
    if (activeChapterId < 5) {
      const nextId = activeChapterId + 1;
      setActiveChapterId(nextId);
      addVisitedChapter(nextId);
    } else if (activeChapterId === 5 && isLetterUnlocked) {
      navigate("/letter");
    }
  };

  const handlePrev = () => {
    if (activeChapterId > 1) {
      const prevId = activeChapterId - 1;
      setActiveChapterId(prevId);
      addVisitedChapter(prevId);
    }
  };

  // Find the selected chapter data
  const currentChapter = memories.find((m) => m.id === activeChapterId);
  const progressPercent = (visitedChapters.length / totalChapters) * 100;

  return (
    <div 
      style={{
        width: "100vw",
        minHeight: "100vh",
        padding: "90px 24px 40px",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflowX: "hidden"
      }}
    >
      {/* Top Progress Tracker Bar */}
      <div 
        style={{
          width: "100%",
          maxWidth: "700px",
          marginBottom: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          zIndex: 10
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>
          <span>JOURNEY PROGRESS</span>
          <span>{visitedChapters.length} / {totalChapters} CHAPTERS VISITED</span>
        </div>
        
        {/* Progress tracks container */}
        <div 
          style={{
            height: "4px",
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.06)",
            borderRadius: "2px",
            overflow: "hidden"
          }}
        >
          <motion.div 
            style={{
              height: "100%",
              width: `${progressPercent}%`,
              background: "linear-gradient(to right, var(--color-purple), var(--color-gold))"
            }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* World Map Container */}
      <div 
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
          transition: "filter 0.5s ease",
          filter: activeChapterId ? "blur(4px)" : "none"
        }}
      >
        <WorldMap onSelectMarker={handleSelectMarker} activeChapterId={activeChapterId} />
      </div>

      {/* Slide Out Card Overlay from the Right */}
      <AnimatePresence>
        {activeChapterId && currentChapter && (
          <>
            {/* Dark modal click backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "#000",
                zIndex: 400
              }}
            />

            {/* Slider Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="glassmorphism"
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "100%",
                maxWidth: "420px",
                height: "100vh",
                zIndex: 500,
                padding: "80px 32px 32px",
                display: "flex",
                flexDirection: "column",
                borderLeft: "1px solid var(--glass-border)",
                backdropFilter: "blur(20px)"
              }}
            >
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="interactive-item"
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  background: "none",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  outline: "none"
                }}
              >
                <X size={20} />
              </button>

              {/* Large Image (using duplicate placeholder) */}
              <div 
                style={{
                  width: "100%",
                  height: "220px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundImage: "url(https://picsum.photos/900/1200?random=1)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "1.5px solid var(--glass-border)",
                  marginBottom: "32px"
                }}
              />

              {/* Date */}
              <span 
                style={{
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  color: "var(--color-pink)",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                  marginBottom: "8px"
                }}
              >
                {currentChapter.date}
              </span>

              {/* Chapter Title */}
              <h3 
                className="font-cinematic text-gradient-gold"
                style={{ fontSize: "1.8rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "20px" }}
              >
                {currentChapter.title}
              </h3>

              {/* Description text */}
              <p 
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  flex: 1,
                  overflowY: "auto",
                  paddingRight: "8px"
                }}
              >
                {currentChapter.description}
              </p>

              {/* Controls Footer */}
              <div 
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "30px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  paddingTop: "20px"
                }}
              >
                <button
                  onClick={handlePrev}
                  disabled={activeChapterId === 1}
                  className="interactive-item"
                  style={{
                    background: "none",
                    border: "none",
                    color: activeChapterId === 1 ? "var(--text-muted)" : "var(--color-gold)",
                    cursor: activeChapterId === 1 ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: 600,
                    fontSize: "0.95rem"
                  }}
                >
                  <ChevronLeft size={16} />
                  Prev
                </button>

                <button
                  onClick={handleNext}
                  className="interactive-item"
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--color-gold)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: 600,
                    fontSize: "0.95rem"
                  }}
                >
                  {activeChapterId === 5 ? (isLetterUnlocked ? "Unlock Destination" : "Complete Map") : "Next"}
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
