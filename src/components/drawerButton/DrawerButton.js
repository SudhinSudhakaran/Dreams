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

const DrawerButton = ({children, action, title, pageId}) => {
  return (
    <View style={styles.buttonContainer}>
      <RtlButton onPress={() => action?.(pageId)} style={styles.button}>
        {children}
        <RtlText style={styles.buttonText}>{title}</RtlText>
      </RtlButton>
    </View>
  );
};

export default DrawerButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: responsiveHeight(0.5),
  },
  button: {
    // backgroundColor: Colors.BACKGROUND_COLOR,
    marginHorizontal: responsiveWidth(2),
    paddingVertical: responsiveWidth(1.5),
    borderRadius: 5,
    paddingHorizontal: responsiveWidth(2),
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: Fonts.INTER_SEMIBOLD,
    fontSize: responsiveFontSize(1.9),
    color: Colors.PRIMARY_COLOR,
    marginHorizontal: responsiveWidth(1),
  },
});
