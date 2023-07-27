import {Text, TextStyle} from 'react-native';
import React, {ComponentProps, FC} from 'react';

interface Props extends ComponentProps<typeof Text> {
  fontWeight?: TextStyle['fontWeight'];
}

const FONT_FAMILY_MAPPING: {
  [key in TextStyle['fontWeight'] as string]: string;
} = {
  '100': 'Lato-Thin',
  '300': 'Lato-Light',
  '400': 'Lato-Regular',
  normal: 'Lato-Regular',
  '500': 'Lato-Bold',
  '700': 'Lato-Bold',
  bold: 'Lato-Bold',
  '900': 'Lato-Black',
};

const CText: FC<Props> = ({fontWeight = 'normal', style, ...rest}) => {
  const _style = [
    {
      fontFamily: FONT_FAMILY_MAPPING[fontWeight],
    },
    style,
  ];

  return <Text style={_style} {...rest} />;
};

export default CText;
