import { AddExerciseToWorkout } from './application/use-cases/add-exercise-to-workout.use-case';
import { AddSetToExercise } from './application/use-cases/add-set-to-exercise.use-case';
import { CreateWorkout } from './application/use-cases/create-workout.use-case';
import { DeleteSetToExercise } from './application/use-cases/delete-set-to-exercise.use-case';
import { FinishWorkout } from './application/use-cases/finish-workout.use-case';
import { GetWorkoutByID } from './application/use-cases/get-workout.use-case';
import { UpdateSetToExercise } from './application/use-cases/update-set-to-exercise.use-case';
import { WorkoutListUseCase } from './application/use-cases/workout-list.use-case';
import { InMemoryWorkoutRepository } from './infrastructure/adapters/in-memory-workout.repository';

const workoutRepository = new InMemoryWorkoutRepository();
export const workoutListUsecase = new WorkoutListUseCase(workoutRepository);
export const getWorkoutById = new GetWorkoutByID(workoutRepository);

export const createWorkout = new CreateWorkout();
export const finishWorkout = new FinishWorkout();
export const addExerciseToWorkout = new AddExerciseToWorkout();
export const addSetToExercise = new AddSetToExercise();
export const updateSetToExercise = new UpdateSetToExercise();
export const deleteSetToExercise = new DeleteSetToExercise();
