import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ItemSeperator from '../itemSeperator/ItemSeperator';
import LottieView from 'lottie-react-native';
import {Colors} from '../../constants';

const ListFooter = () => {
  return (
    <View style={styles.container}>
      <ItemSeperator height={responsiveHeight(3)} />
      <LottieView
        source={require('../../assets/animations/AnimationLoader.json')}
        autoPlay
        loop
        style={styles.lottieView}
        speed={1}
        colorFilters={[
          {keypath: 'Camada de forma 1', color: Colors.PRIMARY_COLOR},
          {keypath: 'Camada de forma 2', color: Colors.PRIMARY_COLOR},
          {keypath: 'Camada de forma 3', color: Colors.PRIMARY_COLOR},
          {keypath: 'Camada de forma 4', color: Colors.PRIMARY_COLOR},
        ]}
      />
      <ItemSeperator height={responsiveHeight(3)} />
    </View>
  );
};

export default ListFooter;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(93),

    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieView: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
  },
});
