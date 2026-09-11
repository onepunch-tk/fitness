import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NativeThemeProvider,
} from 'expo-router';
import type { PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from '../theme';

DarkTheme.colors.primary = colors.dark.tint;
DefaultTheme.colors.primary = colors.light.tint;

export default function ThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();

  return (
    <NativeThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {children}
    </NativeThemeProvider>
  );
}
