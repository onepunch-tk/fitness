import dayjs from 'dayjs';
export const toDateString = (date: Date, template?: string) => {
  return dayjs(date).format(template);
};

/** 초 단위 길이를 타이머 표기(mm:ss)로 바꾼다. 1시간 이상은 시 자리를 버리고 분·초만 남긴다. */
export const toDurationString = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${pad(minutes)}:${pad(seconds)}`;
};
