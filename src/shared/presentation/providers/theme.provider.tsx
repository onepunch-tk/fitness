import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NativeThemeProvider,
  type Theme,
} from 'expo-router';
import type { PropsWithChildren } from 'react';
import { useColorScheme } from '../hooks/use-color-scheme.hook';
import { type AppTheme, themes } from '../theme';

function toNavigationTheme(base: Theme, { colors }: AppTheme): Theme {
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.tint,
      background: colors.background,
      card: colors.background,
      text: colors.text,
    },
  };
}

const navigationThemes = {
  light: toNavigationTheme(DefaultTheme, themes.light),
  dark: toNavigationTheme(DarkTheme, themes.dark),
};

export default function ThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();

  return (
    <NativeThemeProvider value={navigationThemes[colorScheme]}>
      {children}
    </NativeThemeProvider>
  );
}
