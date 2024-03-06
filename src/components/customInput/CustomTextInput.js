import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';

const CustomTextInput = ({placeholder, onChangeText, value, style}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default CustomTextInput;
