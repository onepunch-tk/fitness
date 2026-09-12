import type { Workout } from '@/workout/domain/entities/workout.entity';

export interface WorkoutRepository {
  findAll(): Promise<Workout[]>;
}
