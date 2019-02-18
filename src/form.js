import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {View} from 'react-native';

export default class Form extends Component {
 _listeners = [];

 constructor(props) {
   super(props);
   this.submit = this.submit.bind(this);
 }

 static PropTypes = {
   onSuccess: PropTypes.func,
   onFail: PropTypes.func,
   submitButton: PropTypes.element.isRequired
 }

 static childContextTypes = {
   addFormListener: PropTypes.func,
   removeFormListener: PropTypes.func
 }

 getChildContext() {
   return {
     addFormListener: this.addFormListener.bind(this),
     removeFormListener: this.removeFormListener.bind(this)
   }
 }

 addFormListener(ln) {
   this._listeners.push(ln);
 }

 removeFormListener(ln) {
   this._listeners = this._listeners.filter(l => l  !== ln);
 }

 submit() {
   const defaultFn = () => {};
   const {onFail = defaultFn, onSuccess = defaultFn} = this.props;

   const stop = this._listeners.reduce((stop, _listener) => {
     return _listener() || stop;
   }, false);
   if (stop) {
     return onFail();
   };
   onSuccess();
 }

 render() {
   const {submitButton = () => {}, children, style, disableSubmit} = this.props;
   const finalChildren = React.Children.map(children, child => {
     if (!child) return;
     if (child.props.submit) {
       return React.cloneElement(child, {
         onPress: this.submit
       });
     }
     return React.cloneElement(child);
   })
   return (
       <View style={style}>
         {finalChildren}
         {submitButton(this.submit, disableSubmit)}
       </View>
   )
 }
}
