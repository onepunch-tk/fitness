import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

/** 모든 화면의 공통 래퍼. 공통 여백·배경 등은 여기서 관리한다. */
export function Screen({ children }: PropsWithChildren) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
