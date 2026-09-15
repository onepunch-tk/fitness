import type { UseCase } from '@/shared/application/use-case.contract';
import type { Id } from '@/shared/domain/id';
import {
  addExerciseToWorkout,
  createExercise,
  type Workout,
} from '@/workout/domain/entities/workout.entity';

interface AddExerciseToWorkoutInput {
  workout: Workout;
  exerciseId: Id;
  name: string;
}

export class AddExerciseToWorkout
  implements UseCase<AddExerciseToWorkoutInput, Workout>
{
  async execute({
    workout,
    exerciseId,
    name,
  }: AddExerciseToWorkoutInput): Promise<Workout> {
    return addExerciseToWorkout(workout, createExercise({ exerciseId, name }));
  }
}
