/**
 * Composition Root.
 * infrastructure 구현체를 application 유스케이스에 주입하는 유일한 장소.
 * presentation 계층은 여기서 조립된 유스케이스만 가져다 쓴다.
 */
import { getDatabase } from '@/common/infrastructure/database/client';
import { CreateWorkoutUseCase } from './application/use-cases/create-workout.use-case';
import { ListWorkoutsUseCase } from './application/use-cases/list-workouts.use-case';
import { SqliteWorkoutRepository } from './infrastructure/adapters/sqlite-workout.repository';

export { WORKOUT_SCHEMA } from './infrastructure/workout.schema';

const workoutRepository = new SqliteWorkoutRepository(getDatabase());

export const createWorkoutUseCase = new CreateWorkoutUseCase(workoutRepository);
export const listWorkoutsUseCase = new ListWorkoutsUseCase(workoutRepository);
