import { Link } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';
/* 임시 dummy data*/
import workouts from '@/dummyData';
import CustomButton from '@/shared/presentation/components/custom-button.component';
import { ThemedView } from '@/shared/presentation/components/themed.component';
import WorkoutListItem from '../components/workout-list-item.component';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.contianer}>
      <Link href="/workout/current" asChild>
        <CustomButton title="Resume workout" type="primary" />
      </Link>

      <FlatList
        data={workouts}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => <WorkoutListItem workout={item} />}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    gap: 10,
    padding: 10,
    backgroundColor: 'tranparent',
  },
});
