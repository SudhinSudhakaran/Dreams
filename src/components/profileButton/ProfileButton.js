import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RtlView from '../rtlComponents/RtlView';
import RtlText from '../rtlComponents/RtlText';
import RtlButton from '../rtlComponents/RtlButton';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors, Fonts} from '../../constants';
const ProfileButton = ({children, action, title}) => {
  return (
    <RtlButton onPress={() => action?.()} style={styles.button}>
      {children}
      <RtlText style={styles.buttonText}>{title}</RtlText>
    </RtlButton>
  );
};

export default ProfileButton;
const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 3,
    height: responsiveHeight(6),
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.PRIMARY_COLOR,
    marginTop: responsiveHeight(2),
  },
  buttonText: {
    fontFamily: Fonts.INTER_SEMIBOLD,
    fontSize: responsiveFontSize(1.9),
    color: Colors.PRIMARY_COLOR,
    marginHorizontal: responsiveWidth(1),
  },
});
