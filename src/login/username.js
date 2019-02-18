import React, { Component} from 'react';
import PropTypes from 'prop-types'
import {
  FormLabel
} from 'react-native-elements'
import {
  FormInput
} from 'eureka-rn-components';
import { View } from 'react-native';

export default function Username({value, onChangeText, customStyles, label}) {
  return (
    <View>
      <FormLabel
        labelStyle={{color: customStyles.textColor}}
        >
        { label }
      </FormLabel>
      <FormInput
        inputStyle={{
          color: customStyles.textColor
        }}
        containerStyle={{borderBottomColor: customStyles.textColor}}
        keyboardType='email-address'
        autoCapitalize='none'
        value={value}
        messageStyle={{color: customStyles.validationTextColor}}
        onChangeText={ onChangeText }
        keyboardAppearance={customStyles.keyboardAppearance}
        selectionColor={customStyles.textColor}
        underlineColorAndroid={customStyles.textColor}
        required/>
    </View>
  );
}
