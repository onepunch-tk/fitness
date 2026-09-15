import { defineThemes } from 'stylo-native';

const tintColorLight = '#00C1A5';
const tintColorDark = '#56EDDC';

const commonTheme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    full: 999,
  },
};

export const colors = {
  light: {
    text: '#121212',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    textInputBackground: '#f0f0f0',
  },
  dark: {
    text: '#fff',
    background: '#121212',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    textInputBackground: '#191919',
  },
};

export const themes = {
  light: {
    ...commonTheme,
    colors: colors.light,
  },
  dark: {
    ...commonTheme,
    colors: colors.dark,
  },
};

export type AppTheme = (typeof themes)['light'];

/** stylo-native 시트 팩토리의 `t` 인자가 AppTheme으로 추론되도록 라이브러리 테마 타입을 확장한다. */
declare module 'stylo-native' {
  interface StyloTheme extends AppTheme {}
}

/** 앱에서 딱 한 번, 모듈 스코프에서 정의한다. 실제 테마 선택은 ThemeProvider가 handles로 한다. */
export const { handles } = defineThemes(themes, 'light');
