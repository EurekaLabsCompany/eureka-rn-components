import React, {PropTypes, Component} from 'react';
import {
  FormLabel,
  Button
} from 'react-native-elements'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Form from './form';
import FormInput from './form-input';

const Validation = ({style, message}) => (
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
  static PropTypes = {
      onSubmit: PropTypes.func,
      light: PropTypes.bool
  }
  static contextTypes = {
    primaryColor: PropTypes.string,
    dark: PropTypes.object,
    light: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  renderSubmit(submit) {
    return (
      <Button
        Component={TouchableOpacity}
        onPress={submit}
        buttonStyle={{
          marginTop: 15,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: 'white',
        }}
        raised
        icon={{name: 'check'}}
        title='Entrar' />
    );
  }

  handleSubmit() {
    const {onSubmit = () => {},} = this.props;
    const {username, password} = this.state;
    onSubmit(username, password);
  }

  render() {
    const {style, light, errorMessage} = this.props;
    const {username, password} = this.state;
    let styles = {
      input: {},
      message: {}
    };
    if (light) {
      styles.input.color = this.context.light.text.color;
      styles.message.color = this.context.light.warn.color;
    }

    return (
      <Form style={style}
        onSuccess={this.handleSubmit.bind(this)}
        submitButton={this.renderSubmit.bind(this)}>
        {errorMessage ? <Validation
          style={this.context.light.warn}
          message={errorMessage}/> : null}
        <FormLabel
          labelStyle={styles.input}
          >
          Usuário
        </FormLabel>
        <FormInput
          inputStyle={styles.input}
          placeholder={'CPF'}
          placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
          value={username}
          messageStyle={styles.message}
          selectionColor='white'
          onChangeText={username => this.setState({username})}
          keyboardAppearance='light'
          underlineColorAndroid='white'
          keyboardType='numeric'
          required/>
        <FormLabel
          labelStyle={styles.input}
          >
          Senha
        </FormLabel>
        <FormInput
          inputStyle={styles.input}
          required
          valid={password => password.length >= 4}
          message='Senha dever ter 4 ou mais digitos'
          value={password}
          onChangeText={password => this.setState({password})}
          selectionColor='white'
          keyboardAppearance='light'
          underlineColorAndroid='white'
          messageStyle={styles.message}
          secureTextEntry={true}/>
      </Form>
    );
  }
}
