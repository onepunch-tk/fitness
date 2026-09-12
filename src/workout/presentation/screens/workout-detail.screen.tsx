import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import type { Id } from '@/shared/domain/id';
import {
  ThemedText,
  ThemedView,
} from '@/shared/presentation/components/themed.component';
import { toDateString } from '@/shared/presentation/formatters/date.formatter';
import type { Workout } from '@/workout/domain/entities/workout.entity';
import { getWorkoutById } from '@/workout/workout.composition';
import WorkoutExerciseItem from '../components/workout-exercise-item.component';

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: Id }>();
  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      const workout = await getWorkoutById.execute({ id });
      setWorkout(workout);
    };

    fetchWorkout();
  }, [id]);

  return (
    <ThemedView>
      {workout && (
        <FlatList
          data={workout.exercises}
          contentContainerStyle={{ gap: 8, padding: 8 }}
          renderItem={({ item }) => <WorkoutExerciseItem exercise={item} />}
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

const styles = StyleSheet.create({
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
