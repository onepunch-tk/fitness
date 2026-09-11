import { openDatabaseSync, type SQLiteDatabase } from 'expo-sqlite';

const DATABASE_NAME = 'fitness.db';

let database: SQLiteDatabase | null = null;

/** 앱 전체에서 하나의 커넥션을 공유한다. */
export function getDatabase(): SQLiteDatabase {
  if (!database) {
    database = openDatabaseSync(DATABASE_NAME);
  }
  return database;
}

/**
 * 각 도메인이 정의한 스키마 SQL을 순서대로 실행한다.
 * 앱 시작 시 루트 레이아웃에서 한 번만 호출한다.
 */
export async function initializeDatabase(
  schemas: readonly string[],
): Promise<void> {
  const db = getDatabase();
  for (const sql of schemas) {
    await db.execAsync(sql);
  }
}
