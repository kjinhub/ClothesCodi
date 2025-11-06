import React, { useState } from "react";
import { generateOutfitImage } from "../api/imageService";
import "../styles/Components.css";

function OutfitPreview({ outfitText }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!outfitText) return alert("추천 코디를 먼저 받아보세요!");
    setLoading(true);
    const url = await generateOutfitImage(outfitText);
    setImgUrl(url);
    setLoading(false);
  };

  return (
    <div className="outfit-preview">
      <button
        className="submit-btn"
        onClick={handleGenerate}
        disabled={loading}>
        {loading ? "AI 이미지 생성 중..." : "AI 이미지로 코디 보기"}
      </button>

      {imgUrl && (
        <div className="outfit-image-box">
          <img src={imgUrl} alt="AI Outfit" className="outfit-image" />
        </div>
      )}
    </div>
  );
}

export default OutfitPreview;
