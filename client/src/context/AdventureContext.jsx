import React, { createContext, useContext, useState } from "react";

const AdventureContext = createContext();

export function AdventureProvider({ children }) {
  const clearProgress = () => {
    // Resets states if needed
  };

  return (
    <AdventureContext.Provider
      value={{
        clearProgress
      }}
    >
      {children}
    </AdventureContext.Provider>
  );
}

export function useAdventure() {
  return useContext(AdventureContext);
}
