import {Linking, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RtlButton from '../rtlComponents/RtlButton';
import RtlText from '../rtlComponents/RtlText';
import {Colors, Fonts} from '../../constants';
import ApiConnections from '../../helpers/apiConnection/ApiConnections';
import {useNavigation} from '@react-navigation/native';

const PrivacyPolicyComponent = ({style}) => {
  const navigation = useNavigation();
  const buttonAction = () => {
    // Linking.openURL(ApiConnections.PRIVACY_POLICY);
    navigation.navigate('PrivacyPolicyScreen', {pageId: 59});
  };
  return (
    <RtlButton
      onPress={buttonAction}
      style={{...styles.privacyConteiner, ...style}}>
      <RtlText style={styles.text}>Privacy Policy</RtlText>
    </RtlButton>
  );
};

export default PrivacyPolicyComponent;

const styles = StyleSheet.create({
  privacyConteiner: {
    alignSelf: 'center',
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  text: {
    color: Colors.TITLE_COLOR,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.TITLE_COLOR,
    fontFamily: Fonts.INTER_MEDIUM,
    fontStyle: 'italic',
  },
});
