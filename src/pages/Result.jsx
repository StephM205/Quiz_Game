import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import("../App.css");

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const playerName = localStorage.getItem("playerName") || "Anonymous";
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbackId, setFeedbackId] = useState(null);
  const [hover, setHover] = useState(0); // Trạng thái hover

  useEffect(() => {
    if (state) {
      setScore(state.score);

      // Lưu điểm vào JSON Server
      fetch("http://localhost:5000/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: playerName,
          score: state.score,
          totalQuestions: state.totalQuestions,
        }),
      });
    }
  }, [state, playerName]);

  useEffect(() => {
    // Kiểm tra xem người chơi đã đánh giá chưa
    fetch(`http://localhost:5000/feedback?player=${playerName}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setFeedbackId(data[0].id);
          setRating(data[0].rating);
          setComment(data[0].comment);
        }
      });
  }, [playerName]);

  const handlePlayAgain = () => {
    setShowFeedback(true);
  };

  const handleSubmitFeedback = () => {
    if (rating > 0) {
      const feedbackData = {
        player: playerName,
        rating,
        comment,
      };

      const url = feedbackId
        ? `http://localhost:5000/feedback/${feedbackId}`
        : "http://localhost:5000/feedback";
      const method = feedbackId ? "PUT" : "POST";

      fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      }).then(() => {
        setShowFeedback(false);
        navigate("/");
      });
    } else {
      alert("Vui lòng chọn ít nhất 1 sao trước khi gửi đánh giá!");
    }
  };

  return (
    <div className="container-home">
      <div className="result-container mt-5">
        <h2 className="quiz-title">Quiz Completed!</h2>
        <p className="quiz-score">
          Điểm của bạn: {score} / {state?.totalQuestions || 0}
        </p>

        <div className="quiz-buttons">
          <button
            className="quiz-button quiz-button--primary"
            onClick={() => navigate("/")}
          >
            Quay về trang chủ
          </button>
          <button
            className="quiz-button quiz-button--primary"
            onClick={handlePlayAgain}
          >
            Đánh giá
          </button>
          <button
            className="quiz-button quiz-button--secondary"
            onClick={() => navigate("/leaderboard")}
          >
            Bảng xếp hạng
          </button>
          <button
            className="quiz-button quiz-button--danger"
            onClick={() =>
              navigate("/wrong-answers", {
                state: { wrongAnswers: state?.wrongAnswers || [] },
              })
            }
          >
            Câu sai
          </button>
        </div>

        {showFeedback && (
          <div className="quiz-modal">
            <div className="quiz-modal__header">Đánh giá</div>

            <div className="quiz-modal__rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`quiz-modal__star ${
                    (hover || rating) >= star
                      ? "text-warning"
                      : "text-secondary"
                  }`}
                  onClick={() => setRating(star)} // Cập nhật khi click
                  onMouseEnter={() => setHover(star)} // Cập nhật khi hover
                  onMouseLeave={() => setHover(0)} // Trở lại giá trị đã chọn khi hết hover
                  style={{ cursor: "pointer", fontSize: "32px", margin: "2px" }}
                >
                  <i className="bi bi-star-fill"></i>
                </span>
              ))}
            </div>

            <textarea
              className="quiz-modal__comment"
              placeholder="Leave a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <div className="quiz-modal__buttons">
              <button
                className="quiz-modal__button quiz-modal__button--submit"
                onClick={handleSubmitFeedback}
              >
                Gửi
              </button>
              <button
                className="quiz-modal__button quiz-modal__button--cancel"
                onClick={() => setShowFeedback(false)}
              >
                Quay lại
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
