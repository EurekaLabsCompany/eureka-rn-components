import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#d4d4d4',
    marginTop: 10
  },
});

export default function Separator() {
  return (
    <View style={styles.separator} />
  );
}
