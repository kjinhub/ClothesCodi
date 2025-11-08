import React, { useState } from "react";
import "../styles/Wardrobe.css";
import WardrobeGrid from "../components/WardrobeGrid";
import sampleData from "../data/sampleWardrobeData";

function Wardrobe() {
  const [clothes, setClothes] = useState(sampleData);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    type: "",
    color: "",
    image: null,
    preview: null,
  });

  // 이미지 파일 업로드 처리
  const handleImageChange = (file) => {
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setNewItem({ ...newItem, image: file, preview: previewURL });
    }
  };

  // 드래그 앤 드롭 처리
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageChange(file);
  };

  // 드래그 중 스타일 방지
  const handleDragOver = (e) => e.preventDefault();

  // 폼 제출
  const handleSubmit = () => {
    if (!newItem.name || !newItem.type || !newItem.color) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    const newCloth = {
      id: Date.now(),
      name: newItem.name,
      type: newItem.type,
      color: newItem.color,
      image: newItem.preview || "https://via.placeholder.com/150",
    };

    setClothes((prev) => [...prev, newCloth]);
    setShowForm(false);
    setNewItem({ name: "", type: "", color: "", image: null, preview: null });
  };

  return (
    <div className="wardrobe-container">
      <header className="wardrobe-header">
        <h1>내 옷장 👕</h1>
        <p>등록한 옷을 한눈에 확인하고 AI 추천에 활용하세요</p>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "취소" : "+ 새 옷 추가"}
        </button>
      </header>

      {/* ✅ 옷 등록 폼 */}
      {showForm && (
        <div
          className="add-cloth-form"
          onDrop={handleDrop}
          onDragOver={handleDragOver}>
          <h3>새 옷 등록</h3>

          <div className="form-row">
            <label>이름:</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="예: 흰색 반팔티"
            />
          </div>

          <div className="form-row">
            <label>종류:</label>
            <input
              type="text"
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
              placeholder="예: 상의, 하의, 아우터 등"
            />
          </div>

          <div className="form-row">
            <label>색상:</label>
            <input
              type="text"
              value={newItem.color}
              onChange={(e) =>
                setNewItem({ ...newItem, color: e.target.value })
              }
              placeholder="예: 베이지, 네이비, 블랙"
            />
          </div>

          {/* ✅ 이미지 업로드 / 드래그 앤 드롭 */}
          <div
            className="image-dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            {newItem.preview ? (
              <img
                src={newItem.preview}
                alt="preview"
                className="image-preview"
              />
            ) : (
              <p>이미지를 드래그하거나 클릭하여 업로드</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            등록하기
          </button>
        </div>
      )}

      <WardrobeGrid items={clothes} />
    </div>
  );
}

export default Wardrobe;
