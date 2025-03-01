import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="quiz-container">
      <h1>Geography Quiz Challenge</h1>
      <div style={{ padding: "20px" }}>
        <h2>Test your knowledge of world geography!</h2>
        <p>
          You'll be presented with clues about various cities around the world.
          Can you guess them all correctly?
        </p>
        <button className="btn btn-primary" onClick={startQuiz}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
