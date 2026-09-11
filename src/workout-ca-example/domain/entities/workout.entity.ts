import { DomainException } from '@/common/domain/exceptions/domain.exception';
import { generateId, type Id } from '@/common/domain/id';

/** 엔티티. 프레임워크·DB·UI를 전혀 모른다. */
export interface Workout {
  readonly id: Id;
  readonly title: string;
  readonly performedAt: Date;
}

export interface CreateWorkoutProps {
  title: string;
  performedAt?: Date;
}

/** 팩토리. 불변식(invariant)은 여기서 지킨다. */
export function createWorkout(props: CreateWorkoutProps): Workout {
  const title = props.title.trim();
  if (title.length === 0) {
    throw new DomainException('운동 이름은 비어 있을 수 없습니다.');
  }

  return {
    id: generateId(),
    title,
    performedAt: props.performedAt ?? new Date(),
  };
}
