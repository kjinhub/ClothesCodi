import React from "react";
import "../styles/Components.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        © 2025 Codi AI — 당신의 TPO를 위한 AI 스타일리스트 |
        <a href="https://openai.com" target="_blank" rel="noreferrer">
          OpenAI API
        </a>{" "}
        +{" "}
        <a href="https://data.go.kr" target="_blank" rel="noreferrer">
          기상청 데이터포털
        </a>
      </p>
      <p className="footer-sub">Made with ❤️ by your university project team</p>
    </footer>
  );
}

export default Footer;
