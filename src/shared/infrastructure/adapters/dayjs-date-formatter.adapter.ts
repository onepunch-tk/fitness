import dayjs from 'dayjs';
import type { DateFormatter } from '@/shared/application/ports/date-format.port';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export class DayjsFormatter implements DateFormatter {
  toDateString(date: Date, template?: string) {
    return dayjs(date).format(template);
  }
}
