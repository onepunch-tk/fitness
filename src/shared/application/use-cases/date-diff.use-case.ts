import type {
  DateDifference,
  DateDiffUnit,
} from '../ports/date-difference.port';
import type { UseCase } from '../use-case';

interface DateDiffInput {
  start: Date;
  end: Date;
  unit: DateDiffUnit;
}

export class DateDiff implements UseCase<DateDiffInput, number> {
  constructor(private readonly dateDifference: DateDifference) {}

  excute({ start, end, unit }: DateDiffInput): number {
    return this.dateDifference.between(start, end, unit);
  }
}
