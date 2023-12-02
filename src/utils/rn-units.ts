import {Dimensions, Platform} from 'react-native';

export const isIOS = Platform.OS === 'ios';

export const isAndroid = Platform.OS === 'android';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
const isLandscape = screenWidth > screenHeight;
const base = isLandscape ? screenHeight : screenWidth;

const magicNumber = 375;

export const rem = (size = 0): number =>
  Math.floor((base / magicNumber) * size);
