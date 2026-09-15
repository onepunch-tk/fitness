import type { Exercise } from '@/exercise/domain/entities/exercise.entity';
import type { UseCase } from '@/shared/application/use-case.contract';
import type { ExerciseRepository } from '../ports/exercise-repository.port';

export class ExerciseListUseCase implements UseCase<void, Exercise[]> {
  constructor(private readonly repository: ExerciseRepository) {}

  async execute(): Promise<Exercise[]> {
    return this.repository.findAll();
  }
}
