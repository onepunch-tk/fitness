import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { createStyleSheet } from 'stylo-native';
import CustomButton from '@/shared/presentation/components/custom-button.component';
import { ThemedView } from '@/shared/presentation/components/themed.component';
import type { Workout } from '@/workout/domain/entities/workout.entity';
import { workoutListUsecase } from '@/workout/workout.composition';
import WorkoutListItem from '../components/workout-list-item.component';

export default function HomeScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  useEffect(() => {
    const fetchWorkoutList = async () => {
      const data = await workoutListUsecase.execute();
      setWorkouts(data);
    };

    fetchWorkoutList();
  }, []);
  return (
    <ThemedView style={styles.container}>
      <Link href="/workout/current" asChild>
        <CustomButton title="Resume workout" type="primary" />
      </Link>

      <FlatList
        data={workouts}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => <WorkoutListItem workout={item} />}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = createStyleSheet({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
    backgroundColor: 'transparent',
  },
});
