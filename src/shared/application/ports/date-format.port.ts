export interface DateFormatter {
  toDateString(date: Date, template?: string): string;
  fromDateString(value: string): Date;
}
