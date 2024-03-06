import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../constants';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const RadioButton = ({isChecked}) => {
  return (
    <MaterialIcons
      name={isChecked ? 'radio-button-checked' : 'radio-button-unchecked'}
      size={responsiveWidth(7)}
      color={Colors.PRIMARY_COLOR}
    />
  );
};

export default RadioButton;

const styles = StyleSheet.create({});
