import React from "react";

function Question({ question, onAnswer }) {
  if (!question || !Array.isArray(question.answers)) {
    return <p>Loading question...</p>;
  }

  return (
    <div className="question-container">
      <div className="kth-text">
      <h2>{question.question}</h2>
      </div>
    
      <div className="kth">
      {question.answers.map((ans, index) => (
        <button
          key={index}
          className="btn btn-primary answer-btn"
          onClick={() => onAnswer(ans.correct)}
        >
          {ans.text}
        </button>
      ))}
    </div>
    </div>
  );
}

export default Question;
