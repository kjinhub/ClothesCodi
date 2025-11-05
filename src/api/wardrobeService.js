// wardrobeService.js
// 로컬 저장소 기반 mock 데이터 관리

const STORAGE_KEY = "codi_wardrobe";

export function getWardrobe() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveWardrobe(wardrobe) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wardrobe));
}

export function addCloth(item) {
  const current = getWardrobe();
  const updated = [...current, item];
  saveWardrobe(updated);
  return updated;
}
