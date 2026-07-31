import React from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, MapPin } from "lucide-react";
import { useAdventure } from "../context/AdventureContext";

export default function WorldMap({ onSelectMarker, activeChapterId }) {
  const { visitedChapters, isLetterUnlocked } = useAdventure();

  const chapters = [
    { id: 1, title: "Chapter 1", x: 180, y: 110, label: "North America" },
    { id: 2, title: "Chapter 2", x: 270, y: 220, label: "South America" },
    { id: 3, title: "Chapter 3", x: 480, y: 90, label: "Europe" },
    { id: 4, title: "Chapter 4", x: 520, y: 190, label: "Africa" },
    { id: 5, title: "Chapter 5", x: 710, y: 120, label: "Asia" },
    { id: 6, title: "Final Destination", x: 840, y: 260, label: "Australia", isFinal: true }
  ];

  return (
    <div style={{ width: "100%", maxWidth: "900px", position: "relative", aspectRatio: "2.25/1" }}>
      {/* SVG Stylized Vector Map */}
      <svg 
        viewBox="0 0 1000 440" 
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))"
        }}
      >
        {/* World Continents Stylized Outlines (Artistic representation) */}
        {/* North America */}
        <path 
          d="M 80 80 Q 150 40 220 70 Q 250 100 240 140 Q 220 170 170 160 Q 130 190 140 120 Q 90 120 80 80 Z" 
          fill="rgba(30, 41, 59, 0.35)" 
          stroke="rgba(255,255,255,0.04)" 
          strokeWidth="1.5" 
        />
        {/* South America */}
        <path 
          d="M 220 180 Q 260 180 290 220 Q 300 280 240 340 Q 220 300 200 260 Q 180 200 220 180 Z" 
          fill="rgba(30, 41, 59, 0.35)" 
          stroke="rgba(255,255,255,0.04)" 
          strokeWidth="1.5" 
        />
        {/* Europe / Northern Eurasia */}
        <path 
          d="M 400 60 Q 550 40 780 70 Q 820 110 750 150 Q 600 130 500 150 Q 420 120 400 60 Z" 
          fill="rgba(30, 41, 59, 0.35)" 
          stroke="rgba(255,255,255,0.04)" 
          strokeWidth="1.5" 
        />
        {/* Africa */}
        <path 
          d="M 450 150 Q 530 150 560 200 Q 580 270 520 310 Q 480 290 470 230 Q 430 180 450 150 Z" 
          fill="rgba(30, 41, 59, 0.35)" 
          stroke="rgba(255,255,255,0.04)" 
          strokeWidth="1.5" 
        />
        {/* Southern Asia / East Indies */}
        <path 
          d="M 680 140 Q 750 140 790 190 Q 720 220 670 170 Z" 
          fill="rgba(30, 41, 59, 0.35)" 
          stroke="rgba(255,255,255,0.04)" 
          strokeWidth="1.5" 
        />
        {/* Australia */}
        <path 
          d="M 800 240 Q 860 230 880 270 Q 860 320 810 300 Q 780 270 800 240 Z" 
          fill="rgba(30, 41, 59, 0.35)" 
          stroke="rgba(255,255,255,0.04)" 
          strokeWidth="1.5" 
        />

        {/* Connecting dotted lines between chapters (Flight paths) */}
        {chapters.slice(0, -1).map((ch, idx) => {
          const nextCh = chapters[idx + 1];
          return (
            <line
              key={`link-${ch.id}`}
              x1={ch.x}
              y1={ch.y}
              x2={nextCh.x}
              y2={nextCh.y}
              stroke={visitedChapters.includes(ch.id) ? "var(--color-gold)" : "rgba(59,130,246,0.2)"}
              strokeDasharray="4,6"
              strokeWidth="2"
              style={{ transition: "stroke 0.4s ease" }}
            />
          );
        })}

        {/* Location Markers */}
        {chapters.map((ch) => {
          const isVisited = visitedChapters.includes(ch.id);
          const isActive = activeChapterId === ch.id;
          const isFinalLocked = ch.isFinal && !isLetterUnlocked;

          // Glowing Color theme: Gold if visited/unlocked, Blue if pending/locked
          const glowColor = ch.isFinal
            ? (isLetterUnlocked ? "var(--color-gold)" : "var(--color-blue)")
            : (isVisited ? "var(--color-gold)" : "var(--color-blue)");

          const glowColorGlow = ch.isFinal
            ? (isLetterUnlocked ? "var(--color-gold-glow)" : "rgba(59,130,246,0.3)")
            : (isVisited ? "var(--color-gold-glow)" : "rgba(59,130,246,0.3)");

          return (
            <g 
              key={ch.id} 
              style={{ cursor: isFinalLocked ? "not-allowed" : "pointer" }}
              onClick={() => !isFinalLocked && onSelectMarker(ch.id)}
            >
              {/* Outer pulsing ring */}
              <motion.circle
                cx={ch.x}
                cy={ch.y}
                r="16"
                fill="none"
                stroke={glowColor}
                strokeWidth="2"
                animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, delay: ch.id * 0.3 }}
              />

              {/* Pin indicator */}
              <circle
                cx={ch.x}
                cy={ch.y}
                r="8"
                fill={glowColor}
                style={{
                  filter: `drop-shadow(0 0 8px ${glowColor})`,
                  transition: "fill 0.4s ease"
                }}
              />

              {/* Label Tag */}
              <g transform={`translate(${ch.x - 45}, ${ch.y - 32})`}>
                <rect
                  width="90"
                  height="20"
                  rx="4"
                  fill="rgba(15,23,42,0.85)"
                  stroke={isActive ? "var(--color-gold)" : "rgba(255,255,255,0.06)"}
                  strokeWidth="1"
                />
                <text
                  x="45"
                  y="13"
                  fill={ch.isFinal ? "var(--color-gold)" : "#fff"}
                  fontSize="8"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {ch.title}
                </text>
              </g>

              {/* Padlock Icon if locked */}
              {isFinalLocked && (
                <g transform={`translate(${ch.x - 6}, ${ch.y - 6})`}>
                  <circle cx="6" cy="6" r="8" fill="#111827" />
                  <path d="M 4 5 L 4 3 A 2 2 0 0 1 8 3 L 8 5 Z" stroke="rgba(255,255,255,0.6)" fill="none" strokeWidth="1" />
                  <rect x="3" y="5" width="6" height="5" rx="1" fill="rgba(255,255,255,0.6)" />
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
