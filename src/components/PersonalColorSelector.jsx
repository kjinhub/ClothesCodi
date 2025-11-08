import React, { useState } from "react";
import "../styles/Components.css";

function PersonalColorSelector({ personalColor, setPersonalColor }) {
  // 한글 ↔ 영어 매핑
  const colorOptions = [
    {
      label: "봄웜 (Spring Warm)",
      value: "봄웜",
      aliases: ["spring", "spring warm", "warm spring"],
    },
    {
      label: "여름쿨 (Summer Cool)",
      value: "여름쿨",
      aliases: ["summer", "cool summer", "summer cool"],
    },
    {
      label: "가을웜 (Autumn Warm)",
      value: "가을웜",
      aliases: ["autumn", "fall", "warm autumn", "fall warm"],
    },
    {
      label: "겨울쿨 (Winter Cool)",
      value: "겨울쿨",
      aliases: ["winter", "cool winter", "winter cool"],
    },
  ];

  const [input, setInput] = useState(personalColor || "");

  // 입력값이 영어든 한글이든 자동 인식
  const handleInputChange = (value) => {
    setInput(value);
    const lower = value.toLowerCase();

    const matched = colorOptions.find(
      (c) =>
        c.value === value ||
        c.label.includes(value) ||
        c.aliases.some((alias) => lower.includes(alias))
    );

    if (matched) {
      setPersonalColor(matched.value);
    } else if (value === "") {
      setPersonalColor("");
    }
  };

  return (
    <div className="personal-color-selector">
      <label htmlFor="colorInput">Personal Color / 퍼스널 컬러 선택:</label>
      <input
        id="colorInput"
        type="text"
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder='예: "봄웜" or "spring warm"'
        list="color-options"
        className="color-input"
      />
      <datalist id="color-options">
        {colorOptions.map((c) => (
          <option key={c.value} value={c.label} />
        ))}
      </datalist>
    </div>
  );
}

export default PersonalColorSelector;
