import { useLocalSearchParams } from 'expo-router';
import { FlatList } from 'react-native';
import { createStyleSheet } from 'stylo-native';
import { useShallow } from 'zustand/shallow';
import type { Id } from '@/shared/domain/id';
import {
  ThemedText,
  ThemedView,
} from '@/shared/presentation/components/themed.component';
import { toDateString } from '@/shared/presentation/formatters/date.formatter';
import ExerciseItem from '../components/exercise-item.component';
import { useWorkoutStore } from '../store/workout.store';

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: Id }>();
  const workout = useWorkoutStore(
    useShallow((s) => s.workouts.find((w) => w.id === id)),
  );

  return (
    <ThemedView>
      {workout && (
        <FlatList
          data={workout.exercises}
          contentContainerStyle={{ gap: 8, padding: 8 }}
          renderItem={({ item }) => <ExerciseItem exercise={item} />}
          ListHeaderComponent={
            <>
              <ThemedText style={styles.title}>Workout details</ThemedText>
              <ThemedText style={styles.date}>
                {toDateString(workout.createdAt, 'MM월 DD일 HH:mm')}
              </ThemedText>
            </>
          }
        />
      )}
    </ThemedView>
  );
}

const styles = createStyleSheet({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    marginBottom: 20,
  },
});
