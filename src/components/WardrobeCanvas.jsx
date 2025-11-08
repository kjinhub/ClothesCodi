import React, { useState } from "react";
import "../styles/Wardrobe.css";
import { getOutfitFeedback } from "../api/feedbackService";

function WardrobeCanvas({ wardrobe }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false); // ✅ 추가

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("item"));
    if (selectedItems.find((i) => i.id === item.id)) return;
    setSelectedItems((prev) => [...prev, item]);
  };

  const handleRemoveItem = (id) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ AI 피드백 요청
  const handleFeedback = async () => {
    if (selectedItems.length === 0) {
      alert("코디 아이템을 먼저 선택해주세요.");
      return;
    }

    setLoading(true); // 로딩 시작
    setFeedback(""); // 이전 결과 초기화

    try {
      const outfitDescription = selectedItems.map((i) => i.name).join(", ");
      const result = await getOutfitFeedback(outfitDescription);
      setFeedback(result);
    } catch (err) {
      console.error(err);
      setFeedback("⚠️ 피드백 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="wardrobe-canvas-container">
      <div className="wardrobe-list">
        <h3>내 옷장</h3>
        <div className="wardrobe-items">
          {wardrobe.map((item) => (
            <div
              key={item.id}
              className="wardrobe-item"
              draggable
              onDragStart={(e) => handleDragStart(e, item)}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="wardrobe-canvas"
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
        <h3>나만의 코디 조합</h3>
        {selectedItems.length === 0 && (
          <p className="placeholder">👕 드래그해서 옷을 추가하세요</p>
        )}
        <div className="selected-items">
          {selectedItems.map((item) => (
            <div key={item.id} className="canvas-item">
              <div className="canvas-item-inner">
                <img src={item.image} alt={item.name} />
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.id)}>
                  ✕
                </button>
              </div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ 로딩 중이면 버튼 비활성화 + 텍스트 변경 */}
      <button
        className="feedback-btn"
        onClick={handleFeedback}
        disabled={loading}>
        {loading ? "피드백 생성 중..." : "AI 피드백 받기"}
      </button>

      {/* ✅ 로딩 표시 */}
      {loading && (
        <p className="loading-text">🤖 AI가 코디를 분석 중입니다...</p>
      )}

      {feedback && <div className="feedback-box">{feedback}</div>}
    </div>
  );
}

export default WardrobeCanvas;
