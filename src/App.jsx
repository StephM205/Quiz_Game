import { Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import WrongAnswers from "./pages/WrongAnswers";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard"; // Import bảng xếp hạng
import AudioPlayer from "./components/Sound";

function App() {
  return (
    <>
      <AudioPlayer></AudioPlayer>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/wrong-answers" element={<WrongAnswers />} />
        <Route path="/leaderboard" element={<Leaderboard />} />{" "}
        {/* Bảng xếp hạng */}
      </Routes>
    </>
  );
}

export default App;
