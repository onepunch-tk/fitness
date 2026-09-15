import { createStyleSheet } from 'stylo-native';
import Card from '@/shared/presentation/components/card.component';
import CustomButton from '@/shared/presentation/components/custom-button.component';
import {
  ThemedText,
  ThemedView,
} from '@/shared/presentation/components/themed.component';
import type { WorkoutExercise } from '@/workout/domain/entities/workout.entity';
import { useWorkoutStore } from '../store/workout.store';
import SetItem from './set-item.component';

type ExerciseLogger = {
  exercise: WorkoutExercise;
};

export default function ExerciseLogger({ exercise }: ExerciseLogger) {
  const addSet = useWorkoutStore((s) => s.addSet);

  return (
    <Card title={exercise.name}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.setNumber}>Set</ThemedText>
        <ThemedText style={styles.setInfo}>Kg</ThemedText>
        <ThemedText style={styles.setInfo}>Reps</ThemedText>
      </ThemedView>
      <ThemedView style={{ gap: 5 }}>
        {exercise.sets.map((item, index) => (
          <SetItem
            key={item.id}
            index={index}
            set={item}
            workoutExerciseId={exercise.id}
          />
        ))}
      </ThemedView>
      <CustomButton
        onPress={() => addSet(exercise.id)}
        type="link"
        title="+ Add set"
        style={styles.addSetButton}
      />
    </Card>
  );
}

const styles = createStyleSheet({
  header: { flexDirection: 'row', marginVertical: 10, gap: 5 },
  setNumber: { marginRight: 'auto', fontWeight: 'bold' },
  setInfo: {
    width: 60,
    textAlign: 'center',
  },
  addSetButton: {
    padding: 10,
    marginTop: 10,
  },
});
