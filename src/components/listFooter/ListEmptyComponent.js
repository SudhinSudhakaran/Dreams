import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RtlView from '../rtlComponents/RtlView';
import RtlText from '../rtlComponents/RtlText';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors, Images} from '../../constants';
import ItemSeperator from '../itemSeperator/ItemSeperator';

const ListEmptyComponent = ({text = 'No Data found'}) => {
  return (
    <View
      style={{
        width: responsiveWidth(93),
        height: responsiveHeight(83),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={Images.LIST}
        style={{
          width: responsiveWidth(15),
          height: responsiveHeight(7.5),
          tintColor: Colors.PRIMARY_COLOR,
        }}
      />
      <ItemSeperator />
      <RtlText
        style={{
          color: Colors.PRIMARY_COLOR,
          fontSize: responsiveFontSize(2),
          fontWeight: 'bold',
          fontStyle: 'italic',
        }}>
        {text}
      </RtlText>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({});
