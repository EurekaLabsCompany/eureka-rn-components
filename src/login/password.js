import React, {PropTypes, Component} from 'react';
import {
  FormLabel
} from 'react-native-elements'
import {
  FormInput
} from 'eureka-rn-components';
import { View } from 'react-native';

export default function Password({labels, customStyles, onChangeText, value}) {

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
        valid={ password => password.length >= 4 }
        message={ labels.passwordLenghtValidation }
        value={ value }
        onChangeText={onChangeText}
        messageStyle={{color: customStyles.validationTextColor}}
        keyboardAppearance={customStyles.keyboardAppearance}
        selectionColor={customStyles.textColor}
        underlineColorAndroid={customStyles.textColor}
        secureTextEntry={true}/>
      </View>
  );
}
