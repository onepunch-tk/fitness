import {
  type ImageStyle,
  StyleSheet,
  type TextStyle,
  useColorScheme,
  type ViewStyle,
} from 'react-native';

import { type AppTheme, themes } from './theme';

type RNStyle = ViewStyle | TextStyle | ImageStyle;

type NamedStyles<T> = {
  [P in keyof T]: RNStyle;
};

export function createStyleSheet<T extends NamedStyles<T> | NamedStyles<any>>(
  factory: (theme: AppTheme) => T & NamedStyles<any>,
) {
  const light = StyleSheet.create<T>(factory(themes.light));
  const dark = StyleSheet.create<T>(factory(themes.dark));

  return function useStyles(): T {
    const colorScheme = useColorScheme() ?? 'light';

    return colorScheme === 'dark' ? dark : light;
  };
}
