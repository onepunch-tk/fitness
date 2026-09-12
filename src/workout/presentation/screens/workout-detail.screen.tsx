import { useLocalSearchParams } from 'expo-router';
import type { Id } from '@/shared/domain/id';
import { ThemedView } from '@/shared/presentation/components/themed.component';
import { ThemedText } from '../../../shared/presentation/components/themed.component';

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: Id }>();
  return (
    <ThemedView>
      <ThemedText>Workout Detail Screen: {id}</ThemedText>
    </ThemedView>
  );
}
