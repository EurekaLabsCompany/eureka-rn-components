/* @flow */

import Circle from './circle';
import PropTypes from 'prop-types'
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  InteractionManager
} from 'react-native';

import type {MonthNumber} from './types';

type Month = {
  number: MonthNumber,
  name: string,
  short: string
}

type MonthOptions = {
  backgroundColor: string,
  color: string,
  name: string,
  size: number,
  fontSize: number
}

type Props = {
  month: MonthNumber,
  circleStyle: Object,
  onMonthChange: (selected: MonthNumber) => void
}

const months: Month[] = [{
  number: 1,
  name: 'Janeiro',
  short: 'Jan'
}, {
  number: 2,
  name: 'Fevereiro',
  short: 'Fev'
}, {
  number: 3,
  name: 'Março',
  short: 'Mar'
}, {
  number: 4,
  name: 'Abril',
  short: 'Abr'
}, {
  number: 5,
  name: 'Maio',
  short: 'Mai'
}, {
  number: 6,
  name: 'Junho',
  short: 'Jun'
}, {
  number: 7,
  name: 'Julho',
  short: 'Jul'
}, {
  number: 8,
  name: 'Agosto',
  short: 'Ago'
}, {
  number: 9,
  name: 'Setembro',
  short: 'Set'
}, {
  number: 10,
  name: 'Outubro',
  short: 'Out'
}, {
  number: 11,
  name: 'Novembro',
  short: 'Nov'
}, {
  number: 12,
  name: 'Dezembo',
  short: 'Dez'
}];

function getMonthOptions(month: Month, selected: MonthNumber): MonthOptions {
  const active = selected === month.number
  return {
      backgroundColor: active ?  '#4c4c4c' : '#c4c4c4',
      color: active ?  'white' : '#2b2b2b',
      size: active ? 50 : 40,
      name: month.short,
      fontSize: active ? 18: 14
  };
}

type State = {
  selected: MonthNumber
};

export default class MonthLinePicker extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      selected: this.props.month || 0
    };
  }

  handleMonthPress(selected: MonthNumber) {
    if (this.props.month) {
      this.props.onMonthChange && this.props.onMonthChange(selected);
      return;
    }
    this.setState({selected});
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.month !== undefined) {
      this.setState({selected: nextProps.month});
    }
  }

  componentDidMount() {
    const {width} = Dimensions.get('window');
    const {selected} = this.state;
    const elementWidth = 55;
    const center = width / 2;
    const distance = selected * elementWidth;
    const maxDistance = elementWidth * 12;

    if (distance > maxDistance - center) {
      InteractionManager.runAfterInteractions(() =>
        this.refs.scrollView.scrollTo({x: maxDistance + 15 - width})
      );
      return;
    }

    if (distance > center) {
      const diff = distance - center;
      InteractionManager.runAfterInteractions(() =>
        this.refs.scrollView.scrollTo({x: diff - 15})
      );
    }

  }

  renderMonth(month: Month): ?Element {
    const {
      size,
      backgroundColor,
      color,
      name,
      fontSize
    } = getMonthOptions(month, this.state.selected);

    return (
      <TouchableOpacity
        key={month.number}
        onPress={() => this.handleMonthPress(month.number)}>
        <Circle
          style={[{
            marginLeft: 15,
            backgroundColor
          }, this.props.circleStyle]}
          size={size}>
          <Text style={{
              color,
              fontWeight: 'bold',
              fontSize
            }}>
            {name}
          </Text>
        </Circle>
      </TouchableOpacity>
    )
  }

  render() {

    return (
      <View>
        <ScrollView
          ref='scrollView'
          horizontal={true}>
          <View style={styles.container}>
            { months.map(this.renderMonth.bind(this)) }
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = {
  container: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    alignItems: 'center'
  },
}
