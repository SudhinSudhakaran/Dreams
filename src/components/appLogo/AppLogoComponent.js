import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../../constants';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const AppLogoComponent = () => {
  return (
    <View style={styles.container}>
      <Image source={Images.LOGO} style={styles.logo} />
    </View>
  );
};

export default AppLogoComponent;

const styles = StyleSheet.create({
  container: {},
  logo: {
    width: responsiveWidth(40),
    height: responsiveWidth(40),
    alignSelf: 'center',

    borderRadius: 100,
  },
});
