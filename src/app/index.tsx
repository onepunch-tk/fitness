import { Link } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/shared/presentation/components/GeneralTheme';
import { createStyleSheet } from '@/shared/presentation/stylesheet';

/** 라우트 파일은 화면 컴포넌트를 연결만 한다. 로직은 도메인 폴더에 둔다. */
export default function HomePage() {
  const styles = useStyles();

  return (
    <View style={{ flex: 1, alignItems: 'center', gap: 10 }}>
      <Text>Title </Text>
      <Link href="/workout/current" style={styles.text}>
        Resume Current Workout
      </Link>
      <Link href="/workout/123">Open Workout with id 123</Link>

      <Text>Home Page</Text>
    </View>
  );
}

const useStyles = createStyleSheet(({ colors, spacing, radius }) => ({
  text: {
    color: colors.text,
  },
}));
