import type { ComponentProps } from 'react';
import {
  Text as NativeText,
  TextInput as NativeTextInput,
  View as NativeView,
} from 'react-native';
import { createStyleSheet } from '../stylesheet';

export function Text({ style, ...props }: ComponentProps<typeof NativeText>) {
  const { color } = useStyles().text;
  return <NativeText style={[{ color }, style]} {...props} />;
}

export function View({ style, ...props }: ComponentProps<typeof NativeView>) {
  const { backgroundColor } = useStyles().view;
  return <NativeView style={[{ backgroundColor }, style]} {...props} />;
}

export function TextInput({
  style,
  ...props
}: ComponentProps<typeof NativeTextInput>) {
  const { color, backgroundColor } = useStyles().textInput;
  return (
    <NativeTextInput style={[{ color, backgroundColor }, style]} {...props} />
  );
}

const useStyles = createStyleSheet(({ colors, spacing, radius }) => ({
  text: {
    color: colors.text,
  },
  view: {
    backgroundColor: colors.background,
  },
  textInput: {
    color: colors.text,
    backgroundColor: colors.background,
  },
}));
