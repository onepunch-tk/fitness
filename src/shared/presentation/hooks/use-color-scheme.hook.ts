import { useColorScheme as useNativeColorScheme } from 'react-native';

export type ColorScheme = 'light' | 'dark';

export function useColorScheme(): ColorScheme {
  return useNativeColorScheme() === 'dark' ? 'dark' : 'light';
}
