import { create } from 'zustand';
import type { Id } from '@/shared/domain/id';
import type {
  ExerciseSet,
  Workout,
} from '@/workout/domain/entities/workout.entity';
import {
  addExerciseToWorkout,
  addSetToExercise,
  createWorkout,
  deleteSetToExercise,
  finishWorkout,
  updateSetToExercise,
} from '@/workout/workout.composition';

type WorkoutState = {
  currentWorkout: Workout | null;
  workouts: Workout[];
};
type WorkoutActions = {
  startWorkout: () => void;
  finishWorkout: () => void;
  addExercise: (exerciseId: Id, name: string) => void;
  addSet: (workoutExerciseId: Id) => void;
  updateSet: (
    workoutExerciseId: Id,
    setId: Id,
    updatedFields: Pick<ExerciseSet, 'reps' | 'weight'>,
  ) => void;
  deleteSet: (workoutExerciseId: Id, setId: Id) => void;
};

export const useWorkoutStore = create<WorkoutState & WorkoutActions>()(
  (set, get) => ({
    currentWorkout: null,
    workouts: [],

    startWorkout: async () => {
      set({ currentWorkout: await createWorkout.execute() });
    },
    finishWorkout: async () => {
      const { currentWorkout } = get();
      if (!currentWorkout) return;

      const finished = await finishWorkout.execute(currentWorkout);

      set((state) => ({
        currentWorkout: null,
        workouts: [...state.workouts, finished],
      }));
    },
    addExercise: async (exerciseId, name) => {
      const { currentWorkout } = get();
      if (!currentWorkout) return;

      set({
        currentWorkout: await addExerciseToWorkout.execute({
          workout: currentWorkout,
          exerciseId,
          name,
        }),
      });
    },
    addSet: async (workoutExerciseId) => {
      const { currentWorkout } = get();
      if (!currentWorkout) return;

      set({
        currentWorkout: await addSetToExercise.execute({
          workout: currentWorkout,
          workoutExerciseId,
        }),
      });
    },
    updateSet: async (workoutExerciseId, setId, updatedFields) => {
      const { currentWorkout } = get();
      if (!currentWorkout) return;

      set({
        currentWorkout: await updateSetToExercise.execute({
          workout: currentWorkout,
          workoutExerciseId,
          setId,
          updatedFields,
        }),
      });
    },
    deleteSet: async (workoutExerciseId, setId) => {
      const { currentWorkout } = get();
      if (!currentWorkout) return;

      set({
        currentWorkout: await deleteSetToExercise.execute({
          workout: currentWorkout,
          workoutExerciseId,
          setId,
        }),
      });
    },
  }),
);
