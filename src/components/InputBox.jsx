import React, { useState } from "react";
import "../styles/Components.css";
import { getAIRecommendation } from "../api/openaiService";
import { getWeatherInfo } from "../api/weatherService";
import sampleWardrobeData from "../data/sampleWardrobeData";

function InputBox({ onResult }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (text.trim() === "") return alert("일정을 입력해주세요.");
    setLoading(true);

    try {
      const weather = await getWeatherInfo();
      const aiResult = await getAIRecommendation(
        text,
        sampleWardrobeData,
        weather
      );
      onResult(aiResult.text);
    } catch (err) {
      console.error(err);
      onResult("⚠️ AI 추천 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="input-box">
      <textarea
        className="input-textarea"
        placeholder='예: "내일 저녁 홍대에서 데이트야"'
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "AI가 코디 추천 중..." : "AI 코디 추천 받기"}
      </button>
    </div>
  );
}

export default InputBox;
