const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// ✅ 위경도 → 기상청 격자좌표 변환
function dfs_xy_conv(lat, lon) {
  const RE = 6371.00877; // 지구 반경(km)
  const GRID = 5.0; // 격자 간격(km)
  const SLAT1 = 30.0;
  const SLAT2 = 60.0;
  const OLON = 126.0;
  const OLAT = 38.0;
  const XO = 43;
  const YO = 136;

  const DEGRAD = Math.PI / 180.0;
  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  let theta = lon * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  const x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  const y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  return { nx: x, ny: y };
}

// ✅ 실제 데이터가 존재하는 시간대 계산
function getValidBaseDateTime() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hour = now.getHours();

  const validHours = [2, 5, 8, 11, 14, 17, 20, 23];
  let baseHour = validHours.reverse().find((h) => hour >= h);
  if (baseHour === undefined) {
    // 새벽 0~1시 → 전날 23시 데이터
    const prev = new Date(now);
    prev.setDate(now.getDate() - 1);
    const prevY = prev.getFullYear();
    const prevM = String(prev.getMonth() + 1).padStart(2, "0");
    const prevD = String(prev.getDate()).padStart(2, "0");
    return { base_date: `${prevY}${prevM}${prevD}`, base_time: "2300" };
  }

  return {
    base_date: `${yyyy}${mm}${dd}`,
    base_time: String(baseHour).padStart(2, "0") + "00",
  };
}

// ✅ 사용자 위치 기반 날씨 정보 요청
export async function getWeatherInfo() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("❌ 브라우저가 위치 정보를 지원하지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const { nx, ny } = dfs_xy_conv(latitude, longitude);
        const { base_date, base_time } = getValidBaseDateTime();

        const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&numOfRows=100&pageNo=1&dataType=JSON&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`;

        try {
          const res = await fetch(url);
          const data = await res.json();
          const items = data.response?.body?.items?.item || [];

          if (items.length === 0) {
            reject("⚠️ 날씨 데이터를 불러오지 못했습니다.");
            return;
          }

          const T1H = items.find((i) => i.category === "T1H"); // 기온
          const SKY = items.find((i) => i.category === "SKY"); // 하늘상태
          const PTY = items.find((i) => i.category === "PTY"); // 강수형태

          let condition = "맑음";
          if (PTY?.fcstValue !== "0") condition = "비";
          else if (SKY?.fcstValue === "3") condition = "구름 많음";
          else if (SKY?.fcstValue === "4") condition = "흐림";

          resolve({
            temperature: T1H?.fcstValue || "정보 없음",
            condition,
            base_date,
            base_time,
            nx,
            ny,
          });
        } catch (err) {
          console.error("❌ 날씨 API 오류:", err);
          reject("⚠️ 날씨 정보를 가져오는 중 오류가 발생했습니다.");
        }
      },
      (err) => {
        console.error("❌ 위치 접근 실패:", err);
        reject("❌ 위치 권한이 거부되었습니다. 브라우저 설정을 확인하세요.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}
