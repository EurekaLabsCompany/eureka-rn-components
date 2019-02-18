import React , { Component} from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Platform
} from 'react-native';
import {
  FormInput
} from 'react-native-elements';

const EkInpuMessageValidation = (props) => {
  const styles = {
    wrapper: {
      marginBottom: 10
    },
    message: {
      marginLeft: 20,
      color: '#b70000',
      fontSize: 12,
      position: 'absolute',
      top: Platform.OS === 'ios' ? 40 : 30
    }
  };
  const messageValidation = props.message ?
    <Text style={[styles.message, props.messageStyle]}>{props.message}</Text> : null;
  return (
    <View style={styles.wrapper}>
      <FormInput
        {...props} />
      {messageValidation}
    </View>
  )
}

export default class EkInput extends Component {
  static propTypes = {
    valid: PropTypes.func,
    message: PropTypes.string,
    required: PropTypes.bool
  }

  static contextTypes = {
    addFormListener: PropTypes.func,
    removeFormListener: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      validValue: true,
      dirty: false,
      text: props.value
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        text: nextProps.value
      })
  }

  isEmpty(text) {
    return  text === undefined || text === null || text === '';
  }

  doValidations() {
    this.setState({
      dirty: true,
      ...this._doValidations(this.state.text)
    });
  }

  isValid() {
    const {required, valid} = this.props;
    const {text} = this.state;
    return (!required || required && text) && (!valid || valid(text));
  }

  _doValidations(text) {
    const {valid, required} = this.props;
    let showRequired = false;
    let validValue = true;

    if (required && this.isEmpty(text)) {
      showRequired = true;
    }

    if (valid) {
      validValue = valid(text || '');
    }

    return {
      showRequired,
      validValue
    };
  }

  handleBlur() {
    this.props.onBlur && this.props.onBlur();
    this.setState({
      ...this._doValidations(this.state.text),
      dirty: true
    });
  }

  handleChange(text) {
    const {required, valid, onChangeText} = this.props;
    let showRequired = false;
    let validValue = true;

    if (!this.state.dirty) {
      this.setState({text});
      onChangeText && onChangeText(text);
      return;
    }

    this.setState({
      ...this._doValidations(text),
      text
    });

    onChangeText && onChangeText(text);
  }

  onSubmit() {
    this.doValidations();
    return !this.isValid();
  }

  componentDidMount() {
    this.context.addFormListener && this.context.addFormListener(this.onSubmit);
  }

  componentWillUnmount() {
    this.context.removeFormListener && this.context.removeFormListener(this.onSubmit);
  }

  render() {
    let msg = this.state.validValue ? null : this.props.message;
    if (this.state.showRequired) {
      msg = 'Este campo é obrigatório';
    }

    return (
      <EkInpuMessageValidation
        {...this.props}
        onChangeText={this.handleChange}
        onBlur={this.handleBlur}
        message={msg}/>
    );
  }
}
