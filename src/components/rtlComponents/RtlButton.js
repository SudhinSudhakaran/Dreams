import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const RtlButton = ({children, style, onPress, ...props}) => {
  const {currentLanguage} = useSelector(state => state?.user);
  return (
    <TouchableOpacity
      {...props}
      onPress={() => onPress?.()}
      activeOpacity={1}
      style={{
        flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse',
        ...style,
      }}>
      {children}
    </TouchableOpacity>
  );
};

export default RtlButton;

const styles = StyleSheet.create({});
