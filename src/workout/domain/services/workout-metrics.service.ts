import type {
  Exercise,
  ExerciseSet,
  Workout,
} from '../entities/workout.entity';

export const calculateSetVolume = (set: ExerciseSet): number =>
  (set.weight ?? 0) * (set.reps ?? 0);

export const calculateExerciseVolume = (exercise: Exercise): number =>
  exercise.sets.reduce((total, set) => total + calculateSetVolume(set), 0);

export const calculateWorkoutVolume = (workout: Workout): number =>
  workout.exercises.reduce(
    (total, exercise) => total + calculateExerciseVolume(exercise),
    0,
  );

export const findBestSet = (sets: readonly ExerciseSet[]): ExerciseSet | null =>
  sets.reduce<ExerciseSet | null>((bestSet, currentSet) => {
    if (currentSet.oneRm == null) return bestSet;
    if (bestSet?.oneRm == null) return currentSet;

    return currentSet.oneRm > bestSet.oneRm ? currentSet : bestSet;
  }, null);

export const calculateWorkoutDurationMinutes = (
  workout: Workout,
): number | null =>
  workout.finishedAt === null
    ? null
    : Math.floor(
        (workout.finishedAt.getTime() - workout.createdAt.getTime()) / 60_000,
      );

/** 시작(createdAt)부터 now까지 경과한 초. 진행 중인 워크아웃의 타이머용. */
export const calculateWorkoutElapsedSeconds = (
  workout: Workout,
  now: Date,
): number => Math.floor((now.getTime() - workout.createdAt.getTime()) / 1000);
