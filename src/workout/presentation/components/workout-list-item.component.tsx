import { FontAwesome5 } from '@react-native-vector-icons/fontawesome5';
import { StyleSheet } from 'react-native';
import Card from '@/shared/presentation/components/card.component';
import {
  ThemedText,
  ThemedView,
} from '@/shared/presentation/components/themed.component';
import { dateDiff, toDateStringFormatter } from '@/shared/shared.composition';
import type { Workout } from '@/workout/domain/entities/workout.entity';
import {
  calculateWorkoutVolume,
  findBestSet,
} from '@/workout/domain/services/workout-metrics.service';

type WorkoutListItem = {
  workout: Workout;
};

export default function WorkoutListItem({ workout }: WorkoutListItem) {
  const calculateDuration = (start: Date, end: Date | null) => {
    if (!end) return '0:00';

    const duration = dateDiff.excute({ start, end, unit: 'minutes' });
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <Card
      title={toDateStringFormatter.excute({
        originDate: workout.createdAt,
        template: 'MM월 DD일 HH:mm',
      })}
      style={styles.container}
      href={`/workout/${workout.id}`}
    >
      <ThemedView style={styles.exerciseSetWrapper}>
        <ThemedText style={styles.subtitle}>Exercise</ThemedText>
        <ThemedText style={styles.subtitle}>Best set</ThemedText>
      </ThemedView>

      {workout.exercises.map((exercise) => {
        // TODO: bestSet 계산
        const bestSet = findBestSet(exercise.sets);
        return (
          <ThemedView key={exercise.id} style={styles.exerciseSetWrapper}>
            <ThemedText style={styles.exerciseSetText}>
              {exercise.sets.length} x {exercise.name}
            </ThemedText>
            <ThemedText style={styles.exerciseSetText}>
              {bestSet?.reps}{' '}
              {bestSet?.weight ? `x ${bestSet.weight} kg` : 'reps'}
            </ThemedText>
          </ThemedView>
        );
      })}

      {/* footer */}
      <ThemedView style={styles.footerContainer}>
        <ThemedText>
          <FontAwesome5 name="clock" size={16} color="gray" />{' '}
          {calculateDuration(workout.createdAt, workout.finishedAt)}
        </ThemedText>
        <ThemedText>
          <FontAwesome5
            iconStyle="solid"
            name="weight-hanging"
            size={16}
            color="gray"
          />{' '}
          {calculateWorkoutVolume(workout)} kg
        </ThemedText>
      </ThemedView>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  exerciseSetWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exerciseSetText: {
    color: 'gray',
  },
  subtitle: {
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    gap: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#333',
    marginTop: 10,
    paddingTop: 10,
  },
});
