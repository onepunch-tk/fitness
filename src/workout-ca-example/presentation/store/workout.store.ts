import { create } from 'zustand';
import type { Workout } from '@/workout-ca-example/domain/entities/workout.entity';
import {
  createWorkoutUseCase,
  listWorkoutsUseCase,
} from '@/workout-ca-example/workout.composition';

interface WorkoutState {
  workouts: Workout[];
  isLoading: boolean;
  load: () => Promise<void>;
  add: (title: string) => Promise<void>;
}

/** UI 상태만 담당한다. 비즈니스 로직은 유스케이스에 위임한다. */
export const useWorkoutStore = create<WorkoutState>()((set, get) => ({
  workouts: [],
  isLoading: false,

  load: async () => {
    set({ isLoading: true });
    const workouts = await listWorkoutsUseCase.execute();
    set({ workouts, isLoading: false });
  },

  add: async (title) => {
    const workout = await createWorkoutUseCase.execute({ title });
    set({ workouts: [workout, ...get().workouts] });
  },
}));
