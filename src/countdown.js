import React, { Component, PropTypes } from 'react';
import {
  Text
} from 'react-native';
import numeral from 'numeral';
import moment from 'moment';

const diffFromNow = (date) => {
  return ( moment(date).toDate().getTime() - new Date().getTime()) / 1000;
};

export default class Countdown extends Component {
  static propTypes = {
    finalDate: PropTypes.any.isRequired,
    onEndTime: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      seconds: diffFromNow(props.finalDate)
    };
  }

  componentDidMount() {
    const {finalDate} = this.props;
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

  componentWillUnmount() {
    if (this.state.countdown) {
      clearTimeout(this.state.countdown);
    }
  }

  render() {
    const seconds = this.state.seconds > 0 ? this.state.seconds : 0;
    return (
      <Text style={this.props.style}>
        { numeral(seconds).format('00:00:00') }
      </Text>
    )
  }
}
