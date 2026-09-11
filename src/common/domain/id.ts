export type Id = string;

/** 토이 프로젝트용 간단한 ID 생성기. 필요해지면 expo-crypto의 randomUUID로 교체한다. */
export function generateId(): Id {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
