import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Pressable, type StyleProp, View, type ViewStyle } from 'react-native';
import { createStyleSheet, useStyles, useTheme } from 'stylo-native';
import { ThemedText } from './themed.component';

type CustomButton = {
  rightIcon?: ReactNode;
  title: string;
  style?: StyleProp<ViewStyle>;
  type?: 'primary' | 'outline' | 'link';
  color?: string;
} & ComponentPropsWithRef<typeof Pressable>;

export default function CustomButton({
  rightIcon,
  title,
  style,
  type = 'primary',
  color,
  ref,
  ...pressableProps
}: CustomButton) {
  const s = useStyles(styles);
  const { colors } = useTheme();
  const tint = color || colors.tint;

  return (
    <Pressable
      ref={ref}
      {...pressableProps}
      style={[
        s.button,
        type === 'outline' && { borderColor: tint, borderWidth: 2 },
        type === 'primary' && { backgroundColor: tint },
        type === 'link' && { backgroundColor: 'transparent' },
        style,
      ]}
    >
      <ThemedText
        style={[
          s.buttonText,
          type === 'outline' && { color: tint },
          type === 'link' && { color: tint },
        ]}
      >
        {title}
      </ThemedText>
      <View style={s.rightIconContainer}>{rightIcon}</View>
    </Pressable>
  );
}

const styles = createStyleSheet((t) => ({
  button: {
    padding: t.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.spacing.lg,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 20,
  },
}));
