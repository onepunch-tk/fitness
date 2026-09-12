import dayjs from 'dayjs';
export const toDateString = (date: Date, template?: string) => {
  return dayjs(date).format(template);
};
