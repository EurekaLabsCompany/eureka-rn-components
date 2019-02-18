import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    StyleSheet,
    Image,
    View,
    PixelRatio,
    Text
} from 'react-native';

const createStyle = (size: number) => ({
  image: {
    height: size,
    width: size,
    borderRadius: size / 2
  },
  container: {
    alignItems: 'center'
  }
});

export default function Avatar({style, imageStyle, image, description, size = 40}) {
  const styles = createStyle(size);
  let descElement = description;

  if (typeof description === 'string' ) {
    descElement = <Text>{description}</Text>
  }

  if (!image) return (<Text>?</Text>);

  return (
    <View style={[styles.container, style]}>
      <Image
        style={[imageStyle, styles.image]}
        source={image} />
      { descElement }
    </View>
  );
}

Avatar.propTypes = {
  image: PropTypes.any.isRequired,
  description: PropTypes.any,
  style: PropTypes.any,
  size: PropTypes.number
}
