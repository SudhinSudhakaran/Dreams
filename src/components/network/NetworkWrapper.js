/* eslint-disable prettier/prettier */
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import NoNetworkComponent from './NoNetworkComponent';
import {Colors} from '../../constants';
import {responsiveWidth} from 'react-native-responsive-dimensions';
const NetworkWrapper = ({children, onPress, backgroundColor}) => {
  const [connected, setIsConnected] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView
      keyboardShouldPersistTaps={'handled'}
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : Colors.PRIMARY_COLOR,
        },
      ]}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: responsiveWidth(3),
          backgroundColor: backgroundColor ? backgroundColor : Colors.WHITE,
        }}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default NetworkWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
