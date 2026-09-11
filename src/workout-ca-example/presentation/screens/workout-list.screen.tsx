import { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Screen } from '@/common/presentation/components/screen';
import { WorkoutItem } from '@/workout-ca-example/presentation/components/workout-item';
import { useWorkoutStore } from '@/workout-ca-example/presentation/store/workout.store';

export function WorkoutListScreen() {
  const { workouts, isLoading, load, add } = useWorkoutStore();
  const [title, setTitle] = useState('');

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async () => {
    if (title.trim().length === 0) return;
    await add(title);
    setTitle('');
  };

  return (
    <Screen>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="운동 이름"
          value={title}
          onChangeText={setTitle}
        />
        <Button title="추가" onPress={handleAdd} />
      </View>

      <FlatList
        data={workouts}
        keyExtractor={(workout) => workout.id}
        renderItem={({ item }) => <WorkoutItem workout={item} />}
        ListEmptyComponent={
          <Text>{isLoading ? '불러오는 중…' : '기록이 없습니다.'}</Text>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});
