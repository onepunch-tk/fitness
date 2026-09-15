import type { ComponentProps } from 'react';
import {
  Text as NativeText,
  TextInput as NativeTextInput,
  View as NativeView,
} from 'react-native';
import { createStyleSheet, useStyles } from 'stylo-native';

export function ThemedText({
  style,
  ...props
}: ComponentProps<typeof NativeText>) {
  const s = useStyles(styles);
  return <NativeText style={[s.text, style]} {...props} />;
}

export function ThemedView({
  style,
  ...props
}: ComponentProps<typeof NativeView>) {
  const s = useStyles(styles);
  return <NativeView style={[s.view, style]} {...props} />;
}

export function ThemedTextInput({
  style,
  ...props
}: ComponentProps<typeof NativeTextInput>) {
  const s = useStyles(styles);
  return <NativeTextInput style={[s.textInput, style]} {...props} />;
}

const styles = createStyleSheet((t) => ({
  text: {
    color: t.colors.text,
  },
  view: {
    backgroundColor: t.colors.background,
  },
  textInput: {
    color: t.colors.text,
    backgroundColor: t.colors.textInputBackground,
  },
}));
