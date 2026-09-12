import type { UseCase } from '@/shared/application/use-case.contract';
import type { Id } from '@/shared/domain/id';
import type { Workout } from '@/workout/domain/entities/workout.entity';
import type { WorkoutRepository } from '../ports/workout-repository.port';

interface GetWorkoutInput {
  id: Id;
}

export class GetWorkoutByID
  implements UseCase<GetWorkoutInput, Workout | null>
{
  constructor(private readonly repository: WorkoutRepository) {}

  async execute({ id }: GetWorkoutInput): Promise<Workout | null> {
    return this.repository.findById(id);
  }
}
