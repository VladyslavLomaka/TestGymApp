import {COLORS} from '@constants/colors';
import {FontFamily, FONTS, FontWeight} from '@constants/fonts';
import {rem} from '@utils/rn-units';
import {Dimensions, Platform, StatusBar} from 'react-native';

const {height: screenHeight} = Dimensions.get('screen');
const {height: windowHeight} = Dimensions.get('window');

export const font = (
  fontSize: number,
  lineHeight?: number | null,
  fontWeight: FontWeight = 'regular',
  color: keyof typeof COLORS = 'white',
  fontFamily: FontFamily = 'primary',
) => {
  return {
    fontSize: rem(fontSize),
    lineHeight: lineHeight != null ? rem(lineHeight) : undefined,
    fontFamily: FONTS[fontFamily][fontWeight],
    color: COLORS[color],
  };
};

export const androidTopPadding = () => {
  return {paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0};
};

export const androidBottomPadding = () => {
  return {
    paddingBottom: Platform.OS === 'android' ? screenHeight - windowHeight : 0,
  };
};
