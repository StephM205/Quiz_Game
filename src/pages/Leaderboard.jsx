import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://gr8sdr-8080.csb.app/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        // Sắp xếp điểm số giảm dần
        const sortedScores = data.sort((a, b) => b.score - a.score);
        setScores(sortedScores);
      })
      .catch((error) => console.error("Lỗi tải bảng xếp hạng:", error));
  }, []);

  return (
    <div className="container-home1">
      <div className="container mt-5">
        <h2 className="text-center">Bảng Xếp Hạng</h2>

        {/* Bọc bảng bằng div để tạo thanh cuộn */}
        <div className="table-container">
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên</th>
                <th>Điểm</th>
                <th>Tổng câu hỏi</th>
              </tr>
            </thead>
            <tbody>
              {scores.slice(0, 10).map(
                (
                  entry,
                  index // Hiển thị tối đa 10 người
                ) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.name}</td>
                    <td>{entry.score}</td>
                    <td>{entry.totalQuestions}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/")}
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
