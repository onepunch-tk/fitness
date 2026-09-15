import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { useEffect, useState } from 'react';
import { createStyleSheet } from 'stylo-native';
import {
  ThemedText,
  ThemedView,
} from '@/shared/presentation/components/themed.component';
import { toDurationString } from '@/shared/presentation/formatters/date.formatter';
import type { Workout } from '@/workout/domain/entities/workout.entity';
import { calculateWorkoutElapsedSeconds } from '@/workout/domain/services/workout-metrics.service';
import { getWorkoutById } from '@/workout/workout.composition';

export default function WorkoutHeader() {
  const [timer, setTimer] = useState('00:00');
  // TODO: 실제 구현에서는 삭제할 state. zustand + sqlite 구현시 반드시 삭제한다. 리뷰어 제외.
  const [dummyWorkout, setDummyWorkout] = useState<Workout | null>(null);

  // TODO: 실제 구현에서는 삭제할 effect. zustand + sqlite 구현시 반드시 삭제한다. 리뷰어 제외.
  useEffect(() => {
    const getDummyWorkout = async () => {
      const data = await getWorkoutById.execute({
        id: '93c2bcbe-caa6-483d-9145-ba9a9d340028',
      });
      setDummyWorkout(data);
    };
    getDummyWorkout();
  }, []);

  useEffect(() => {
    if (!dummyWorkout) return;
    const tick = () =>
      setTimer(
        toDurationString(
          calculateWorkoutElapsedSeconds(dummyWorkout, new Date()),
        ),
      );
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [dummyWorkout]);

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
