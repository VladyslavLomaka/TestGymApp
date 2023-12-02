import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {rem} from '@utils/rn-units';
import {font} from '@utils/styles';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onPress: () => void;
  isLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = ({
  text,
  disabled,
  onPress,
  isLoading,
  containerStyle,
  textContainerStyle,
  textStyle,
}: ButtonProps) => {
  const isButtonDisabled = disabled || isLoading;

  return (
    <Touchable
      hitSlop={SMALL_BUTTON_HIT_SLOP}
      disabled={isButtonDisabled}
      onPress={onPress}
      style={[containerStyle, disabled ? styles.disabledOpacity : {}]}>
      <View style={[styles.touchable, textContainerStyle]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderWidth: 1.5,
    borderRadius: rem(5),
    paddingVertical: rem(9),
    backgroundColor: COLORS.softPurple,
    borderColor: COLORS.softPurple,
  },
  text: {
    textAlign: 'center',
    ...font(24, 30, 'light', 'lightWhite'),
  },
  disabledOpacity: {
    opacity: 0.5,
  },
});
