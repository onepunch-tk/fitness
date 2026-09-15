import { createStyleSheet } from 'stylo-native';
import Card from '@/shared/presentation/components/card.component';
import CustomButton from '@/shared/presentation/components/custom-button.component';
import {
  ThemedText,
  ThemedView,
} from '@/shared/presentation/components/themed.component';
import type { ExerciseSet } from '@/workout/domain/entities/workout.entity';
import SetItem from './set-item.component';

export default function ExerciseLogger() {
  const sets: ExerciseSet[] = [
    {
      id: '1',
      weight: 20,
      reps: 10,
    },
    {
      id: '2',
      weight: 50,
      reps: 5,
    },
    {
      id: '3',
      weight: 20,
      reps: 15,
    },
    {
      id: '4',
      weight: 10,
      reps: 17,
    },
  ];

  return (
    <Card title="Exercise">
      <ThemedView style={styles.header}>
        <ThemedText style={styles.setNumber}>Set</ThemedText>
        <ThemedText style={styles.setInfo}>Kg</ThemedText>
        <ThemedText style={styles.setInfo}>Reps</ThemedText>
      </ThemedView>
      <ThemedView style={{ gap: 5 }}>
        {sets.map((item, index) => (
          <SetItem key={item.id} index={index} set={item} />
        ))}
      </ThemedView>
      <CustomButton
        onPress={() => console.log('Adding set')}
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
