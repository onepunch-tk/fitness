type UnitTypeLong =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'month'
  | 'year'
  | 'date';
type UnitTypeLongPlural =
  | 'milliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'months'
  | 'years'
  | 'dates';

export type DateDiffUnit = UnitTypeLong | UnitTypeLongPlural;

export interface DateDifference {
  between(start: Date, end: Date, unit: DateDiffUnit): number;
}
