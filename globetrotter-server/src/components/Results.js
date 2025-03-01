import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    // Create confetti effect
    if (percentage > 70) {
      const confettiContainer = document.querySelector(".confetti");

      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti-piece";
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = `hsl(${
          Math.random() * 360
        }, 100%, 50%)`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
        confettiContainer.appendChild(confetti);
      }
    }
  }, [percentage]);

  const getFeedback = () => {
    if (percentage >= 90) return "Geography Expert!";
    if (percentage >= 70) return "Great Geography Knowledge!";
    if (percentage >= 50) return "Good Effort!";
    return "Keep Exploring the World!";
  };

  const playAgain = () => {
    navigate("/quiz");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="quiz-container">
      <div className="confetti"></div>

      <h1>Quiz Results</h1>

      <div style={{ padding: "20px" }}>
        <h2>{getFeedback()}</h2>

        <div
          style={{
            width: "200px",
            height: "200px",
            margin: "0 auto",
            borderRadius: "50%",
            background: `conic-gradient(#4169e1 ${percentage}%, #f0f0f0 0)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {percentage}%
          </div>
        </div>

        <h3>
          You got {score} out of {total} questions correct
        </h3>

        <div style={{ marginTop: "30px" }}>
          <button className="btn btn-primary" onClick={playAgain}>
            Play Again
          </button>
          <button className="btn" onClick={goHome}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
