import type { Workout } from '@/workout-ca-example/domain/entities/workout.entity';

/**
 * 리포지토리 포트. 유스케이스가 "무엇이 필요한지"만 선언한다.
 * 실제 구현(sqlite 등)은 infrastructure/adapters에 둔다.
 */
export interface WorkoutRepository {
  findAll(): Promise<Workout[]>;
  save(workout: Workout): Promise<void>;
}
