import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Components} from '../../../components';

const SettingsScreen = () => {
  return (
    <Components.NetworkWrapper>
      <Components.Header
        showDrawer={true}
        title={'Settings'}
        showSearchButton={true}
      />
    </Components.NetworkWrapper>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
