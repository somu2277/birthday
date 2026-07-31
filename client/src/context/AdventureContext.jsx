import React, { createContext, useContext, useState } from "react";

const AdventureContext = createContext();

export function AdventureProvider({ children }) {
  const [playMusic, setPlayMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const clearProgress = () => {
    // Resets states if needed
  };

  return (
    <AdventureContext.Provider
      value={{
        clearProgress,
        playMusic,
        setPlayMusic,
        isMuted,
        setIsMuted
      }}
    >
      {children}
    </AdventureContext.Provider>
  );
}

export function useAdventure() {
  return useContext(AdventureContext);
}
