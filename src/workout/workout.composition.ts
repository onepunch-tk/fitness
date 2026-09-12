import { GetWorkoutByID } from './application/use-cases/get-workout.use-case';
import { WorkoutListUseCase } from './application/use-cases/workout-list.use-case';
import { InMemoryWorkoutRepository } from './infrastructure/adapters/in-memory-workout.repository';

const workoutRepository = new InMemoryWorkoutRepository();
export const workoutListUsecase = new WorkoutListUseCase(workoutRepository);
export const getWorkoutById = new GetWorkoutByID(workoutRepository);
