import React, {Component} from 'react';
import PropTypes from 'prop-types'
import moment from 'moment';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
const getMes = date => moment(date).format('MMMM');
const getDia = date => moment(date).format('DD');

export default function DiaItem({data, style, diaStyle, mesStyle, children}) {

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.mes, mesStyle]}>
        {getMes(data)}
      </Text>
      <Text style={[styles.dia, diaStyle]}>
        {getDia(data)}
      </Text>
      { children }
    </View>
  );
}

DiaItem.propTypes = {
  data: PropTypes.object.isRequired
}

const styles = {
  container: {
    alignItems: 'center'
  },
  dia: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  mes: {

  }
}
