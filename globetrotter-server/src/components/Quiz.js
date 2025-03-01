import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/questions");
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;

    setShowFeedback(true);
    setAnswered(answered + 1);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz finished
      navigate("/results", { state: { score, total: questions.length } });
    }
  };

  if (loading) {
    return <div className="quiz-container">Loading questions...</div>;
  }

  if (questions.length === 0) {
    return <div className="quiz-container">No questions available.</div>;
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <h1>Geography Quiz Challenge</h1>

      <div className="score-container">
        <div>
          <h3>
            Question {currentQuestion + 1} of {questions.length}
          </h3>
        </div>
        <div>
          <strong>
            Score: {score} correct, {answered - score} incorrect
          </strong>
        </div>
      </div>

      <div className="question-header">
        <h2>Where in the World?</h2>
      </div>

      <div>
        <h3>Clues:</h3>
        <ul style={{ textAlign: "left" }}>
          {question.clues.map((clue, index) => (
            <li key={index}>{clue}</li>
          ))}
        </ul>
      </div>

      <div className="options-grid">
        {question.options.map((option) => (
          <div
            key={option}
            className={`option ${selectedAnswer === option ? "selected" : ""} 
              ${
                showFeedback && option === question.correctAnswer
                  ? "correct"
                  : ""
              } 
              ${
                showFeedback &&
                selectedAnswer === option &&
                option !== question.correctAnswer
                  ? "incorrect"
                  : ""
              }`}
            onClick={() => handleAnswerSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>

      {showFeedback ? (
        <div className="feedback">
          {selectedAnswer === question.correctAnswer ? (
            <>
              <h3>Correct! 🎉</h3>
              <p>{question.funFact}</p>
            </>
          ) : (
            <>
              <h3>Incorrect!</h3>
              <p>The correct answer is {question.correctAnswer}.</p>
              <p>{question.funFact}</p>
            </>
          )}
          <button className="btn btn-primary" onClick={nextQuestion}>
            {currentQuestion < questions.length - 1
              ? "Next Question"
              : "See Results"}
          </button>
        </div>
      ) : (
        <button
          className="btn btn-primary"
          onClick={checkAnswer}
          disabled={selectedAnswer === null}
        >
          Submit Answer
        </button>
      )}
    </div>
  );
};

export default Quiz;
