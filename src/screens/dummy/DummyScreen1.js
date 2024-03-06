import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
const DummyScreen1 = () => {
  const {userDetails, isFirstLogin} = useSelector(state => state.user);
  return <View></View>;
};

export default DummyScreen1;

const styles = StyleSheet.create({});
