import { StyleSheet, Text, View } from 'react-native';
import type { Workout } from '@/workout-ca-example/domain/entities/workout.entity';

interface WorkoutItemProps {
  workout: Workout;
}

export function WorkoutItem({ workout }: WorkoutItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.title}</Text>
      <Text style={styles.date}>
        {workout.performedAt.toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
});
