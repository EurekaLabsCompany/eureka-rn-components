import React from 'react';
import PropTypes from 'prop-types'

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

function ButtonSecond({title, onPress, style, textStyle}) {
  return (
    <TouchableOpacity onPress={onPress}
      style={[
        styles.container, style
      ]}>
      <Text style={[
          styles.title,
          textStyle
        ]}>{title}</Text>
    </TouchableOpacity>
  )
}

ButtonSecond.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  textStyle: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 16
  }
});

export default ButtonSecond;
