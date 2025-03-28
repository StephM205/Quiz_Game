import React, { useEffect, useRef } from "react";
import audioFile from "../../public/videoplayback.m4a";

function AudioPlayer() {
  const audioRef = useRef(null);

  useEffect(() => {
    const enableAutoplay = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.04;
        audioRef.current
          .play()
          .then(() => console.log("Autoplay thành công!"))
          .catch(() => console.log("Autoplay bị chặn, chờ tương tác..."));
      }
    };

    enableAutoplay();
    document.addEventListener("click", enableAutoplay, { once: true });

    return () => {
      document.removeEventListener("click", enableAutoplay);
    };
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src={audioFile} type="audio/mpeg" />
      Trình duyệt của bạn không hỗ trợ audio.
    </audio>
  );
}

export default AudioPlayer;
