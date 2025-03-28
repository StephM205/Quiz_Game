import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Question from "../components/Question";
import ("../App.css");

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Lỗi tải câu hỏi:", error));
  }, []);

  useEffect(() => {
    if (quizFinished) {
      navigate("/result", {
        state: { score, totalQuestions: questions.length, wrongAnswers },
      });
    }
  }, [quizFinished, navigate, questions.length, score, wrongAnswers]);

  const handleAnswer = (isCorrect, selectedAnswer) => {
    if (questions.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];

    if (!isCorrect) {
      setWrongAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          correctAnswer: currentQuestion.answers.find((ans) => ans.correct)
            .text,
          userAnswer: selectedAnswer,
        },
      ]);
    } else {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setQuizFinished(true);
  };

  return (
    <div className="container-home" >
    <div className="quiz-container " >
      {questions.length > 0 ? (
        <>
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
          <div className="button-container">
            <button  className="quiz-button" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
              Quay lại
            </button>
            <button
                className="quiz-button"
              onClick={handleNext}
              disabled={currentQuestionIndex + 1 >= questions.length}
  
            >
              Tiếp theo
            </button>
            <button
              onClick={handleSubmit}
              className="quiz-button submit-button"
            >
              Nộp bài
            </button>
          </div>
        </>
      ) : (
        <p className="loading-text">Đang tải câu hỏi...</p>
      )}
    </div>
    </div>
  );
}

export default Quiz;
