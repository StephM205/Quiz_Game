import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (name.trim()) {
      localStorage.setItem("playerName", name);
      navigate("/quiz");
    } else {
      alert("Please enter your name!");
    }
  };

  return (
    <div className="container-home">
      <div className="row">
        <h1 style={{ textAlign: "center" }}>Quiz Ôn Chính Trị</h1>
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Nhập tên của bạn!"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btnt btn-primary mt-3" onClick={handleStartQuiz}>
          Bắt Đầu
        </button>
      </div>
      <div className="row1">
        <div className="text1">
          <h5>Giới thiệu:</h5>
          <ul>
            <li>
              Ôn Chính Trị là một phần của trò chơi, giúp người chơi củng cố
              kiến thức về chính trị, pháp luật và xã hội.
            </li>
            <li>
              Các câu hỏi trong phần này tập trung vào Hiến pháp, hệ thống chính
              trị, các tổ chức nhà nước và các sự kiện chính trị quan trọng.
            </li>
            <li>
              Đây là cơ hội để người chơi nâng cao hiểu biết về quyền công dân,
              nghĩa vụ pháp lý và các chính sách quan trọng.
            </li>
            <li>
              Hãy tham gia thử thách để kiểm tra kiến thức của bạn về môn học
              này!.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
