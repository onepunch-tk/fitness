import { DomainException } from '@/shared/domain/domain.exception';
import type { Id } from '@/shared/domain/id';

export interface Exercise {
  readonly id: Id;
  readonly name: string;
  readonly muscle: string;
}

/**
 * 영속 데이터로부터 복원하는 팩토리. 불변식(invariant)은 여기서 지킨다.
 */
export function reconstituteExercise(props: Exercise): Exercise {
  if (!props.id) {
    throw new DomainException('Exercise의 id는 비어 있을 수 없다');
  }
  if (!props.name) {
    throw new DomainException(
      `Exercise(${props.id})의 name은 비어 있을 수 없다`,
    );
  }
  if (!props.muscle) {
    throw new DomainException(
      `Exercise(${props.id})의 muscle은 비어 있을 수 없다`,
    );
  }

  return props;
}
