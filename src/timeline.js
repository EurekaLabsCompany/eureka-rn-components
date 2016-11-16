import React, { PropTypes } from 'react';
import LineCircle from './line-circle';
import { ListViewFull, ListItem } from 'eureka-rn-components';
import {
  View,
  Text
} from 'react-native';
import moment from 'moment';

function createDiaHora({
  item,
  isFirst,
  isLast,
  lineColor,
  currentDayColor = 'gray',
  currentDayTextColor = 'white'}) {
  const isCurrentDay = moment(item.startDate).diff(moment(), 'days') === 0;
  const styles = {
    day: {
      fontSize: 18,
      color: isCurrentDay ? currentDayTextColor : null
    },
    time: {
      color: isCurrentDay ? currentDayTextColor : null
    },
    circleStyle: {
      backgroundColor: isCurrentDay ? currentDayColor : null
    }
  };
  return (
    <LineCircle
      circleStyle={styles.circleStyle}
      lineColor={lineColor}
      showTopLine={!isFirst}
      showBottomLine={!isLast}>
      <Text style={styles.day}>
        { moment(item.startDate).format('DD') }
      </Text>
      <Text style={styles.time}>
        { moment(item.startDate).format('HH:mm') }
      </Text>
    </LineCircle>
  );
}

function createDescription(item) {
  const start = moment(item.startDate).format('HH:mm');
  const end = moment(item.endDate).format('HH:mm');
  return (
    <View>
      <Text style={{fontSize: 16}}>Das {start} as {end}</Text>
      <Text>{item.status}</Text>
    </View>
  )
}

function Timeline({itens, lineColor, currentDayColor, currentDayTextColor}) {
  const renderItem = (item, sectionId, rowId) => {
    const isFirst = rowId == 0;
    const isLast = rowId == itens.length - 1;
    const vAlign = !isFirst && !isLast ? 'center' : isLast ? 'flex-end' : 'flex-start';
    const leftItem = createDiaHora({
      item,
      isFirst,
      isLast,
      currentDayColor,
      currentDayTextColor,
      lineColor
    });
    return (
      <ListItem
        title={item.title}
        style={{paddingTop: 0}}
        leftItemStyle={{width: 100}}
        rightStyle={{justifyContent: vAlign}}
        leftItem={leftItem}
        description={createDescription(item)}/>
    );
  }

  return (
    <ListViewFull
      { ...this.props }
      renderRow={renderItem}
      itens={itens} />
  );
}

Timeline.propTypes = {
  currentDayColor: PropTypes.string,
  currentDayTextColor: PropTypes.string,
  lineColor: PropTypes.string,
  itens: PropTypes.array.isRequired
}


export default Timeline;
