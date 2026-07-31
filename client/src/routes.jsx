import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar.jsx";
import AudioPlayer from "./components/AudioPlayer";
import BackgroundEffects from "./components/BackgroundEffects";

// Pages
import Home from "./pages/Home";
import WishPage from "./pages/WishPage";
import CakeDecorator from "./pages/CakeDecorator";
import PuzzlePage from "./pages/PuzzlePage";
import GalleryPage from "./pages/GalleryPage";
import LetterPage from "./pages/LetterPage";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Background layer */}
      <BackgroundEffects />

      {/* Global Navbar Header */}
      <Navbar />

      {/* Global Audio Controller */}
      <AudioPlayer volumeBoostTriggered={false} />

      {/* Main Pages Content Frame */}
      <main style={{ position: "relative", zIndex: 10 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wish" element={<WishPage />} />
          <Route path="/decorate" element={<CakeDecorator />} />
          <Route path="/puzzle" element={<PuzzlePage />} />
          <Route path="/memories" element={<GalleryPage />} />
          <Route path="/final" element={<LetterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
