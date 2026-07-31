import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Maximize2, Image as ImageIcon, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { galleryImages as localGallery } from "../data/gallery";

export default function Gallery() {
  const [gallery, setGallery] = useState(localGallery);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = () => {
    fetch("/api/gallery")
      .then(res => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) setGallery(data);
      })
      .catch(err => {
        console.log("Could not load API gallery, using fallback:", err);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", "A Beautiful Memory");
    formData.append("caption", "Captured moment of our friendship.");
    formData.append("category", "uploads");

    fetch("/api/upload", {
      method: "POST",
      body: formData
    })
      .then(res => {
        if (!res.ok) throw new Error("Upload failed");
        return res.json();
      })
      .then(data => {
        setIsUploading(false);
        fetchGallery();
      })
      .catch(err => {
        setIsUploading(false);
        console.error("Upload error:", err);
        alert("Failed to upload image. Please try again!");
      });
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex(prev => (prev + 1) % gallery.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex(prev => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <section 
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 10,
        color: "#fff",
        maxWidth: "1100px",
        margin: "0 auto"
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "60px" }}>
        <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-purple)", fontWeight: 600 }}>
          Visual Diary
        </span>
        <h2 
          className="font-cinematic text-gradient-purple-pink"
          style={{ fontSize: "calc(1.8rem + 1.5vw)", fontWeight: 700, marginTop: "8px" }}
        >
          Shared Memories Gallery
        </h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "12px", maxWidth: "600px" }}>
          A snapshot of our lives. Click any panel to maximize the view. Add yours using the upload trigger!
        </p>

        {/* Upload Button */}
        <div style={{ marginTop: "30px" }}>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: "none" }} 
          />
          <motion.button
            onClick={() => fileInputRef.current.click()}
            disabled={isUploading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glassmorphism interactive-item"
            style={{
              padding: "12px 24px",
              borderRadius: "9999px",
              border: "1px solid var(--glass-border)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "var(--color-gold)",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.95rem"
            }}
          >
            {isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Upload size={16} />
                Upload Custom Photo
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Masonry / Grid */}
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
          autoRows: "260px"
        }}
      >
        {gallery.map((img, idx) => {
          const doubleHeight = idx % 3 === 0;

          return (
            <motion.div
              key={img.id}
              onClick={() => setActiveImageIndex(idx)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
              }}
              className="glassmorphism interactive-item"
              style={{
                gridRowEnd: doubleHeight ? "span 2" : "span 1",
                borderRadius: "24px",
                overflow: "hidden",
                cursor: "pointer",
                border: "1px solid var(--glass-border)",
                position: "relative",
                display: "flex",
                flexDirection: "column"
              }}
            >
              {/* Image Visualizer */}
              <div 
                style={{
                  flex: 1,
                  background: img.gradient || "none",
                  backgroundImage: img.imageUrl ? `url(${img.imageUrl})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {!img.gradient && !img.imageUrl && (
                  <ImageIcon size={40} color="var(--text-muted)" />
                )}
                
                <div 
                  className="gallery-hover-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease"
                  }}
                >
                  <Maximize2 size={24} color="#fff" />
                </div>
              </div>

              {/* Title & Caption */}
              <div 
                style={{
                  padding: "20px",
                  background: "linear-gradient(to top, rgba(15,23,42,0.95), rgba(15,23,42,0.7))",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%"
                }}
              >
                <h4 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#fff" }}>{img.title}</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>{img.caption}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        div[style*="cursor: pointer"]:hover .gallery-hover-overlay {
          opacity: 1 !important;
        }
      `}</style>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <div 
            onClick={() => setActiveImageIndex(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "24px"
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveImageIndex(null)}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer",
                zIndex: 1
              }}
            >
              <X size={20} />
            </button>

            {/* Left navigation arrow */}
            <button 
              onClick={prevImage}
              style={{
                position: "absolute",
                left: "24px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer",
                zIndex: 1
              }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right navigation arrow */}
            <button 
              onClick={nextImage}
              style={{
                position: "absolute",
                right: "24px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer",
                zIndex: 1
              }}
            >
              <ChevronRight size={20} />
            </button>

            {/* Lightbox Content Card */}
            <motion.div
              key={activeImageIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glassmorphism"
              style={{
                maxWidth: "800px",
                width: "100%",
                maxHeight: "80vh",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid var(--glass-border)",
                boxShadow: "var(--glass-shadow)",
                display: "flex",
                flexDirection: "column"
              }}
            >
              {/* Image / Gradient */}
              <div 
                style={{
                  height: "50vh",
                  background: gallery[activeImageIndex].gradient || "none",
                  backgroundImage: gallery[activeImageIndex].imageUrl ? `url(${gallery[activeImageIndex].imageUrl})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {!gallery[activeImageIndex].gradient && !gallery[activeImageIndex].imageUrl && (
                  <ImageIcon size={60} color="var(--text-muted)" />
                )}
              </div>

              {/* Text caption details */}
              <div style={{ padding: "30px", backgroundColor: "var(--bg-secondary)" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--color-pink)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {gallery[activeImageIndex].category || "Memory"}
                </span>
                <h3 className="font-cinematic" style={{ fontSize: "1.6rem", fontWeight: 700, margin: "8px 0 12px" }}>
                  {gallery[activeImageIndex].title}
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {gallery[activeImageIndex].caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
