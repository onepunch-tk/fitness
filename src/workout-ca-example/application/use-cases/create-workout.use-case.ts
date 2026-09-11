import type { UseCase } from '@/common/application/use-case';
import type { WorkoutRepository } from '@/workout-ca-example/application/ports/workout.repository.port';
import {
  createWorkout,
  type Workout,
} from '@/workout-ca-example/domain/entities/workout.entity';

export interface CreateWorkoutInput {
  title: string;
}

export class CreateWorkoutUseCase
  implements UseCase<CreateWorkoutInput, Workout>
{
  constructor(private readonly repository: WorkoutRepository) {}

  async execute(input: CreateWorkoutInput): Promise<Workout> {
    const workout = createWorkout(input);
    await this.repository.save(workout);
    return workout;
  }
}
