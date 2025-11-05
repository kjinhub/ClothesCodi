const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL =
  "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";

// 서울 기준 (중구: nx=60, ny=127)
export async function getWeatherInfo(nx = 60, ny = 127) {
  console.log("✅ Loaded API KEY:", import.meta.env.VITE_WEATHER_API_KEY);

  const now = new Date();
  const baseDate = now.toISOString().slice(0, 10).replace(/-/g, "");
  const baseTime = "1400";

  const url = `${BASE_URL}?serviceKey=${WEATHER_API_KEY}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

  const res = await fetch(url);
  const data = await res.json();
  const items = data.response?.body?.items?.item || [];

  const T1H = items.find((i) => i.category === "T1H"); // 기온
  const SKY = items.find((i) => i.category === "SKY"); // 하늘상태

  let condition = "맑음";
  if (SKY?.fcstValue === "3") condition = "구름 많음";
  else if (SKY?.fcstValue === "4") condition = "흐림";

  return {
    temperature: T1H?.fcstValue || 20,
    condition,
  };
}
