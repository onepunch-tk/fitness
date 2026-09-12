import type { UseCase } from '@/shared/application/use-case.contract';
import type { Workout } from '@/workout/domain/entities/workout.entity';
import type { WorkoutRepository } from '../ports/workout-repository.port';

export class WorkoutListUseCase implements UseCase<void, Workout[]> {
  constructor(private readonly repository: WorkoutRepository) {}

  async execute(): Promise<Workout[]> {
    return this.repository.findAll();
  }
}
