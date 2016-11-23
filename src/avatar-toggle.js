import React, {PropTypes, Component} from 'react';
import Avatar from './avatar';
import {
  TouchableOpacity
} from 'react-native';

export default class AvatarToggle extends Component{
  static propTypes = {
    active: PropTypes.bool,
    defaultValue: PropTypes.bool,
    onChange: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      active: props.active || props.defaultValue
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.onChange && this.props.onChange(this.state.active);
    if (this.props.active === undefined) {
      this.setState({active: !this.state.active});
    }
  }

  isActive() {
    return this.active;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== undefined) {
      this.setState({active: nextProps.active});
    }
  }

  render() {
    const opacity = this.state.active ? 1 : 0.4;
    return (
      <TouchableOpacity onPress={this.toggle}>
        <Avatar {...this.props} style={[this.props.style, {opacity}]}/>
      </TouchableOpacity>
    )
  }
}
