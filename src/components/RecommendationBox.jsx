import React from "react";
import "../styles/Components.css";

function RecommendationBox({ result }) {
  if (!result) return null;

  return (
    <div className="recommend-box">
      <h3>👗 AI 추천 코디 결과</h3>
      <div className="recommend-content">
        {result.split("\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default RecommendationBox;
