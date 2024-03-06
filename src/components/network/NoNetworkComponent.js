/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants';
const NoNetworkComponent = ({style, onPress}) => {
  return (
    <View style={[styles.loaderContainer, {...style}]}>
      <LottieView
        source={require('../../assets/animations/animation_llava4q0.json')}
        autoPlay
        loop
        style={styles.lottieView}
        speed={1}
        colorFilters={[
          {keypath: 'Line3 Outlines 7', color: Colors.PRIMARY_COLOR},
          {keypath: 'Line2 Outlines 7', color: Colors.PRIMARY_COLOR},
          {keypath: 'Line1 Outlines 7', color: Colors.PRIMARY_COLOR},
          {keypath: 'Dot Outlines 2', color: Colors.PRIMARY_COLOR},
        ]}
      />
      <TouchableOpacity style={styles.button} onPress={() => onPress()}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoNetworkComponent;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
  },
  lottieView: {
    width: 200,
    height: 200,
  },
  button: {
    width: responsiveWidth(20),
    height: responsiveHeight(4),
    backgroundColor: Colors.PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
  },
});
