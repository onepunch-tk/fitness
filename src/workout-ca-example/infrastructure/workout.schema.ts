/** 이 도메인이 소유하는 테이블. 앱 시작 시 initializeDatabase에 전달된다. */
export const WORKOUT_SCHEMA = `
  CREATE TABLE IF NOT EXISTS workouts (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    performed_at TEXT NOT NULL
  );
`;
