import { useState } from 'react';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { createStyleSheet } from 'stylo-native';
import CustomButton from '@/shared/presentation/components/custom-button.component';
import {
  ThemedText,
  ThemedTextInput,
  ThemedView,
} from '@/shared/presentation/components/themed.component';
import type { ExerciseSet } from '@/workout/domain/entities/workout.entity';

type SetItem = {
  index: number;
  set: ExerciseSet;
};

export default function SetItem({ index, set }: SetItem) {
  const [weight, setWeight] = useState(set.weight?.toString() || '');
  const [reps, setReps] = useState(set.reps?.toString() || '');

  const handleWeightChange = () => {};
  const handleRepsChagne = () => {};

  const renderRightActions = () => (
    <CustomButton
      onPress={() => console.log('Deleting set: ', set.id)}
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
