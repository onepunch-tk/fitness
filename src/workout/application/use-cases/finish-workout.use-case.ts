import type { UseCase } from '@/shared/application/use-case.contract';
import {
  finishWorkout,
  type Workout,
} from '@/workout/domain/entities/workout.entity';

export class FinishWorkout implements UseCase<Workout, Workout> {
  async execute(workout: Workout): Promise<Workout> {
    return finishWorkout(workout);
  }
}
