import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RtlText from '../rtlComponents/RtlText';
import {useSelector} from 'react-redux';
const ErrorText = ({error, style}) => {
  console.log('🚀 ~ ErrorText ~ text:', error);

  const {currentLanguage} = useSelector(state => state?.user);
  return (
    <RtlText
      style={{...styles.error, ...style}}
      textAlign={currentLanguage === 'en' ? 'right' : 'left'}>
      {error}
    </RtlText>
  );
};

export default ErrorText;

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
});
