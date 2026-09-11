import { randomUUID } from 'expo-crypto';

export type Id = string;

export const gernerateId = (): Id => randomUUID();
