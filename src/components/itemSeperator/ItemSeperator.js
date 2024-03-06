import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const ItemSeperator = ({
  height = responsiveHeight(2),
  width = responsiveWidth(3),
}) => {
  return <View style={{height: height, width: width}} />;
};

export default ItemSeperator;

const styles = StyleSheet.create({});
