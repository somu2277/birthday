import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import confetti from "canvas-confetti";

// EDITABLE QUIZ QUESTIONS ARRAY
// You can easily change questions, choices, or correct answers here.
const quizQuestions = [
  {
    id: 1,
    question: "Who is my favourite football player?",
    options: ["Ronaldo", "Neymar", "Messi", "Mbappe"],
    correctIndex: 2 // Messi
  },
  {
    id: 2,
    question: "What festival do we celebrate as brother and sister every year?",
    options: ["Diwali", "Raksha Bandhan", "Holi", "Pongal"],
    correctIndex: 1 // Raksha Bandhan
  },
  {
    id: 3,
    question: "Which color do you think suits me the most?",
    options: ["Blue", "Black", "White", "Gold"],
    correctIndex: 0 // Blue (Customizable)
  },
  {
    id: 4,
    question: "Which gift would make me happiest?",
    options: ["Chocolate", "Flowers", "Time together", "Money"],
    correctIndex: 2 // Time together
  },
  {
    id: 5,
    question: "What should you always remember?",
    options: ["Family comes first", "Sleep all day", "Skip birthdays", "Forget memories"],
    correctIndex: 0 // Family comes first
  }
];

export default function PuzzlePage() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Stores { questionIndex: selectedOptionIndex }
  const [submittedAnswers, setSubmittedAnswers] = useState({}); // Stores { questionIndex: boolean_is_submitted }
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [feedback, setFeedback] = useState(""); // "correct", "wrong", or ""

  const currentQuestion = quizQuestions[currentIndex];
  const totalQuestions = quizQuestions.length;

  const handleOptionSelect = (optionIdx) => {
    if (submittedAnswers[currentIndex]) return; // Cannot change after submitting

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIdx
    }));

    // Reset feedback on new selection
    setFeedback("");
  };

  const handleSubmitAnswer = () => {
    const selected = selectedAnswers[currentIndex];
    if (selected === undefined) return;

    const isCorrect = selected === currentQuestion.correctIndex;
    
    // Set submission status
    setSubmittedAnswers((prev) => ({
      ...prev,
      [currentIndex]: true
    }));

    if (isCorrect) {
      setFeedback("correct");
      setScore((prev) => prev + 1);
    } else {
      setFeedback("wrong");
    }
  };

  const handleNext = () => {
    setFeedback("");
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished
      setQuizFinished(true);
      confetti({
        particleCount: 120,
        spread: 70,
        colors: ["#F5C542", "#3B82F6"]
      });
    }
  };

  const handlePrevious = () => {
    setFeedback("");
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div 
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "90px 24px 60px",
        color: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center",
        position: "relative"
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "24px", zIndex: 10 }}>
        <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#F5C542", fontWeight: 600 }}>
          CHALLENGE LEVEL
        </span>
        <h2 
          className="font-cinematic text-gradient-gold text-glow"
          style={{ fontSize: "2rem", fontWeight: 700, marginTop: "8px" }}
        >
          Birthday Quiz
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glassmorphism"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "24px",
              borderRadius: "20px",
              border: "1.5px solid var(--glass-border)",
              boxShadow: "var(--glass-shadow)",
              zIndex: 10,
              position: "relative"
            }}
          >
            {/* Progress Header */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
              <span>Question {currentIndex + 1} of {totalQuestions}</span>
              <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>Score: {score}</span>
            </div>

            {/* Progress Bar */}
            <div style={{ width: "100%", height: "6px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "99px", overflow: "hidden", marginBottom: "24px" }}>
              <div 
                style={{ 
                  width: `${((currentIndex + 1) / totalQuestions) * 100}%`, 
                  height: "100%", 
                  backgroundColor: "var(--color-gold)", 
                  transition: "width 0.3s ease-out" 
                }} 
              />
            </div>

            {/* Question Text */}
            <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "20px", lineHeight: "1.5" }}>
              {currentQuestion.question}
            </h3>

            {/* Options list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentIndex] === idx;
                const isSubmitted = submittedAnswers[currentIndex];
                const isCorrect = idx === currentQuestion.correctIndex;

                let optionBg = "rgba(255,255,255,0.03)";
                let optionBorder = "rgba(255,255,255,0.08)";

                if (isSelected) {
                  optionBg = "rgba(245,197,66,0.1)";
                  optionBorder = "var(--color-gold)";
                }

                if (isSubmitted) {
                  if (isCorrect) {
                    optionBg = "rgba(16,185,129,0.15)";
                    optionBorder = "#10b981";
                  } else if (isSelected) {
                    optionBg = "rgba(239,68,68,0.15)";
                    optionBorder = "#ef4444";
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    whileHover={!isSubmitted ? { scale: 1.01 } : {}}
                    whileTap={!isSubmitted ? { scale: 0.99 } : {}}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "14px 20px",
                      borderRadius: "12px",
                      backgroundColor: optionBg,
                      border: `1.5px solid ${optionBorder}`,
                      color: "#F8FAFC",
                      textAlign: "left",
                      cursor: isSubmitted ? "default" : "pointer",
                      fontSize: "0.95rem",
                      fontWeight: isSelected ? 600 : 500,
                      transition: "background-color 0.2s, border-color 0.2s"
                    }}
                  >
                    <span>{option}</span>
                    {isSubmitted && isCorrect && <Check size={18} color="#10b981" />}
                    {isSubmitted && isSelected && !isCorrect && <X size={18} color="#ef4444" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Answer feedback status */}
            {feedback !== "" && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: feedback === "correct" ? "#10b981" : "#ef4444",
                  marginBottom: "20px"
                }}
              >
                {feedback === "correct" ? "✨ Correct!" : "❌ Try Again!"}
              </motion.div>
            )}

            {/* Action Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "transparent",
                  border: "none",
                  color: currentIndex === 0 ? "rgba(255,255,255,0.2)" : "#F8FAFC",
                  cursor: currentIndex === 0 ? "default" : "pointer",
                  fontSize: "0.88rem",
                  fontWeight: 600
                }}
              >
                <ArrowLeft size={16} />
                Previous
              </button>

              {/* Submit / Next Button */}
              {!submittedAnswers[currentIndex] ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswers[currentIndex] === undefined}
                  className="premium-btn"
                  style={{
                    padding: "10px 24px",
                    fontSize: "0.9rem",
                    opacity: selectedAnswers[currentIndex] === undefined ? 0.5 : 1,
                    cursor: selectedAnswers[currentIndex] === undefined ? "default" : "pointer"
                  }}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="premium-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "10px 24px",
                    fontSize: "0.9rem",
                    background: "linear-gradient(135deg, #F5C542, #b88a14)",
                    color: "#050816"
                  }}
                >
                  {currentIndex === totalQuestions - 1 ? "Finish" : "Next"}
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="finished-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glassmorphism"
            style={{
              width: "100%",
              maxWidth: "480px",
              padding: "32px",
              borderRadius: "20px",
              border: "1.5px solid var(--glass-border)",
              boxShadow: "var(--glass-shadow)",
              textAlign: "center",
              zIndex: 10
            }}
          >
            <Trophy size={50} color="var(--color-gold)" style={{ margin: "0 auto 16px" }} className="animate-float" />
            
            <h3 
              className="font-cinematic text-gradient-gold text-glow" 
              style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "12px" }}
            >
              🎉 Congratulations!
            </h3>
            
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "20px" }}>
              You completed the Birthday Challenge!
            </p>

            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--color-gold)", marginBottom: "32px" }}>
              Your Score: {score} / {totalQuestions}
            </div>

            <button
              onClick={() => navigate("/memories")}
              className="premium-btn interactive-item"
              style={{
                padding: "12px 30px",
                fontSize: "1rem"
              }}
            >
              📸 Open Our Memories
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
