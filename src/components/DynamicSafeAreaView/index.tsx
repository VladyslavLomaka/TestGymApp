import React, {useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface DynamicSafeAreaViewProps {
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
}

export const DynamicSafeAreaView = ({
  style,
  children,
}: DynamicSafeAreaViewProps) => {
  const {top, bottom} = useSafeAreaInsets();

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        // eslint-disable-next-line react-native/no-unused-styles
        dynamicPadding: {
          paddingTop: top,
          paddingBottom: bottom > 0 ? bottom : 16,
        },
      }),
    [top, bottom],
  );

  return <View style={[dynamicStyles.dynamicPadding, style]}>{children}</View>;
};
