# 👕 Codi AI — 당신의 TPO를 위한 AI 스타일리스트

> **Codi AI**는 사용자의 옷장 데이터, 날씨, 시간·장소·상황(TPO)을 분석해  
> AI가 맞춤형 코디를 추천해주는 서비스입니다.  
> “오늘 뭐 입지?”를 더 이상 고민하지 마세요.

---
```
## 🚀 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | Codi AI |
| **주요 기술** | React (Vite) + CSS + OpenAI API + 기상청 단기예보 API |
| **핵심 기능** | 가상 옷장 관리 / AI TPO 코디 추천 / 실시간 날씨 연동 |
| **목적** | 대학생 대상 실생활형 AI 스타일 추천 서비스 |
```
---

## 🧩 주요 기능

### 🧠 1. AI 코디 추천
- OpenAI API(`gpt-4o-mini`) 기반으로 사용자 입력 + 날씨 + 옷장 정보 분석  
- 상황, 장소, 시간대별 맞춤형 코디 제안 및 대체 아이템 추천  

### ☁️ 2. 실시간 날씨 연동
- 공공데이터포털 기상청 단기예보 API(`VilageFcstInfoService_2.0`) 사용  
- 위치 기반 실시간 기온 및 하늘상태 반영  

### 👕 3. 가상 옷장 관리
- 사용자 로컬 저장소(LocalStorage)에 옷 데이터 저장  
- UI 상에서 등록 / 수정 / 확인 가능  

---

```
## 🛠️ 기술 스택
| 구분 | 기술 |
|------|------|
| **Frontend** | React + Vite + Vanilla CSS |
| **State Management** | useState / useEffect |
| **AI API** | OpenAI GPT (gpt-4o-mini) |
| **Weather API** | 기상청 단기예보 API |
| **Data Storage** | LocalStorage (임시 DB 대체) |
```
---

## ⚙️ 설치 및 실행

### 1️⃣ 의존성 설치

npm install


2️⃣ 환경변수 파일 생성
루트 디렉토리에 .env 파일을 만들고 다음 내용 추가:
# 🔒 OpenAI API Key (GPT)
VITE_OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

# 🌤️ 기상청 날씨 API Key (Encoding Key 사용)
⚠️ 반드시 .env 파일은 package.json과 같은 경로에 위치해야 하며,
파일 이름이 .env 그대로여야 합니다.

3️⃣ 개발 서버 실행

npm run dev

```
✅ 정상 작동 시 콘솔 로그 예시
✅ Loaded Weather API Key: Epjz2FhnLbeUYver5...
✅ Weather: { temperature: 17, condition: "맑음" }
✅ AI Result: "흰색 셔츠 + 슬랙스 + 청자켓을 추천합니다..."
```
🗂️ 폴더 구조

```
codi-ai/
├── .env
├── package.json
├── vite.config.js
├── src/
│   ├── api/
│   │   ├── openaiService.js
│   │   └── weatherService.js
│   ├── components/
│   │   ├── InputBox.jsx
│   │   ├── RecommendationBox.jsx
│   │   ├── Navbar.jsx
│   │   ├── WardrobeGrid.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── sampleWardrobeData.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Wardrobe.jsx
│   │   └── NotFound.jsx
│   ├── styles/
│   │   ├── App.css
│   │   ├── Components.css
│   │   ├── Home.css
│   │   └── Wardrobe.css
│   ├── App.jsx
│   └── main.jsx
```
📦 주요 환경 변수
이름	설명	예시
VITE_OPENAI_API_KEY	OpenAI GPT API 키	sk-...
VITE_WEATHER_API_KEY	기상청 Encoding Key	Epjz2FhnLbeUY...

🧠 개발자 참고
.env는 반드시 Git에 업로드하지 않도록 .gitignore에 추가해야 합니다.

실제 서비스 배포 시에는 API 요청을 서버(백엔드) 를 통해 프록시하는 것이 안전합니다.

🏁 프로젝트 목표
“Codi AI는 단순한 옷 추천 서비스가 아니라,
나의 옷장과 나의 하루를 이해하는 AI 스타일리스트입니다.”
