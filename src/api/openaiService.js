const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function getAIRecommendation(context, wardrobe, weather) {
  const prompt = `
당신은 패션 AI 스타일리스트입니다.
사용자 입력: ${context}
현재 날씨: ${weather?.temperature}도, ${weather?.condition}
보유 옷장: ${wardrobe.map((w) => w.name).join(", ")}
위 조건에 가장 잘 어울리는 코디를 제안하고,
추천 이유와 대체 아이템도 설명해주세요.
`;

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
  return { text: data.choices?.[0]?.message?.content || "추천 생성 실패" };
}
