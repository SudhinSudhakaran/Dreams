import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {Components} from '../../../components';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import OTPInputView from '@twotalltotems/react-native-otp-input';
import Toast from 'react-native-simple-toast';
import I18n from '../../../i18n';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors, Globals, Style} from '../../../constants';
import ApiConnections from '../../../helpers/apiConnection/ApiConnections';
import {CommonActions} from '@react-navigation/native';
import useEncryptHook from '../../../hooks';
import {useNetworkManager} from '../../../helpers/apiConnection/NetworkManager';
import {
  setProfilePicture,
  setUserEmail,
} from '../../../redux/slices/useDetails/userSlice';
import {OTP_NAVIGATION_OPTION} from '../../../constants/enums/Enums';
const OtpScreen = () => {
  const {get, post} = useNetworkManager();
  const dispatch = useDispatch();
  const route = useRoute();
  const {isFrom, email} = route.params;
  const navigation = useNavigation();
  // values from redux

  const {userDetails, currentLanguage} = useSelector(state => state.user);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [clearInput, setclearInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setclearInput(true);
      setOtpError('');
      setOtp('');
      return () => {};
    }, []),
  );
  const validate = () => {
    let isValidateOtp = 0;
    if (otp?.length === 4) {
      setOtpError('');
      isValidateOtp = 1;
    } else {
      setOtpError(I18n.t('Enter_OTP'));
      isValidateOtp = 0;
    }
    if (isValidateOtp === 1) {
      if (isFrom === OTP_NAVIGATION_OPTION.CHANGE_EMAIL) {
        changeEmailAction?.();
      } else {
        validationAction?.();
      }
    }
  };

  const changeEmailAction = async () => {
    setIsLoading(true);
    let formdata = new FormData();
    formdata.append(ApiConnections.KEYS.EMAIL, email);
    formdata.append(ApiConnections.KEYS.ENCODED_EMAIL, useEncryptHook(email));
    formdata.append('appId', Globals.APP_ID);
    formdata.append(ApiConnections.KEYS.OTP, otp);

    const [isSuccess, message, data] = await post(
      ApiConnections.CHANGE_EMAIL,
      formdata,
    );

    setIsLoading(false);
    if (isSuccess) {
      dispatch(setUserEmail(data?.userinfo?.email));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'DrawerNavigator', // Name of your Drawer Navigator
              state: {
                routes: [
                  {
                    name: 'Home', // Name of your Tab Navigator
                    state: {
                      routes: [
                        {
                          name: 'ProfileScreen', // Name of the screen you want to navigate to
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        }),
      );
    }
  };
  const validationAction = async () => {
    setIsLoading(true);
    let formdata = new FormData();
    formdata.append(ApiConnections.KEYS.EMAIL, email);
    formdata.append(ApiConnections.KEYS.ENCODED_EMAIL, useEncryptHook(email));
    formdata.append(ApiConnections.KEYS.APP_ID, Globals.APP_ID);
    formdata.append(ApiConnections.KEYS.OTP, otp);

    const [isSuccess, message, data] = await post(
      ApiConnections.VARIFY_OTP,
      formdata,
    );

    console.log('🚀 ~ validationAction ~ data:', isSuccess, message, data);

    if (isSuccess) {
      setIsLoading(false);
      if (isFrom === OTP_NAVIGATION_OPTION.FORGOT_PASSWORD_SCREEN) {
        navigation.navigate('ResetPasswordScreen', {
          email: email,
          otp: otp,
        });
      } else {
        dispatch(setProfilePicture(data?.user?.profile_pic));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'DrawerNavigator', // Name of your Drawer Navigator
                state: {
                  routes: [
                    {
                      name: 'Home', // Name of your Tab Navigator
                      state: {
                        routes: [
                          {
                            name: 'ProfileScreen', // Name of the screen you want to navigate to
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          }),
        );
      }
    } else {
      setIsLoading(false);
      Toast.show(message);
    }
  };

  return (
    <Components.NetworkWrapper>
      <Components.Header
        showBackButton={true}
        title={'Otp'}
        backButtonAction={navigation?.goBack}
      />
      <Components.ItemSeperator height={responsiveHeight(10)} />
      <Components.RtlText style={{...Style.popupTitles, lineHeight: 30}}>
        {I18n.t('Enter_code_from_email')}
      </Components.RtlText>
      <Components.ItemSeperator height={responsiveHeight(10)} />
      <View
        style={[
          styles.otpInputContainer,
          {transform: [{scaleX: currentLanguage === 'ar' ? -1 : 1}]},
        ]}>
        <OTPInputView
          style={{
            height: responsiveHeight(10),

            width: responsiveWidth(80),
            alignSelf: 'center',
          }}
          keyboardAppearance="dark"
          pinCount={4}
          autoFocusOnLoad={false}
          codeInputFieldStyle={{
            width: 45,
            height: 50,
            borderWidth: 0,
            borderWidth: 1,
            borderColor: Colors.TITLE_COLOR,
            color: Colors.TITLE_COLOR,
            fontSize: 24,

            transform: [{scaleX: currentLanguage === 'ar' ? -1 : 1}],
          }}
          code={otp}
          clearInputs={clearInput}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeChanged={code => {
            setOtp(code);
            setclearInput(false);
          }}
        />
      </View>
      <Components.ErrorText
        error={otpError}
        style={{
          marginHorizontal: responsiveHeight(3),
        }}
      />
      <Components.ItemSeperator height={responsiveHeight(6)} />
      <Components.CustomButton
        title={I18n.t('Submit')}
        onPress={validate}
        isLoading={isLoading}
      />
    </Components.NetworkWrapper>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  otpInputContainer: {},
});
