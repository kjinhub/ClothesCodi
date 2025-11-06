const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// ✨ description 요약 함수 추가
async function summarizeDescription(description) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // 가벼운 텍스트 모델 사용
        messages: [
          {
            role: "system",
            content:
              "You are a fashion assistant. Extract only the clothing-related details from the given description and summarize them briefly in English (5–12 words).",
          },
          {
            role: "user",
            content: description,
          },
        ],
      }),
    });

    const data = await res.json();
    const summary = data.choices?.[0]?.message?.content?.trim();
    console.log("🧩 요약된 프롬프트:", summary);
    return summary || description;
  } catch (err) {
    console.error("❌ 요약 실패:", err);
    return description; // 실패 시 원문 그대로 사용
  }
}

// 🎨 이미지 생성 함수
export async function generateOutfitImage(description) {
  try {
    // 1️⃣ 긴 문장 요약
    const summarized = await summarizeDescription(description);

    // 2️⃣ 이미지 생성 요청
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-2", // DALL·E 2 (또는 gpt-image-1 인증 후 변경)
        prompt: `A flat lay photo of ${summarized} arranged as an outfit set on a clean white background, fashion product photo style, high detail`,
        size: "512x512",
      }),
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.data?.[0]?.url || null;
  } catch (err) {
    console.error("❌ DALL·E 이미지 생성 실패:", err);
    return null;
  }
}
