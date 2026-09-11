import { Stack } from 'expo-router';

/** 앱 전체의 진입점. 각 도메인의 스키마를 모아 DB를 초기화한 뒤 화면을 그린다. */
export default function RootLayout() {
  // const [isReady, setIsReady] = useState(false);

  // useEffect(() => {
  //   initializeDatabase([WORKOUT_SCHEMA]).then(() => setIsReady(true));
  // }, []);

  // if (!isReady) {
  //   return <ActivityIndicator style={styles.loading} />;
  // }

  return <Stack />;
}
