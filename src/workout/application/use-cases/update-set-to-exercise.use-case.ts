import type { UseCase } from '@/shared/application/use-case.contract';
import type { Id } from '@/shared/domain/id';
import {
  type ExerciseSet,
  updateSetToExcercise,
  type Workout,
} from '@/workout/domain/entities/workout.entity';

interface UpdateSetToExerciseInput {
  workout: Workout;
  workoutExerciseId: Id;
  setId: Id;
  updatedFields: Pick<ExerciseSet, 'reps' | 'weight'>;
}

export class UpdateSetToExercise
  implements UseCase<UpdateSetToExerciseInput, Workout>
{
  async execute({
    workout,
    workoutExerciseId,
    setId,
    updatedFields,
  }: UpdateSetToExerciseInput): Promise<Workout> {
    return updateSetToExcercise(
      workout,
      workoutExerciseId,
      setId,
      updatedFields,
    );
  }
}
