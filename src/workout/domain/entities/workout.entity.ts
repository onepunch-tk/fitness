import { gernerateId, type Id } from '@/shared/domain/id';

export interface Workout {
  readonly id: Id;
  createdAt: Date;
  finishedAt: Date | null;
  exercises: Exercise[];
}

export interface Exercise {
  readonly id: Id;
  readonly name: string;
  readonly sets: ExerciseSet[];
}

export interface ExerciseSet {
  readonly id: Id;
  readonly reps?: number;
  readonly weight?: number;
  readonly oneRm?: number;
}

/** 팩토리. 불변식(invariant)은 여기서 지킨다. */
export function createWorkout(): Workout {
  return {
    id: gernerateId(),
    createdAt: new Date(),
    finishedAt: null,
    exercises: [],
  };
}
