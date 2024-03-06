import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const RtlText = ({children, style, textAlign, ...props}) => {
  const {currentLanguage} = useSelector(state => state?.user);
  return (
    <Text
      {...props}
      style={{
        textAlign: textAlign
          ? textAlign
          : currentLanguage === 'en'
          ? 'left'
          : 'right',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export default RtlText;

const styles = StyleSheet.create({});
