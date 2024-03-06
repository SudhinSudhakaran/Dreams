import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Components} from '../../../components';
import ContentLoader, {
  Facebook,
  Rect,
  Circle,
} from 'react-content-loader/native';
const Loader = () => {
  const CustomLoader = () => {
    return (
      <View style={styles.container}>
        <ContentLoader
          height={'100%'}
          speed={1}
          backgroundColor={'#D3D3D3'}
          foregroundColor={'gray'}
          opacity={0.2}>
          {/* <Circle cx="55" cy="40" r="5" /> */}
          <Rect x="18" y="10" rx="0" ry="5" width="80" height="70" />
          <Rect x="10" y="90" rx="0" ry="5" width="70" height="10" />
          <Rect x="10" y="110" rx="0" ry="5" width="100" height="10" />
        </ContentLoader>
      </View>
    );
  };
  const RowLoader = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <CustomLoader />
        <Components.ItemSeperator width={responsiveWidth(4)} />
        <CustomLoader />
        <Components.ItemSeperator width={responsiveWidth(4)} />
        <CustomLoader />
      </View>
    );
  };
  return (
    <View>
      <Components.ItemSeperator height={responsiveHeight(2)} />
      <RowLoader />
      <RowLoader />
      <RowLoader />
      <RowLoader />
      <RowLoader />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(28),
    height: responsiveHeight(18),
    marginTop: responsiveHeight(2),

    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
