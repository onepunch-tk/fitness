import { DateDiff } from './application/use-cases/date-diff.use-case';
import { ToDateStringFormatter } from './application/use-cases/to-date-string.use-case';
import {
  DayjsDateDifference,
  DayjsFormatter,
} from './infrastructure/dayjs/dayjs.adapter';

const dayjsFormatter = new DayjsFormatter();
const dateDifference = new DayjsDateDifference();

export const toDateStringFormatter = new ToDateStringFormatter(dayjsFormatter);
export const dateDiff = new DateDiff(dateDifference);
