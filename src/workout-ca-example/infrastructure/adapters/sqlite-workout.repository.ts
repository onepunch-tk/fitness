import type { SQLiteDatabase } from 'expo-sqlite';
import type { WorkoutRepository } from '@/workout-ca-example/application/ports/workout.repository.port';
import type { Workout } from '@/workout-ca-example/domain/entities/workout.entity';

/** DB 행의 모양. 도메인 엔티티와 분리해서 관리한다. */
interface WorkoutRow {
  id: string;
  title: string;
  performed_at: string;
}

function toDomain(row: WorkoutRow): Workout {
  return {
    id: row.id,
    title: row.title,
    performedAt: new Date(row.performed_at),
  };
}

/** WorkoutRepository 포트의 sqlite 어댑터. */
export class SqliteWorkoutRepository implements WorkoutRepository {
  constructor(private readonly db: SQLiteDatabase) {}

  async findAll(): Promise<Workout[]> {
    const rows = await this.db.getAllAsync<WorkoutRow>(
      'SELECT id, title, performed_at FROM workouts ORDER BY performed_at DESC',
    );
    return rows.map(toDomain);
  }

  async save(workout: Workout): Promise<void> {
    await this.db.runAsync(
      'INSERT OR REPLACE INTO workouts (id, title, performed_at) VALUES (?, ?, ?)',
      workout.id,
      workout.title,
      workout.performedAt.toISOString(),
    );
  }
}
