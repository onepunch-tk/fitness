import type { DateFormatter } from '../ports/date-format.port';
import type { UseCase } from '../use-case';

interface ToDateStringFormatterInput {
  originDate: Date;
  template?: string;
}

export class ToDateStringFormatter
  implements UseCase<ToDateStringFormatterInput, string>
{
  constructor(private readonly dateFormatter: DateFormatter) {}

  excute({ originDate, template }: ToDateStringFormatterInput): string {
    return this.dateFormatter.toDateString(originDate, template);
  }
}
