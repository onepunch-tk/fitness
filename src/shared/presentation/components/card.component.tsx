import { type Href, Link } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'stylo-native';
import { ThemedText, ThemedView } from './themed.component';

type Card = {
  title: string;
  href?: Href;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

export default function Card({ title, href, style, children }: Card) {
  const s = useStyles(styles);
  const cardContent = (
    <ThemedView style={[s.card, style]}>
      <ThemedText style={s.title}>{title}</ThemedText>
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

const styles = createStyleSheet((t) => ({
  card: {
    padding: 16,
    borderLeftWidth: 2,
    borderLeftColor: t.colors.tint,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: t.spacing.sm,
  },
}));
