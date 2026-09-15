import { Stack } from 'expo-router';
import { FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet } from 'stylo-native';
import ExerciseModal from '@/exercise/presentation/components/exercise-modal.component';
import CustomButton from '@/shared/presentation/components/custom-button.component';
import ExerciseLogger from '../components/exercise-logger.component';
import WorkoutHeader from '../components/workout-header.component';

export default function CurrentWorkoutScreen() {
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
              onPress={() => console.log('Finish workout')}
              title="Finish"
              style={styles.headerButton}
            />
          ),
        }}
      />
      <SafeAreaView edges={['bottom']}>
        <FlatList
          data={[1, 2, 3]}
          renderItem={() => <ExerciseLogger />}
          renderScrollComponent={() => (
            <KeyboardAwareScrollView bottomOffset={20} />
          )}
          ListHeaderComponent={<WorkoutHeader />}
          ListFooterComponent={
            <ExerciseModal
              onSelectExercise={(exercise) =>
                console.log('Exercise selected: ', exercise)
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
