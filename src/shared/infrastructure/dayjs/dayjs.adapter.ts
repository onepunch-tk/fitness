import dayjs from 'dayjs';
import type { DateFormatter } from '@/shared/application/ports/date-format.port';
import 'dayjs/locale/ko';
import type {
  DateDifference,
  DateDiffUnit,
} from '@/shared/application/ports/date-difference.port';

dayjs.locale('ko');

export class DayjsFormatter implements DateFormatter {
  toDateString(date: Date, template?: string) {
    return dayjs(date).format(template);
  }
  fromDateString(_value: string) {
    return new Date();
  }

  diff(start: Date, end: Date, unit?: dayjs.QUnitType | dayjs.OpUnitType) {
    return dayjs(end).diff(dayjs(start), unit);
  }
}

export class DayjsDateDifference implements DateDifference {
  between(start: Date, end: Date, unit: DateDiffUnit): number {
    return dayjs(end).diff(dayjs(start), unit);
  }
}
