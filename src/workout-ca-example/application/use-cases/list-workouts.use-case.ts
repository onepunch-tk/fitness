import type { UseCase } from '@/common/application/use-case';
import type { WorkoutRepository } from '@/workout-ca-example/application/ports/workout.repository.port';
import type { Workout } from '@/workout-ca-example/domain/entities/workout.entity';

export class ListWorkoutsUseCase implements UseCase<void, Workout[]> {
  constructor(private readonly repository: WorkoutRepository) {}

  execute(): Promise<Workout[]> {
    return this.repository.findAll();
  }
}
