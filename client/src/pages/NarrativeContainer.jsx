import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import layout components
import CustomCursor from "../components/CustomCursor";
import AudioPlayer from "../components/AudioPlayer";
import BackgroundEffects from "../components/BackgroundEffects";
import SecretPopup from "../components/SecretPopup";

// Import pages
import LoadingScreen from "./LoadingScreen";
import WelcomeGate from "./WelcomeGate";
import AdventureMap from "./AdventureMap";
import MemoryForest from "./MemoryForest";
import FunChallenge from "./FunChallenge";
import SecretTreasure from "./SecretTreasure";
import BirthdayCelebration from "./BirthdayCelebration";
import FinalSurprise from "./FinalSurprise";

export default function NarrativeContainer() {
  // Steps: loading | welcome | map | forest | challenge | treasure | celebration | surprise
  const [step, setStep] = useState("loading");
  const [playMusic, setPlayMusic] = useState(false);
  const [volumeBoost, setVolumeBoost] = useState(false);
  const [completedPaths, setCompletedPaths] = useState([]); // Array of strings: "forest", "challenge"

  const handleLoadingComplete = () => {
    setStep("welcome");
  };

  const handleStartAdventure = () => {
    setStep("map");
  };

  const handleSelectPath = (pathId) => {
    setStep(pathId);
  };

  const handleForestComplete = () => {
    if (!completedPaths.includes("forest")) {
      setCompletedPaths((prev) => [...prev, "forest"]);
    }
    setStep("map");
  };

  const handleChallengeComplete = () => {
    if (!completedPaths.includes("challenge")) {
      setCompletedPaths((prev) => [...prev, "challenge"]);
    }
    setStep("map");
  };

  const handleTreasureComplete = () => {
    setStep("celebration");
  };

  const handleCelebrationComplete = () => {
    setStep("surprise");
  };

  const handleReplay = () => {
    setCompletedPaths([]);
    setVolumeBoost(false);
    setPlayMusic(false);
    setStep("loading");
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
      <CustomCursor />
      <SecretPopup />
      <BackgroundEffects mode={step === "loading" ? "welcome" : "forest"} />
      
      {/* Global Audio Controller */}
      {step !== "loading" && (
        <AudioPlayer playTriggered={playMusic} volumeBoostTriggered={volumeBoost} />
      )}

      <AnimatePresence mode="wait">
        {step === "loading" && (
          <motion.div
            key="loading"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen 
              onComplete={handleLoadingComplete} 
              onPlayMusic={() => setPlayMusic(true)} 
              isMuted={!playMusic}
              onToggleMute={() => setPlayMusic(!playMusic)}
            />
          </motion.div>
        )}

        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WelcomeGate 
              onStart={handleStartAdventure} 
              onPlayMusic={() => setPlayMusic(true)}
            />
          </motion.div>
        )}

        {step === "map" && (
          <motion.div
            key="map"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <AdventureMap 
              completedPaths={completedPaths} 
              onSelectPath={handleSelectPath} 
            />
          </motion.div>
        )}

        {step === "forest" && (
          <motion.div
            key="forest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MemoryForest onBack={handleForestComplete} />
          </motion.div>
        )}

        {step === "challenge" && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FunChallenge onBack={handleChallengeComplete} />
          </motion.div>
        )}

        {step === "treasure" && (
          <motion.div
            key="treasure"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SecretTreasure 
              onBack={() => setStep("map")} 
              onComplete={handleTreasureComplete} 
            />
          </motion.div>
        )}

        {step === "celebration" && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BirthdayCelebration 
              onNext={handleCelebrationComplete} 
              onChangeMusic={() => setVolumeBoost(true)} 
            />
          </motion.div>
        )}

        {step === "surprise" && (
          <motion.div
            key="surprise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FinalSurprise onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
