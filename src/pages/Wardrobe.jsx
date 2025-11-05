import React, { useState } from "react";
import "../styles/Wardrobe.css";
import WardrobeGrid from "../components/WardrobeGrid";
import sampleData from "../data/sampleWardrobeData";

function Wardrobe() {
  const [clothes, setClothes] = useState(sampleData);

  const handleAddCloth = () => {
    const name = prompt("새 옷 이름을 입력하세요:");
    if (!name) return;
    const newItem = {
      id: Date.now(),
      name,
      type: "기타",
      color: "미지정",
      image: "https://via.placeholder.com/150",
    };
    setClothes([...clothes, newItem]);
  };

  return (
    <div className="wardrobe-container">
      <header className="wardrobe-header">
        <h1>내 옷장 👕</h1>
        <p>등록한 옷을 한눈에 확인하고 AI 추천에 활용하세요</p>
        <button className="add-btn" onClick={handleAddCloth}>
          + 새 옷 추가
        </button>
      </header>

      <WardrobeGrid items={clothes} />
    </div>
  );
}

export default Wardrobe;
