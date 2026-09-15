import { ExerciseListUseCase } from './application/use-cases/exercise-list.use-case';
import { InMemoryExerciseRepository } from './infrastructure/adapters/in-memory-exercise.repository';

const exerciseRepository = new InMemoryExerciseRepository();
export const exerciseListUsecase = new ExerciseListUseCase(exerciseRepository);
