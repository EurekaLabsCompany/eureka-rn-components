import React, { Component, PropTypes } from 'react';
import {
  Text
} from 'react-native';
import numeral from 'numeral';
import moment from 'moment';

const diffFromNow = (date) => {
  return ( moment(date).toDate().getTime() - new Date().getTime()) / 1000;
};

function removeStartZeros (time) {
  return time.replace(/^00:/, '').replace(/^00:/, '');
}

export default class Countdown extends Component {
  static propTypes = {
    finalDate: PropTypes.any.isRequired,
    onEndTime: PropTypes.func,
    showZeros: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      seconds: diffFromNow(props.finalDate)
    };
  }

  updateCountdown(finalDate) {
    const countdown = function () {
      const { seconds = 0 } = this.state;
      this.setState({
        seconds: diffFromNow(finalDate)
      });

      if (seconds - 1 > 0) {
        this.state.countdown = setTimeout(countdown.bind(this), 1000);
      } else {
        this.props.onEndTime && this.props.onEndTime();
      }
    }

    this.state.countdown = setTimeout(countdown.bind(this), 1000);
  }

  componentDidMount() {
    this.updateCountdown(this.props.finalDate);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.finalDate != nextProps.finalDate) {
      clearTimeout(this.state.countdown);
      this.updateCountdown(nextProps.finalDate);
    }
  }

  componentWillUnmount() {
    if (this.state.countdown) {
      clearTimeout(this.state.countdown);
    }
  }

  render() {
    const seconds = this.state.seconds > 0 ? this.state.seconds : 0;
    const format = x => this.props.showZeros ?
      numeral(x).format('00:00:00') : removeStartZeros(numeral(x).format('00:00:00'));

    return (
      <Text style={this.props.style}>
        { format(seconds) }
      </Text>
    )
  }
}
