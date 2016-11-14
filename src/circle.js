// @flow

import React, {Component, PropTypes} from 'react';
import {
  PixelRatio,
  View
} from 'react-native';

type Props = {
  size: number,
  style: any,
  children: any
}

function Circle({size, style, children}: Props) {

  return (
    <View style={[{
        height: size,
        width: size,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: size / 2
      }, style]}>
      {children}
    </View>
  );
}

export default Circle;
