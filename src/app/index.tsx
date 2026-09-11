import { Link } from 'expo-router';
import { Text, View } from 'react-native';

/** 라우트 파일은 화면 컴포넌트를 연결만 한다. 로직은 도메인 폴더에 둔다. */
export default function HomePage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', gap: 10 }}>
      <Link href="/workout/current">Resume Current Workout</Link>
      <Link href="/workout/123">Open Workout with id 123</Link>

      <Text>Home Page</Text>
    </View>
  );
}
