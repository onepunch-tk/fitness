import type { UseCase } from '@/shared/application/use-case.contract';
import {
  createWorkout,
  type Workout,
} from '@/workout/domain/entities/workout.entity';

export class CreateWorkout implements UseCase<void, Workout> {
  async execute(): Promise<Workout> {
    const workout = createWorkout();
    return workout;
  }
}
