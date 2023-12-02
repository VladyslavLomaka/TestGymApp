import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const BackIcon = (props: SvgProps) => (
  <Svg width={40} height={40} viewBox="0 0 1024 1024" {...props}>
    <Path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
    <Path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />
  </Svg>
);
