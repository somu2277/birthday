import React, { useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useAdventure } from "../context/AdventureContext";

export default function AudioPlayer({ volumeBoostTriggered }) {
  const { playMusic, setPlayMusic, isMuted, setIsMuted } = useAdventure();
  const audioRef = useRef(null);

  // A beautiful ambient instrumental track
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"; 

  useEffect(() => {
    if (playMusic && audioRef.current) {
      audioRef.current.play().then(() => {
        // Playing
      }).catch(err => {
        console.log("Autoplay blocked by browser. Awaiting user interaction.", err);
      });
    } else if (!playMusic && audioRef.current) {
      audioRef.current.pause();
    }
  }, [playMusic]);

  useEffect(() => {
    if (audioRef.current) {
      if (volumeBoostTriggered) {
        audioRef.current.volume = isMuted ? 0 : 0.85;
      } else {
        audioRef.current.volume = isMuted ? 0 : 0.4;
      }
      audioRef.current.muted = isMuted;
    }
  }, [isMuted, volumeBoostTriggered]);

  const togglePlay = () => {
    setPlayMusic(!playMusic);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div 
      className="glassmorphism"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 16px",
        borderRadius: "9999px",
        zIndex: 100,
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        transition: "all 0.3s ease"
      }}
    >
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        loop 
        preload="auto"
      />
      
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        style={{
          background: "none",
          border: "none",
          color: "var(--color-gold)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          outline: "none"
        }}
        title={playMusic ? "Pause Music" : "Play Music"}
      >
        {playMusic ? <Pause size={18} /> : <Play size={18} />}
      </button>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        style={{
          background: "none",
          border: "none",
          color: "var(--text-primary)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          outline: "none"
        }}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}
