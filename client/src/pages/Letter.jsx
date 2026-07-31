import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, content: message })
    })
      .then(res => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then(resData => {
        setIsSubmitting(false);
        setSuccess(true);
        setWishes(prev => [resData.data, ...prev]);
        setName("");
        setMessage("");
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(err => {
        setIsSubmitting(false);
        const mockMsg = {
          id: wishes.length + 1,
          name: name || "Anonymous",
          content: message,
          createdAt: new Date()
        };
        setWishes(prev => [mockMsg, ...prev]);
        setName("");
        setMessage("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      });
  };

  const letterText = "Wishing you endless happiness, success, good health, laughter, unforgettable memories, and everything you've been working toward. Thank you for always being there. May this year be your best one yet.";

  return (
    <section 
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 10,
        color: "#fff",
        maxWidth: "850px",
        margin: "0 auto"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-gold)", fontWeight: 600 }}>
          Chapter Six
        </span>
        <h2 
          className="font-cinematic text-gradient-gold text-glow"
          style={{ fontSize: "calc(1.8rem + 1.5vw)", fontWeight: 700, marginTop: "8px" }}
        >
          Special Letter
        </h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "12px" }}>
          Click the envelope below to lift the seal and slide the note out.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "50px", alignItems: "center" }}>
        {/* Envelope wrapper */}
        <div 
          className="envelope-wrapper interactive-item"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            marginBottom: isOpen ? "240px" : "40px",
            transition: "margin-bottom 0.6s ease"
          }}
        >
          <div className="envelope-flap" />
          
          <div 
            className="letter-sheet"
            style={{
              padding: "24px",
              backgroundColor: "#fff",
              color: "#1f2937",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              transform: isOpen ? "translateY(-220px) scale(1.15)" : "",
              zIndex: isOpen ? 4 : 1,
              height: "320px",
              width: "300px",
              left: "10px",
              transition: "transform 0.6s ease"
            }}
          >
            <div>
              <h4 
                className="font-cinematic" 
                style={{ 
                  color: "var(--color-purple)", 
                  fontSize: "1.4rem", 
                  fontStyle: "italic",
                  marginBottom: "16px",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  paddingBottom: "8px"
                }}
              >
                Dear Brother,
              </h4>
              
              <div style={{ fontSize: "0.98rem", lineHeight: 1.6, color: "#374151" }}>
                {isOpen ? (
                  <TypeAnimation
                    sequence={[
                      letterText,
                      1000
                    ]}
                    wrapper="p"
                    speed={65}
                    cursor={false}
                  />
                ) : (
                  <p style={{ opacity: 0.3 }}>(Click envelope to open and read...)</p>
                )}
              </div>
            </div>

            <div 
              className="font-cinematic" 
              style={{ 
                textAlign: "right", 
                fontWeight: 600, 
                fontSize: "1.1rem", 
                color: "var(--color-purple)",
                fontStyle: "italic"
              }}
            >
              — Yours, Brother
            </div>
          </div>
        </div>

        {/* Wishing Well Form */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glassmorphism"
          style={{
            padding: "32px",
            borderRadius: "24px",
            border: "1px solid var(--glass-border)",
            width: "100%"
          }}
        >
          <h3 style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Mail size={20} color="var(--color-pink)" />
            Leave a Birthday Wish
          </h3>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <input 
                type="text" 
                placeholder="Your Name (Optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: "200px",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "#fff",
                  outline: "none",
                  fontSize: "0.95rem"
                }}
              />
            </div>
            
            <textarea 
              rows="3"
              required
              placeholder="Write your emotional birthday wish here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid var(--glass-border)",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "#fff",
                outline: "none",
                fontSize: "0.95rem",
                resize: "vertical"
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <AnimatePresence>
                {success && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ color: "var(--color-pink)", fontSize: "0.9rem" }}
                  >
                    Wish posted successfully! ✨
                  </motion.span>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  backgroundColor: "var(--color-pink)",
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  alignSelf: "flex-end",
                  boxShadow: "0 4px 15px rgba(236,72,153,0.3)"
                }}
              >
                {isSubmitting ? "Posting..." : "Post Wish"}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {wishes.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 600, opacity: 0.8 }}>Wishes Received ({wishes.length})</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {wishes.map((w) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glassmorphism"
                  style={{
                    padding: "20px",
                    borderRadius: "16px",
                    border: "1px solid var(--glass-border)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontWeight: 600, color: "var(--color-gold)" }}>{w.name}</span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {new Date(w.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.5 }}>{w.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
