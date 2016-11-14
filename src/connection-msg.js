import React, {Component, PropTypes}  from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class ConnectionMsg extends Component {
  static propTypes = {
    msg: PropTypes.string,
    textStyle: PropTypes.object,
    style: PropTypes.object,
    pingUrl: PropTypes.string.isRequired,
    show: PropTypes.bool,
    onReconnect: PropTypes.func,
    interval: PropTypes.number
  }

  ping() {
    const {pingUrl, onReconnect = () => {}, interval = 5000} = this.props;

    this.pingInterval = setInterval(() => {
      fetch(pingUrl)
        .then(() => {
          onReconnect();
          clearTimeout(this.pingInterval);
        });
    }, interval);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.ping();
    }
  }

  componentDidMount() {
    if (this.props.show) {
      this.ping();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.pingInterval);
  }

  render() {
    if (!this.props.show) return null;
    const msg = this.props.msg || 'Aguardando conexão com servidor...';
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{msg}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'orange',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default ConnectionMsg;
