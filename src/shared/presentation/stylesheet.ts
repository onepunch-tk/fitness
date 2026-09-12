import {
  type ImageStyle,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useColorScheme } from './hooks/use-color-scheme.hook';
import { type AppTheme, themes } from './theme';

type RNStyle = ViewStyle | TextStyle | ImageStyle;

type NamedStyles<T> = {
  [P in keyof T]: RNStyle;
};

export function createStyleSheet<T extends NamedStyles<T>>(
  factory: (theme: AppTheme) => T & Record<string, RNStyle>,
) {
  const schemes = {
    light: StyleSheet.create(factory(themes.light)),
    dark: StyleSheet.create(factory(themes.dark)),
  };

  return function useStyles(): T {
    return schemes[useColorScheme()];
  };
}
