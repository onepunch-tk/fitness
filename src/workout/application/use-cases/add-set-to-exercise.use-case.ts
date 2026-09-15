import type { UseCase } from '@/shared/application/use-case.contract';
import type { Id } from '@/shared/domain/id';
import {
  addSetToExercise,
  type Workout,
} from '@/workout/domain/entities/workout.entity';

interface AddSetToExerciseInput {
  workout: Workout;
  workoutExerciseId: Id;
}

export class AddSetToExercise
  implements UseCase<AddSetToExerciseInput, Workout>
{
  async execute({
    workout,
    workoutExerciseId,
  }: AddSetToExerciseInput): Promise<Workout> {
    return addSetToExercise(workout, workoutExerciseId);
  }
}
