import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Modal, Pressable } from 'react-native';
import { createStyleSheet } from 'stylo-native';
import type { Exercise } from '@/exercise/domain/entities/exercise.entity';
import { exerciseListUsecase } from '@/exercise/exercise.composition';
import Card from '@/shared/presentation/components/card.component';
import CustomButton from '@/shared/presentation/components/custom-button.component';
import {
  ThemedText,
  ThemedTextInput,
  ThemedView,
} from '@/shared/presentation/components/themed.component';

type ExerciseModal = {
  onSelectExercise: (exercise: Exercise) => void;
};

export default function ExerciseModal({ onSelectExercise }: ExerciseModal) {
  const [isOpen, setIsOpen] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState('');

  const filteredExercises = useMemo(() => {
    if (search.trim() === '') return exercises;

    return exercises.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [exercises, search]);

  useEffect(() => {
    const fetchExerciseList = async () => {
      const data = await exerciseListUsecase.execute();
      setExercises(data);
    };

    fetchExerciseList();
  }, []);

  return (
    <>
      <CustomButton
        title="Select Exercise"
        style={styles.button}
        onPress={() => setIsOpen(true)}
      />
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <ThemedView style={styles.modalOverlay}>
          <Card title="Select Exercise" style={styles.modalContent}>
            <FontAwesome5
              name="window-close"
              size={24}
              color="gray"
              onPress={() => setIsOpen(false)}
              style={styles.closeIcon}
            />

            <ThemedTextInput
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />

            <FlatList
              data={filteredExercises}
              contentContainerStyle={{ gap: 20 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onSelectExercise(item);
                    setIsOpen(false);
                  }}
                >
                  <ThemedText style={styles.exerciseTitle}>
                    {item.name}
                  </ThemedText>
                  <ThemedText style={styles.exerciseMuscle}>
                    {item.muscle}
                  </ThemedText>
                </Pressable>
              )}
            />
          </Card>
        </ThemedView>
      </Modal>
    </>
  );
}

const styles = createStyleSheet({
  button: {
    marginBottom: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  exerciseTitle: {
    fontWeight: 'bold',
  },
  exerciseMuscle: {
    color: 'gray',
  },
  searchInput: {
    padding: 10,
    marginVertical: 10,
  },
});
