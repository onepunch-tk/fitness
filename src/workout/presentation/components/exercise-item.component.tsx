import { createStyleSheet, useStyles } from 'stylo-native';
import Card from '@/shared/presentation/components/card.component';
import {
  ThemedText,
  ThemedView,
} from '@/shared/presentation/components/themed.component';
import type { WorkoutExercise } from '@/workout/domain/entities/workout.entity';
import { findBestSet } from '@/workout/domain/services/workout-metrics.service';

type WorkoutExerciseItem = {
  exercise: WorkoutExercise;
};

export default function ExerciseItem({ exercise }: WorkoutExerciseItem) {
  const bestSet = findBestSet(exercise.sets);
  const s = useStyles(styles);

  return (
    <Card title={exercise.name}>
      {exercise.sets.map((exerciseSet, index) => (
        <ThemedView
          key={exerciseSet.id}
          style={[s.setRow, bestSet?.id === exerciseSet.id && s.highlightRow]}
        >
          <ThemedText style={s.setIndex}>{index + 1}</ThemedText>
          <ThemedText style={s.setInfo}>
            {exerciseSet.reps}{' '}
            {exerciseSet.weight ? `x ${exerciseSet.weight}kg` : 'reps'}
          </ThemedText>
          {exerciseSet.oneRm && (
            <ThemedText style={s.setOneRm}>
              {Math.floor(exerciseSet.oneRm)} kg
            </ThemedText>
          )}
        </ThemedView>
      ))}
    </Card>
  );
}

const styles = createStyleSheet((t) => ({
  setRow: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
    backgroundColor: 'transparent',
  },
  highlightRow: {
    backgroundColor: `${t.colors.tint}50`,
  },
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
}));
