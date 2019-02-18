import React, { Component} from 'react';
import PropTypes from 'prop-types'
import {
  FormLabel
} from 'react-native-elements'
import {
  FormInput
} from 'eureka-rn-components';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'

export default class Password extends React.Component {
  state = {
    securePassword: true
  }

  render() {
    const {labels, customStyles, onChangeText, value} = this.props
    return (
      <View>
        <FormLabel
          labelStyle={{color: customStyles.textColor}}
        >
          { labels.password }
        </FormLabel>
        <FormInput
          inputStyle={{color: customStyles.textColor}}
          containerStyle={{borderBottomColor: customStyles.textColor}}
          required
          valid={ password => password.length >= 1 }
          message={ labels.passwordLenghtValidation }
          value={ value }
          onChangeText={onChangeText}
          messageStyle={{color: customStyles.validationTextColor}}
          keyboardAppearance={customStyles.keyboardAppearance}
          selectionColor={customStyles.textColor}
          underlineColorAndroid={customStyles.textColor}
          secureTextEntry={this.state.securePassword}/>
        <TouchableOpacity
          style={{position: 'absolute', top: 30, right: 20}}
          onPress={() => this.setState({securePassword: !this.state.securePassword})} >
          <Icon name='visibility' color={customStyles.visibilityColor || 'white'}/>
        </TouchableOpacity>
      </View>
    );
  }
}
