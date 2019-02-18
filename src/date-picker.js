import React, { Component} from 'react';
import PropTypes from 'prop-types'
import {
  Dimensions
} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default function EkDatePicker ({mode= 'datetime', format="DD/MM/YYYY", onDateChange, date, lineColor = 'grey', containerStyle}) {
  return (
    <DatePicker
        style={[{
          marginRight: 0,
          marginBottom: 0,
          height: 30
        }, containerStyle]}
        date={ date }
        mode={ mode }
        placeholder=' '
        format={format}
        confirmBtnText="Ok"
        cancelBtnText="Cancelar"
        showIcon={ false }
        customStyles={{
          dateInput: {
            marginLeft: 20,
            marginRight: 20,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: lineColor,
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
