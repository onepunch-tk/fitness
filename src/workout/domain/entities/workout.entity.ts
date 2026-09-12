import { DomainException } from '@/shared/domain/domain.exception';
import { gernerateId, type Id } from '@/shared/domain/id';

export interface Workout {
  readonly id: Id;
  readonly createdAt: Date;
  readonly finishedAt: Date | null;
  readonly exercises: Exercise[];
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

/**
 * 영속 데이터로부터 복원하는 팩토리.
 * 어댑터는 raw → props 매핑(Date 변환, null → undefined)만 하고 이 함수를 통해 엔티티를 만든다.
 */
export function reconstituWorkout(props: Workout): Workout {
  if (props.finishedAt && props.finishedAt < props.createdAt) {
    throw new DomainException(
      `finishedAt(${props.finishedAt.toISOString()})은 createdAt(${props.createdAt.toISOString()})보다 앞설 수 없다`,
    );
  }

  return props;
}
