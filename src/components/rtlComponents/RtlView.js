import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const RtlView = ({children, style, ...props}) => {
  const {currentLanguage} = useSelector(state => state?.user);
  return (
    <View
      {...props}
      style={{
        flexDirection: currentLanguage === 'en' ? 'row' : 'row-reverse',
        ...style,
      }}>
      {children}
    </View>
  );
};

export default RtlView;

const styles = StyleSheet.create({});
