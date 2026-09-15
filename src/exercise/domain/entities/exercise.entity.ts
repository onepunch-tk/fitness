import type { Id } from '@/shared/domain/id';

export interface Exercise {
  id: Id;
  name: string;
  muscle: string;
}
