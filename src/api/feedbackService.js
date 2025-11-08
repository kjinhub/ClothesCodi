const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function getOutfitFeedback(outfitDescription) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
당신은 전문 패션 스타일리스트입니다. 
사용자에게 제공할 피드백은 반드시 한국어로 작성하세요.
결과는 간결하고 전문적으로 작성하되, 3~5문장 이내로 요약하세요.
형식은 아래 구조를 반드시 따르세요:

[총평]
(전체적인 인상, 조합의 분위기)

[장점]
(코디의 강점 1~2가지)

[개선점]
(보완할 수 있는 부분 1~2가지)
            `,
          },
          {
            role: "user",
            content: `이 코디를 평가해주세요: ${outfitDescription}`,
          },
        ],
      }),
    });

    const data = await res.json();

    if (data.error) {
      console.error("❌ OpenAI API Error:", data.error);
      return "⚠️ 피드백 생성 중 오류가 발생했습니다.";
    }

    return data.choices?.[0]?.message?.content?.trim() || "피드백 생성 실패";
  } catch (err) {
    console.error("❌ 피드백 요청 실패:", err);
    return "⚠️ 피드백 요청 실패";
  }
}
