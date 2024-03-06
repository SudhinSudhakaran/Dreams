import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {Components} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Screens} from '../../index';
import {setUserDetails} from '../../../redux/slices/useDetails/userSlice';
import I18n from '../../../i18n';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Helper} from '../../../helpers/helper/Helper';
import ApiConnections from '../../../helpers/apiConnection/ApiConnections';
import {Globals} from '../../../constants';
import useEncryptHook from '../../../hooks';
import {useNetworkManager} from '../../../helpers/apiConnection/NetworkManager';
import Toast from 'react-native-simple-toast';
import {OTP_NAVIGATION_OPTION} from '../../../constants/enums/Enums';
const ForgotPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {get, post} = useNetworkManager();
  // values from redux
  const {userDetails} = useSelector(state => state.user);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const validate = () => {
    Keyboard.dismiss();
    let isValidEmail = 0;

    if (email.length <= 0) {
      setEmailError(I18n.t('Email_Cant_Empty'));

      isValidEmail = 0;
    } else if (!Helper.isValidEmail(email)) {
      setEmailError('Enter a valid email');

      isValidEmail = 0;
    } else {
      setEmailError('');
      isValidEmail = 1;
    }

    if (isValidEmail === 1) {
      onForgotPasswordAction();
    }
  };

  const onForgotPasswordAction = async () => {
    setIsLoading(true);
    let formdata = new FormData();
    formdata.append(ApiConnections.KEYS.EMAIL, email);
    formdata.append(ApiConnections.KEYS.ENCODED_EMAIL, useEncryptHook(email));
    formdata.append(ApiConnections.KEYS.APP_ID, Globals.APP_ID);

    const [isSuccess, message, data] = await post(
      ApiConnections.FORGOT_PASSWORD,
      formdata,
    );
    console.log(
      '🚀 ~ onForgotPasswordAction ~ data:',
      isSuccess,
      message,
      data,
    );

    if (isSuccess) {
      setIsLoading(false);

      navigation.navigate('OtpScreen', {
        isFrom: OTP_NAVIGATION_OPTION.FORGOT_PASSWORD_SCREEN,
        email: email,
      });
    } else {
      setIsLoading(false);
      Toast.show(message);
    }
  };

  return (
    <Components.NetworkWrapper>
      <Components.Header
        showBackButton={true}
        title={I18n.t('Forgot_Password')}
        backButtonAction={navigation?.goBack}
      />
      <Components.ItemSeperator height={responsiveHeight(15)} />
      <Components.InputField
        label={I18n.t('Email')}
        onChangeText={text => setEmail(text)}
        value={email}
        error={emailError}
        onFocus={() => setEmailError(null)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Components.CustomButton
        title={I18n.t('Submit')}
        onPress={validate}
        isLoading={isLoading}
      />
    </Components.NetworkWrapper>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
