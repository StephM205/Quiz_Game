import { useLocation, useNavigate } from "react-router-dom";

function WrongAnswers() {
  const location = useLocation();
  const navigate = useNavigate();
  const { wrongAnswers = [] } = location.state || {};

  return (
    <div className="container-home">
      <div className="container1 m-5">
        <h2>Câu hỏi sai</h2>
        {wrongAnswers.length > 0 ? (
          <div className="ulkt">
            <ul>
              {wrongAnswers.map((item, index) => (
                <li key={index}>
                  <strong>Câu hỏi {index + 1}:</strong>
                  <span className="ht" style={{ color: "red" }}>
                    Your Answer: {item.userAnswer}
                  </span>{" "}
                  <span style={{ color: " black" }}>{item.question}</span>
                  <br />
                  <span style={{ color: "green" }}>
                    Đáp án đúng: {item.correctAnswer}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Không có đáp án sai nào!</p>
        )}
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/")}
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
}

export default WrongAnswers;
