import type { UseCase } from '@/shared/application/use-case.contract';
import type { Id } from '@/shared/domain/id';
import {
  deleteSetToExercise,
  type Workout,
} from '@/workout/domain/entities/workout.entity';

interface DeleteSetToExerciseInput {
  workout: Workout;
  workoutExerciseId: Id;
  setId: Id;
}

export class DeleteSetToExercise
  implements UseCase<DeleteSetToExerciseInput, Workout>
{
  async execute({
    workout,
    workoutExerciseId,
    setId,
  }: DeleteSetToExerciseInput): Promise<Workout> {
    return deleteSetToExercise(workout, workoutExerciseId, setId);
  }
}
