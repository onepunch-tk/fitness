import type { Id } from '@/shared/domain/id';
import type { Workout } from '@/workout/domain/entities/workout.entity';

export interface WorkoutRepository {
  findAll(): Promise<Workout[]>;
  findById(id: Id): Promise<Workout | null>;
}
