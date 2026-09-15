import { Link, router } from 'expo-router';
import { FlatList } from 'react-native';
import { createStyleSheet } from 'stylo-native';
import CustomButton from '@/shared/presentation/components/custom-button.component';
import { ThemedView } from '@/shared/presentation/components/themed.component';
import WorkoutListItem from '../components/workout-list-item.component';
import { useWorkoutStore } from '../store/workout.store';

export default function HomeScreen() {
  const currentWorkout = useWorkoutStore((s) => s.currentWorkout);
  const startWorkout = useWorkoutStore((s) => s.startWorkout);
  const workouts = useWorkoutStore((s) => s.workouts);

  const handleStartWorkout = () => {
    startWorkout();
    router.push('/workout/current');
  };

  return (
    <ThemedView style={styles.container}>
      {currentWorkout ? (
        <Link href="/workout/current" asChild>
          <CustomButton title="Resume workout" type="primary" />
        </Link>
      ) : (
        <CustomButton title="Start new workout" onPress={handleStartWorkout} />
      )}

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
