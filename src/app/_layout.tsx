import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import ThemeProvider from '@/shared/presentation/providers/theme.provider';

/** 앱 전체의 진입점. 각 도메인의 스키마를 모아 DB를 초기화한 뒤 화면을 그린다. */
export default function RootLayout() {
  // const [isReady, setIsReady] = useState(false);

  // useEffect(() => {
  //   initializeDatabase([WORKOUT_SCHEMA]).then(() => setIsReady(true));
  // }, []);

  // if (!isReady) {
  //   return <ActivityIndicator style={styles.loading} />;
  // }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <KeyboardProvider>
          <Stack>
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen
              name="workout/current"
              options={{ title: 'Workout' }}
            />
            <Stack.Screen name="workout/[id]" options={{ title: 'Workout' }} />
          </Stack>
        </KeyboardProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
