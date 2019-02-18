import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
  FormLabel,
  Button
} from 'react-native-elements'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {
  Form,
  FormInput
} from 'eureka-rn-components';
import Username from './username';
import Password  from './password';

const MsgValidation = ({style, message}) => (
  <Text style={[
      style,
      {
        position: 'absolute',
        left: 20,
        top: -10
      }
    ]}>
    {message}
  </Text>
);

export default class Login extends Component {
  static propTypes = {
      onSubmit: PropTypes.func,
      light: PropTypes.bool,
      validationMessage: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  getLabels() {
    const defaults = {
      submit: 'Entrar',
      username: 'Email',
      password: 'Senha',
      forgetPassword: 'Esqueci minha Senha',
      passwordLenghtValidation: 'Senha dever ter 4 ou mais digitos'
    };
    return {...defaults, ...this.props.labels};
  }

  getCustomStyles() {
    return {
      messageValidationColor: '#c4c4c4',
      text: '#ffffff',
      ...this.props.customStyles
    };
  }

  renderSubmit(submit) {
    const { customStyles = {}} = this.props;
    const labels = this.getLabels();
    return (
      <Button
        Component={ TouchableOpacity }
        onPress={ submit }
        buttonStyle={[{
          marginTop: 15,
        }, customStyles.submit]}
        raised
        icon={{name: 'check'}}
        title={ labels.submit } />
    );
  }

  handleSubmit() {
    //todo: fazer requisição para login
    const {onSubmit = () => {}} = this.props;
    const {username, password} = this.state;
    onSubmit(username, password);
  }

  renderFormFields() {
    const { style, validationMessage } = this.props;
    const customStyles = this.getCustomStyles();
    const labels = this.getLabels();
    const { username, password } = this.state;

    return (
      <Form style={style}
        onSuccess={this.handleSubmit.bind(this)}
        submitButton={this.renderSubmit.bind(this)}>
        { validationMessage ? <MsgValidation
            style={{color: customStyles.messageValidationColor}}
            message={validationMessage}/> : null }
        <Username
          label={ labels.username }
          value={ username }
          onChangeText={username => this.setState({username})}
          customStyles={customStyles } />
        <Password
          labels={ labels }
          value={ password }
          customStyles={ customStyles }
          onChangeText={password => this.setState({password})} />
      </Form>
    );
  }

  render() {


    return (
      <View>
        { this.renderFormFields() }
        { this.props.socialButtons }
      </View>

    );
  }
}
