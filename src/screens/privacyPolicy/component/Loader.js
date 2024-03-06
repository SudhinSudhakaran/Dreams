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
          <Rect x="0" y="10" rx="0" ry="5" width="30%" height="10" />
          <Rect x="0" y="30" rx="0" ry="5" width="45%" height="10" />
          <Rect x="0" y="50" rx="0" ry="5" width="95%" height="10" />
          <Rect x="0" y="70" rx="0" ry="5" width="65%" height="10" />
          <Rect x="0" y="100" rx="0" ry="5" width="65%" height="120" />
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
    width: responsiveWidth(95),
    height: responsiveHeight(18),
    marginTop: responsiveHeight(2),

    backgroundColor: '#ffffff',
  },
});
