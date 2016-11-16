import React, { PropTypes } from 'react';
import {
  Circle
} from './circle';
import {
  View
} from 'react-native';

function LineCircle ({children,
  circleSize = 60,
  lineColor = '#c4c4c4',
  lineWidth= 0.5,
  showTopLine = true,
  showBottomLine = true,
  circleStyle}) {

  const styles = createStyles(lineWidth, lineColor);
  return (
    <View style={styles.container}>
      { showTopLine ? <View style={styles.line} /> : null }
      <Circle size={circleSize} style={[styles.circle, circleStyle]}>
        { children }
      </Circle>
      { showBottomLine ? <View style={styles.line} /> : null }
    </View>
  );
}

LineCircle.propTypes = {
  circleSize: PropTypes.number,
  lineColor: PropTypes.string,
  lineWidth: PropTypes.number,
  showTopLine: PropTypes.bool,
  showBottomLine: PropTypes.bool,
  circleStyle: PropTypes.object
};

const createStyles = (lineWidth, lineColor) => ({
  container: {
    alignItems: 'center'
  },
  line: {
    height: 20,
    borderWidth: lineWidth,
    width: lineWidth,
    borderColor: lineColor
  },
  circle: {
    borderColor: lineColor,
    borderWidth: lineWidth + 0.3
  }
});

export default LineCircle;
