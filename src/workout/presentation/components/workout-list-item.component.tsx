import { FontAwesome5 } from '@react-native-vector-icons/fontawesome5';
import { StyleSheet } from 'react-native';
import { createStyleSheet } from 'stylo-native';
import Card from '@/shared/presentation/components/card.component';
import {
  ThemedText,
  ThemedView,
} from '@/shared/presentation/components/themed.component';
import { toDateString } from '@/shared/presentation/formatters/date.formatter';
import type { Workout } from '@/workout/domain/entities/workout.entity';
import {
  calculateWorkoutDurationMinutes,
  calculateWorkoutVolume,
  findBestSet,
} from '@/workout/domain/services/workout-metrics.service';

type WorkoutListItem = {
  workout: Workout;
};

const formatDuration = (minutes: number | null) => {
  if (minutes === null) return '0:00';

  const hours = Math.floor(minutes / 60);
  return `${hours}:${(minutes % 60).toString().padStart(2, '0')}`;
};

export default function WorkoutListItem({ workout }: WorkoutListItem) {
  return (
    <Card
      title={toDateString(workout.createdAt, 'MM월 DD일 HH:mm')}
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
          {formatDuration(calculateWorkoutDurationMinutes(workout))}
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

const styles = createStyleSheet({
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
