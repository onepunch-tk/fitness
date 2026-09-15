import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { useEffect, useState } from 'react';
import { createStyleSheet } from 'stylo-native';
import {
  ThemedText,
  ThemedView,
} from '@/shared/presentation/components/themed.component';
import { toDurationString } from '@/shared/presentation/formatters/date.formatter';
import { calculateWorkoutElapsedSeconds } from '@/workout/domain/services/workout-metrics.service';
import { useWorkoutStore } from '../store/workout.store';

export default function WorkoutHeader() {
  const [timer, setTimer] = useState('00:00');
  const currentWorkout = useWorkoutStore((s) => s.currentWorkout);

  useEffect(() => {
    if (!currentWorkout) return;
    const tick = () =>
      setTimer(
        toDurationString(
          calculateWorkoutElapsedSeconds(currentWorkout, new Date()),
        ),
      );
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [currentWorkout]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Workout tracker</ThemedText>
      <ThemedText style={styles.timer}>
        <FontAwesome5 name="clock" size={18} color="gray" /> {timer}
      </ThemedText>
    </ThemedView>
  );
}

const styles = createStyleSheet({
  container: {
    gap: 10,
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  timer: {
    fontSize: 18,
  },
});
