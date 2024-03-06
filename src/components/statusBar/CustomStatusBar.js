import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {Colors} from '../../constants';

const CustomStatusBar = ({}) => {
  return (
    <StatusBar
      backgroundColor={Colors.PRIMARY_COLOR}
      barStyle={'light-content'}
    />
  );
};

export default CustomStatusBar;

const styles = StyleSheet.create({});
