import React, { Component, PropTypes } from 'react';
import {
  Dimensions
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {
  primaryColor
} from '../colors';

export default function EkDatePicker ({onDateChange, date}) {
  return (
    <DatePicker
        style={{
          width: Dimensions.get('window').width,
          marginBottom: 0,
          height: 30
        }}
        date={ date }
        mode={ 'date' }
        placeholder=' '
        format="DD/MM/YYYY"
        maxDate={new Date()}
        confirmBtnText="Ok"
        cancelBtnText="Cancelar"
        showIcon={ false }
        customStyles={{
          dateInput: {
            marginLeft: 20,
            marginRight: 20,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
            paddingBottom: 0,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            height: 15
          },
          dateText: {
            color: 'grey'
          }
        }}
        onDateChange={ onDateChange }
      />
  );
}
