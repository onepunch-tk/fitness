import { Redirect, router, Stack } from 'expo-router';
import { FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet } from 'stylo-native';
import ExerciseModal from '@/exercise/presentation/components/exercise-modal.component';
import CustomButton from '@/shared/presentation/components/custom-button.component';
import ExerciseLogger from '../components/exercise-logger.component';
import WorkoutHeader from '../components/workout-header.component';
import { useWorkoutStore } from '../store/workout.store';

export default function CurrentWorkoutScreen() {
  const currentWorkout = useWorkoutStore((s) => s.currentWorkout);
  const finishWorkout = useWorkoutStore((s) => s.finishWorkout);
  const addExercise = useWorkoutStore((s) => s.addExercise);

  if (!currentWorkout) return <Redirect href="/" />;

  const handleFinishWorkout = () => {
    finishWorkout();
    router.dismissTo('/');
  };

  return (
    // <KeyboardAwareList
    //   type="FlatList"
    //   data={[1, 2, 3]}
    //   contentContainerStyle={{ gap: 10, padding: 10 }}
    //   renderItem={() => <ExerciseLogger />}
    // />
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomButton
              onPress={handleFinishWorkout}
              title="Finish"
              style={styles.headerButton}
            />
          ),
        }}
      />
      <SafeAreaView edges={['bottom']}>
        <FlatList
          data={currentWorkout?.exercises}
          renderItem={({ item }) => <ExerciseLogger exercise={item} />}
          renderScrollComponent={() => (
            <KeyboardAwareScrollView bottomOffset={20} />
          )}
          ListHeaderComponent={<WorkoutHeader />}
          ListFooterComponent={
            <ExerciseModal
              onSelectExercise={(exercise) =>
                addExercise(exercise.id, exercise.name)
              }
            />
          }
        />
      </SafeAreaView>
    </>
  );
}

const styles = createStyleSheet({
  headerButton: {
    padding: 7,
    width: 'auto',
    paddingHorizontal: 15,
  },
});
