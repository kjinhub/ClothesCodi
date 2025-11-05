import React from "react";
import "../styles/Components.css";

function SuggestionBox() {
  const examples = [
    "내일 저녁 홍대에서 데이트",
    "이번 주 토요일 도서관 공부 후 친구 만나러 갈 거야",
    "금요일 점심 교수님과 면담",
    "주말에 카페에서 친구들과 브런치",
  ];

  return (
    <div className="suggestion-box">
      <h4>💡 이런 식으로 입력해보세요</h4>
      <div className="suggestion-list">
        {examples.map((text, idx) => (
          <div className="suggestion-item" key={idx}>
            “{text}”
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestionBox;
