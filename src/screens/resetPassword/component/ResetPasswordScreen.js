import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Components} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors, Fonts, Globals} from '../../../constants';
import I18n from '../../../i18n/';
import {Helper} from '../../../helpers/helper/Helper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Style} from '../../../constants/styles/Style';
import ApiConnections from '../../../helpers/apiConnection/ApiConnections';
import useEncryptHook from '../../../hooks';
import {useNetworkManager} from '../../../helpers/apiConnection/NetworkManager';
import {CommonActions} from '@react-navigation/native';
const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {get, post} = useNetworkManager();
  const {email, otp} = route.params;

  const [inputs, setInputs] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const validation = () => {
    let isValidPassword = 0;
    let isValidConfirmPassword = 0;

    if (inputs?.password?.trim().length <= 0) {
      handleError(I18n.t('Password_Cant_Empty'), 'password');
      isValidPassword = 0;
    } else if (inputs?.password?.trim().length < 6) {
      handleError('Password must be 6 characters', 'password');
      isValidPassword = 0;
    } else {
      handleError('', 'password');
      isValidPassword = 1;
    }
    if (inputs?.confirmPassword?.trim().length <= 0) {
      handleError('Confirm password cant be empty', 'confirmPassword');
      isValidConfirmPassword = 0;
    } else if (inputs?.password !== inputs?.confirmPassword) {
      handleError('Password must be same', 'confirmPassword');
      isValidConfirmPassword = 0;
    } else {
      handleError('', 'confirmPassword');
      isValidConfirmPassword = 1;
    }

    if (isValidPassword === 1 && isValidConfirmPassword === 1) {
      resetPasswordAction?.();
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const resetPasswordAction = async () => {
    let formdata = new FormData();
    formdata.append(ApiConnections.KEYS.EMAIL, email);
    formdata.append(ApiConnections.KEYS.ENCODED_EMAIL, useEncryptHook(email));
    formdata.append(
      ApiConnections.KEYS.NEW_PASSWORD,
      useEncryptHook(inputs.password),
    );
    formdata.append(ApiConnections.KEYS.OTP, otp);
    formdata.append(ApiConnections.KEYS.APP_ID, Globals.APP_ID);
    const [isSuccess, message, data] = await post(
      ApiConnections.RESET_PASSWORD,
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
      setShowSuccessPopup(true);
    } else {
      setIsLoading(false);
      Toast.show(message);
    }
  };
  const onClose = () => {
    setShowSuccessPopup(false);
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'DrawerNavigator'}],
    // });

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
  };
  return (
    <Components.NetworkWrapper>
      <Components.CustomStatusBar />
      <Components.Header
        showBackButton={true}
        title={I18n.t('Reset_password')}
        backButtonAction={navigation?.goBack}
      />
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={150}
        extraScrollHeight={10}
        behaviour={Platform.OS === 'ios' ? 'padding' : 'height'}
        scrollEnabled={true}
        style={{}}
        showsVerticalScrollIndicator={false}>
        <Components.ItemSeperator height={responsiveHeight(4)} />
        <Components.ItemSeperator height={responsiveHeight(6)} />
        <Components.RtlText
          style={{
            ...Style.popupTitles,
            lineHeight: 30,
            marginBottom: responsiveHeight(5),
          }}>
          {I18n.t('Please_enter_your_new_password')}
        </Components.RtlText>
        <Components.InputField
          label={I18n.t('Password')}
          isPassword={true}
          onChangeText={text => handleOnchange(text, 'password')}
          error={errors.password}
          onFocus={() => handleError(null, 'password')}
          value={inputs.password}
          keyboardType="default"
        />
        <Components.InputField
          label={I18n.t('Confirm_Password')}
          isPassword={true}
          onChangeText={text => handleOnchange(text, 'confirmPassword')}
          error={errors.confirmPassword}
          onFocus={() => handleError(null, 'confirmPassword')}
          value={inputs.confirmPassword}
          keyboardType="default"
        />
        <Components.ItemSeperator height={responsiveHeight(4)} />
        <Components.CustomButton
          title={I18n.t('Submit')}
          onPress={validation}
          isLoading={isLoading}
        />

        <Components.ItemSeperator height={responsiveHeight(5)} />
        <Components.SuccessPopup
          isVisible={showSuccessPopup}
          text={'Password Changed Successfully'}
          onClose={onClose}
        />
      </KeyboardAwareScrollView>
    </Components.NetworkWrapper>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: Colors.PRIMARY_COLOR,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  loginButtonText: {
    marginHorizontal: responsiveWidth(4),
    marginVertical: responsiveWidth(2),
    fontSize: responsiveFontSize(2),
    color: Colors.WHITE,
    fontFamily: Fonts.INTER_EXTRA_BOLD,
  },
  signUpText: {
    color: Colors.TITLE_COLOR,
    alignSelf: 'center',
    marginTop: responsiveHeight(5),
  },
});
