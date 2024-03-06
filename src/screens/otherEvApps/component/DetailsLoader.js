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
const DetailsLoader = () => {
  const CustomLoader = () => {
    return (
      <View style={{width: responsiveWidth(85), flexDirection: 'row'}}>
        <View style={styles.container}>
          <ContentLoader
            height={180}
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
        <View style={{flex: 1}}>
          <ContentLoader
            height={180}
            speed={1}
            backgroundColor={'#D3D3D3'}
            foregroundColor={'gray'}
            opacity={0.2}>
            {/* <Circle cx="55" cy="40" r="5" /> */}

            <Rect x="20" y="50" rx="0" ry="5" width="100" height="10" />
            <Rect x="20" y="70" rx="0" ry="5" width="150" height="10" />
            <Rect x="20" y="90" rx="0" ry="5" width="150" height="10" />
            <Rect x="20" y="110" rx="0" ry="5" width="180" height="10" />
            <Rect x="20" y="140" rx="0" ry="5" width="100" height="80" />
          </ContentLoader>
        </View>
      </View>
    );
  };
  const RowLoader = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Components.ItemSeperator width={responsiveWidth(4)} />
        <CustomLoader />
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Components.ItemSeperator height={responsiveHeight(2)} />
      <RowLoader />

      <Components.ItemSeperator height={responsiveHeight(1)} />
      <ContentLoader
        height={responsiveHeight(30)}
        width={'90%'}
        speed={1}
        backgroundColor={'#D3D3D3'}
        foregroundColor={'gray'}
        opacity={0.2}>
        <Rect x="18" y="10" rx="0" ry="5" width="100%" height="180" />
      </ContentLoader>

      <ContentLoader
        height={responsiveHeight(30)}
        width={'90%'}
        speed={1}
        backgroundColor={'#D3D3D3'}
        foregroundColor={'gray'}
        opacity={0.2}>
        <Rect x="18" y="10" rx="0" ry="5" width="100%" height="10" />
      </ContentLoader>
    </View>
  );
};

export default DetailsLoader;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(28),
    // height: responsiveHeight(18),
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
