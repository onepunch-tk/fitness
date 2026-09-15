import type { Exercise } from '@/exercise/domain/entities/exercise.entity';

export interface ExerciseRepository {
  findAll(): Promise<Exercise[]>;
}
