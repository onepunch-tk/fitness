import { useState } from 'react';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { createStyleSheet } from 'stylo-native';
import type { Id } from '@/shared/domain/id';
import CustomButton from '@/shared/presentation/components/custom-button.component';
import {
  ThemedText,
  ThemedTextInput,
  ThemedView,
} from '@/shared/presentation/components/themed.component';
import type { ExerciseSet } from '@/workout/domain/entities/workout.entity';
import { useWorkoutStore } from '../store/workout.store';

type SetItem = {
  index: number;
  set: ExerciseSet;
  workoutExerciseId: Id;
};

export default function SetItem({ index, set, workoutExerciseId }: SetItem) {
  const [weight, setWeight] = useState(set.weight?.toString() || '');
  const [reps, setReps] = useState(set.reps?.toString() || '');
  const updateSet = useWorkoutStore((s) => s.updateSet);
  const deleteSet = useWorkoutStore((s) => s.deleteSet);

  const handleWeightChange = () => {
    updateSet(workoutExerciseId, set.id, { weight: parseFloat(weight) });
  };
  const handleRepsChagne = () => {
    updateSet(workoutExerciseId, set.id, { reps: parseInt(reps, 10) });
  };

  const renderRightActions = () => (
    <CustomButton
      onPress={() => deleteSet(workoutExerciseId, set.id)}
      title="Delete"
      type="link"
      style={{ width: 'auto', padding: 5 }}
      color="crimson"
    />
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.setNumber}>{index + 1}</ThemedText>
        <ThemedTextInput
          placeholder="50"
          value={weight}
          onChangeText={setWeight}
          style={styles.input}
          keyboardType="numeric"
          onBlur={handleWeightChange}
        />
        <ThemedTextInput
          placeholder="8"
          value={reps}
          onChangeText={setReps}
          style={styles.input}
          keyboardType="numeric"
          onBlur={handleRepsChagne}
        />
      </ThemedView>
    </Swipeable>
  );
}

const styles = createStyleSheet({
  container: { flexDirection: 'row', gap: 5, alignItems: 'center' },
  setNumber: { marginRight: 'auto', fontWeight: 'bold', fontSize: 16 },
  input: {
    width: 60,
    padding: 5,
    paddingVertical: 7,
    fontSize: 16,
    textAlign: 'center',
  },
});
