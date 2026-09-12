import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Pressable, type StyleProp, View, type ViewStyle } from 'react-native';
import { createStyleSheet } from '../stylesheet';
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
  const styles = useStyle();
  const tint = color || styles.tint.color;

  return (
    <Pressable
      ref={ref}
      {...pressableProps}
      style={[
        styles.button,
        type === 'outline' && { borderColor: tint, borderWidth: 2 },
        type === 'primary' && { backgroundColor: tint },
        type === 'link' && { backgroundColor: 'transparent' },
        style,
      ]}
    >
      <ThemedText
        style={[
          styles.buttonText,
          type === 'outline' && { color: tint },
          type === 'link' && { color: tint },
        ]}
      >
        {title}
      </ThemedText>
      <View style={styles.rightIconContainer}>{rightIcon}</View>
    </Pressable>
  );
}

const useStyle = createStyleSheet(({ colors, spacing, radius }) => ({
  button: {
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
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
  tint: {
    color: colors.tint,
  },
}));
