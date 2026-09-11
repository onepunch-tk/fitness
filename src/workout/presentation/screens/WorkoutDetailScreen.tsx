import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import type { Id } from '@/shared/domain/id';

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: Id }>();
  return (
    <View>
      <Text>Workout Detail Screen: {id}</Text>
    </View>
  );
}
