import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NativeThemeProvider,
  type Theme,
} from 'expo-router';
import type { PropsWithChildren } from 'react';
import { ThemeProvider as StyloThemeProvider } from 'stylo-native';
import { useColorScheme } from '../hooks/use-color-scheme.hook';
import { type AppTheme, handles, themes } from '../theme';

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

  // 시스템 색상 스킴으로 handle을 고정해 네비게이션 테마와 같은 렌더에서 전환되게 한다.
  return (
    <StyloThemeProvider theme={handles[colorScheme]}>
      <NativeThemeProvider value={navigationThemes[colorScheme]}>
        {children}
      </NativeThemeProvider>
    </StyloThemeProvider>
  );
}
