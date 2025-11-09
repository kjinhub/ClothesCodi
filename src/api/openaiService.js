const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function getAIRecommendation(
  context,
  wardrobe,
  weather,
  personalColor
) {
  const prompt = `
당신은 사용자의 일정, 위치, 날씨 데이터를 바탕으로 코디를 제안하는 패션 AI 스타일리스트입니다.

입력 정보:
- 사용자의 일정: ${context}
- 사용자 위치: ${weather?.locationName || "사용자 위치 정보 미제공"}
- 현재 날씨: ${weather?.temperature}도, ${weather?.condition}
- 사용자의 옷장: ${wardrobe.map((w) => w.name).join(", ")}
${personalColor ? `- 퍼스널 컬러: ${personalColor}` : "- 퍼스널 컬러 정보 없음"}

요구사항:
1. 사용자가 언급한 날짜(예: 내일, 이번 주 토요일 등)에 맞춰 코디를 제안하되,
   현재 날씨 데이터를 기반으로 해당 날짜의 **예상 기온대를 수치(°C)** 로 제시하세요.
2. 결과 문장에는 반드시 다음을 포함하세요:
   - 지역명(${weather?.locationName || "해당 지역"})
   - 실제 기온 (${weather?.temperature}°C)
   - 날씨 상태 (${weather?.condition})
3. 날씨 수치(기온)와 상태를 코디의 구체적 근거로 제시하세요.
   (예: "23도 정도로 따뜻하기 때문에 얇은 셔츠가 적합합니다.")
4. ${
    personalColor
      ? `퍼스널 컬러(${personalColor})에 어울리는 색상 조합을 반영하세요.`
      : ""
  }
5. 추천 이유를 2~3줄로 제시하고, 대체 가능한 아이템도 함께 언급하세요.
6. 결과는 자연스럽고 짧은 한국어 문장으로 표현하되, 
   수치는 반드시 포함하여 사용자에게 신뢰감을 줄 수 있게 작성하세요.
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
