import React, { useState } from "react";
import "../styles/Home.css";
import InputBox from "../components/InputBox";
import FeatureCard from "../components/FeatureCard";
import SuggestionBox from "../components/SuggestionBox";
import RecommendationBox from "../components/RecommendationBox";
import OutfitPreview from "../components/OutfitPreview";
function Home() {
  const [result, setResult] = useState("");

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Codi AI</h1>
        <p>당신의 TPO를 위한 AI 스타일리스트</p>
        <p className="sub">
          가진 옷으로 완벽한 코디를 만들어보세요.
          <br />
          AI가 날씨, 장소, 상황을 고려해 맞춤형 스타일을 제안합니다.
        </p>
      </header>

      <section className="home-input-section">
        <h2>오늘 어떤 일정이 있으신가요?</h2>
        <InputBox onResult={setResult} />
        <RecommendationBox result={result} />
        <SuggestionBox />
      </section>

      <section className="home-features">
        <FeatureCard
          title="가상 옷장 관리"
          desc="내 옷을 등록하고 체계적으로 관리하세요"
        />
        <FeatureCard
          title="AI 맞춤 추천"
          desc="상황에 맞는 완벽한 코디를 추천받으세요"
        />
        <FeatureCard
          title="TPO 분석"
          desc="시간, 장소, 상황을 고려한 스타일링"
        />
      </section>

      <section className="home-input-section">
        <h2>AI가 당신의 스타일을 코디해 드릴께요!</h2>
        <OutfitPreview outfitText={result} /> {/* 추가 */}
      </section>
    </div>
  );
}

export default Home;
