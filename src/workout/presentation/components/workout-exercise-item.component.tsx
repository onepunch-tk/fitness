import { StyleSheet } from 'react-native';
import Card from '@/shared/presentation/components/card.component';
import {
  ThemedText,
  ThemedView,
} from '@/shared/presentation/components/themed.component';
import { createStyleSheet } from '@/shared/presentation/stylesheet';
import type { Exercise } from '@/workout/domain/entities/workout.entity';
import { findBestSet } from '@/workout/domain/services/workout-metrics.service';

type WorkoutExerciseItem = {
  exercise: Exercise;
};

export default function WorkoutExerciseItem({ exercise }: WorkoutExerciseItem) {
  const bestSet = findBestSet(exercise.sets);
  const { highlightRow } = useStyles();

  return (
    <Card title={exercise.name}>
      {exercise.sets.map((exerciseSet, index) => (
        <ThemedView
          key={exerciseSet.id}
          style={[
            styles.setRow,
            {
              backgroundColor:
                bestSet?.id === exerciseSet.id
                  ? highlightRow.backgroundColor + 50
                  : 'transparent',
            },
          ]}
        >
          <ThemedText style={styles.setIndex}>{index + 1}</ThemedText>
          <ThemedText style={styles.setInfo}>
            {exerciseSet.reps}{' '}
            {exerciseSet.weight ? `x ${exerciseSet.weight}kg` : 'reps'}
          </ThemedText>
          {exerciseSet.oneRm && (
            <ThemedText style={styles.setOneRm}>
              {Math.floor(exerciseSet.oneRm)} kg
            </ThemedText>
          )}
        </ThemedView>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  setRow: { flexDirection: 'row', gap: 8, padding: 8 },
  setIndex: {
    fontSize: 16,
    color: 'gray',
  },
  setInfo: {
    fontSize: 16,
  },
  setOneRm: {
    fontSize: 16,
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
});

const useStyles = createStyleSheet(({ colors }) => ({
  highlightRow: {
    backgroundColor: colors.tint,
  },
}));
