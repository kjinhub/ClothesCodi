// src/api/openaiService.js
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

/**
 * 사용자 입력(상황), 옷장, 날씨, 퍼스널 컬러를 종합해 코디를 추천하는 함수
 * @param {string} context - 사용자의 자연어 입력 (ex: "내일 저녁 홍대 데이트야")
 * @param {Array} wardrobe - 보유 옷장 데이터 (name, type, color 등)
 * @param {Object} weather - 날씨 데이터 (temperature, condition)
 * @param {string} personalColor - 선택된 퍼스널 컬러 (봄웜 / 여름쿨 / 가을웜 / 겨울쿨)
 * @returns {Promise<{text: string}>} - AI가 생성한 코디 추천 결과
 */
export async function getAIRecommendation(
  context,
  wardrobe,
  weather,
  personalColor
) {
  // 🧠 AI에게 보낼 프롬프트 구성
  const prompt = `
당신은 패션 AI 스타일리스트입니다.

사용자 입력: ${context}
현재 날씨: ${weather?.temperature}도, ${weather?.condition}
보유 옷장: ${wardrobe.map((w) => w.name).join(", ")}

${
  personalColor
    ? `사용자의 퍼스널 컬러: ${personalColor}`
    : "퍼스널 컬러 정보 없음"
}

요구사항:
1. 사용자의 일정과 날씨를 고려하여 최적의 코디를 제안하세요.
2. ${
    personalColor
      ? `퍼스널 컬러(${personalColor})에 어울리는 색상 조합을 반영하세요.`
      : ""
  }
3. 추천 이유를 2~3줄로 설명하고, 대체 가능한 아이템도 함께 제시하세요.
4. 결과는 자연스럽고 짧은 한국어 문장으로 표현하세요.
`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();

    // 예외 처리
    if (data.error) {
      console.error("❌ OpenAI API Error:", data.error);
      return { text: "⚠️ AI 추천 중 오류가 발생했습니다." };
    }

    return {
      text: data.choices?.[0]?.message?.content?.trim() || "추천 생성 실패",
    };
  } catch (err) {
    console.error("❌ AI 추천 요청 실패:", err);
    return { text: "⚠️ AI 추천 요청 실패" };
  }
}
