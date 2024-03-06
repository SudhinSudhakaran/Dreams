import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants';
import {Style} from '../../constants';

const IconButton = ({children, onPress, style}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress?.()}
      style={[styles.button, {...Style.shadow, ...style}]}>
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',

    width: responsiveWidth(9),
    height: responsiveWidth(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
