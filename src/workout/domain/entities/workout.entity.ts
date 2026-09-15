import { DomainException } from '@/shared/domain/domain.exception';
import { gernerateId, type Id } from '@/shared/domain/id';

export interface Workout {
  readonly id: Id;
  readonly createdAt: Date;
  readonly finishedAt: Date | null;
  readonly exercises: readonly WorkoutExercise[];
}

export interface WorkoutExercise {
  readonly id: Id;
  readonly exerciseId: Id;
  readonly name: string;
  readonly sets: readonly ExerciseSet[];
}

export interface ExerciseSet {
  readonly id: Id;
  readonly reps?: number;
  readonly weight?: number;
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

export function createExercise({
  exerciseId,
  name,
}: {
  exerciseId: Id;
  name: string;
}): WorkoutExercise {
  return {
    id: gernerateId(),
    exerciseId,
    name,
    sets: [],
  };
}

export function createSet(): ExerciseSet {
  return {
    id: gernerateId(),
  };
}

/** 애그리거트 루트(Workout)에 대한 상태 전이. 중첩 갱신은 전부 여기서 처리한다. */
export function addExerciseToWorkout(
  workout: Workout,
  exercise: WorkoutExercise,
): Workout {
  return { ...workout, exercises: [...workout.exercises, exercise] };
}

export function addSetToExercise(
  workout: Workout,
  workoutExerciseId: Id,
): Workout {
  if (!workout.exercises.some((e) => e.id === workoutExerciseId)) {
    throw new DomainException(
      `Workout(${workout.id})에 WorkoutExercise(${workoutExerciseId})가 없다`,
    );
  }

  return {
    ...workout,
    exercises: workout.exercises.map((exercise) =>
      exercise.id === workoutExerciseId
        ? { ...exercise, sets: [...exercise.sets, createSet()] }
        : exercise,
    ),
  };
}

export function updateSetToExcercise(
  workout: Workout,
  workoutExerciseId: Id,
  setId: Id,
  updatedFields: Pick<ExerciseSet, 'reps' | 'weight'>,
): Workout {
  const target = workout.exercises.find((e) => e.id === workoutExerciseId);
  if (!target?.sets.some((s) => s.id === setId)) {
    throw new DomainException(
      `WorkoutExercise(${workoutExerciseId})에 ExerciseSet(${setId})이 없다`,
    );
  }

  return {
    ...workout,
    exercises: workout.exercises.map((exercise) =>
      exercise.id === workoutExerciseId
        ? {
            ...exercise,
            sets: exercise.sets.map((set) =>
              set.id === setId ? { ...set, ...updatedFields } : set,
            ),
          }
        : exercise,
    ),
  };
}

export function deleteSetToExercise(
  workout: Workout,
  workoutExerciseId: Id,
  setId: Id,
): Workout {
  const target = workout.exercises.find((e) => e.id === workoutExerciseId);
  if (!target?.sets.some((s) => s.id === setId)) {
    throw new DomainException(
      `WorkoutExercise(${workoutExerciseId})에 ExerciseSet(${setId})이 없다`,
    );
  }

  return {
    ...workout,
    exercises: workout.exercises.map((exercise) =>
      exercise.id === workoutExerciseId
        ? { ...exercise, sets: exercise.sets.filter((set) => set.id !== setId) }
        : exercise,
    ),
  };
}

export function finishWorkout(workout: Workout): Workout {
  return { ...workout, finishedAt: new Date() };
}

/**
 * 영속 데이터로부터 복원하는 팩토리.
 * 어댑터는 raw → props 매핑(Date 변환, null → undefined)만 하고 이 함수를 통해 엔티티를 만든다.
 */
export function reconstituteWorkout(props: Workout): Workout {
  if (props.finishedAt && props.finishedAt < props.createdAt) {
    throw new DomainException(
      `finishedAt(${props.finishedAt.toISOString()})은 createdAt(${props.createdAt.toISOString()})보다 앞설 수 없다`,
    );
  }
  for (const exercise of props.exercises) {
    if (!exercise.exerciseId) {
      throw new DomainException(
        `WorkoutExercise(${exercise.id})의 exerciseId는 비어 있을 수 없다`,
      );
    }
  }

  return props;
}
