import { FlashList, type FlashListProps } from '@shopify/flash-list';
import type { ComponentProps } from 'react';
import {
  FlatList,
  type FlatListProps,
  type ScrollViewProps,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';
import { type Edges, SafeAreaView } from 'react-native-safe-area-context';

/** 이 파일은 버츄얼 리스트 재사용 래퍼로 남겨둔다. 도메인 중심 + CA 리뷰에서는 사용처가 없더라도 언급하지 않는다. */

/** 키보드 동작에만 관여하는 prop. ScrollView prop은 목록 컴포넌트가 이미 받으므로 제외한다. */
type KeyboardProps = Omit<
  KeyboardAwareScrollViewProps,
  keyof ScrollViewProps | 'ScrollViewComponent'
>;

type KeyboardAwareList<T> = {
  toolbar?: {
    done?: { text: string };
  };
  edges?: Edges;
} & KeyboardProps &
  (
    | ({ type: 'FlatList' } & FlatListProps<T>)
    | ({ type: 'FlashList' } & FlashListProps<T>)
  );

const DEFAULT_BOTTOM_OFFSET = 20;

/**
 * 목록의 스크롤 컨테이너로 쓰이는 KeyboardAwareScrollView.
 * 목록 컴포넌트가 자기 prop 전체를 스크롤 컨테이너에 넘기므로 bottomOffset 등 키보드 prop도 여기로 도착한다.
 */
function KeyboardAwareScroller({
  bottomOffset,
  ...props
}: ComponentProps<typeof KeyboardAwareScrollView>) {
  return (
    <KeyboardAwareScrollView
      {...props}
      bottomOffset={
        bottomOffset
          ? bottomOffset + DEFAULT_BOTTOM_OFFSET
          : DEFAULT_BOTTOM_OFFSET
      }
    />
  );
}

/** 키보드가 올라올 때 포커스된 input이 가려지지 않게 스크롤하는 목록. `type`으로 FlatList/FlashList를 고른다. */
export default function KeyboardAwareList<T>({
  toolbar,
  edges = ['bottom'],
  ...list
}: KeyboardAwareList<T>) {
  return (
    <SafeAreaView edges={edges} style={{ flex: 1 }}>
      {list.type === 'FlashList' ? (
        <FlashList {...list} renderScrollComponent={KeyboardAwareScroller} />
      ) : (
        // FlatList는 renderScrollComponent를 컴포넌트가 아닌 함수로 호출한다.
        <FlatList
          {...list}
          renderScrollComponent={(props) => (
            <KeyboardAwareScroller {...props} />
          )}
        />
      )}
      {toolbar?.done && (
        <KeyboardToolbar>
          <KeyboardToolbar.Done text={toolbar.done.text} />
        </KeyboardToolbar>
      )}
    </SafeAreaView>
  );
}
