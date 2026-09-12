import { type Href, Link } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { createStyleSheet } from '../stylesheet';
import { ThemedText, ThemedView } from './themed.component';

type Card = {
  title: string;
  href?: Href;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

export default function Card({ title, href, style, children }: Card) {
  const styles = useStyles();
  const cardContent = (
    <ThemedView style={[styles.card, style]}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      {children}
    </ThemedView>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        <Pressable>{cardContent}</Pressable>
      </Link>
    );
  }

  return cardContent;
}

const useStyles = createStyleSheet(({ colors, spacing, radius }) => ({
  card: {
    padding: 16,
    borderLeftWidth: 2,
    borderLeftColor: colors.tint,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
}));
