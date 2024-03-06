import {Keyboard, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Components} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors, Fonts, Globals, Style} from '../../../constants';
import I18n from '../../../i18n/';
import {Helper} from '../../../helpers/helper/Helper';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ApiConnections from '../../../helpers/apiConnection/ApiConnections';
import {CommonActions} from '@react-navigation/native';
import {useNetworkManager} from '../../../helpers/apiConnection/NetworkManager';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {
  _setSelectedLanguage,
  setSessionToken,
  setUserDetails,
} from '../../../redux/slices/useDetails/userSlice';
import useEncryptHook from '../../../hooks';
const LoginScreen = () => {
  const {get, post} = useNetworkManager();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {currentLanguage} = useSelector(state => state.user);
  const [inputs, setInputs] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setInputs({email: '', password: ''});

      return () => {
        setInputs({email: '', password: ''});
      };
    }, []),
  );

  /**
   <---------------------------------------------------------------------------------------------->
   * Purpose:  Validate the inputs
   * Created/Modified By: Sudhin Sudhakaran
   * Created/Modified Date: 21-02-2024
   * Steps:
   * 1.  take the values
   * 2. validate
   <---------------------------------------------------------------------------------------------->
   */
  const validation = () => {
    Keyboard.dismiss();
    let isValidEmail = 0;
    let isValidPassword = 0;

    if (inputs?.email.length <= 0) {
      handleError(I18n.t('Email_Cant_Empty'), 'email');

      isValidEmail = 0;
    } else if (!Helper.isValidEmail(inputs?.email)) {
      handleError('Enter a valid email', 'email');

      isValidEmail = 0;
    } else {
      handleError('', 'email');
      isValidEmail = 1;
    }
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

    if (isValidEmail === 1 && isValidPassword === 1) {
      let data = {...inputs, fbgoogle: 0};
      loginAction(data);
    }
  };
  const navigationToSignUp = () => {
    navigation.navigate('RegisterScreen');
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  const loginAction = async _data => {
    console.log('🚀 ~ loginAction ~ data:', _data);
    setIsLoading(true);

    if (_data.fbgoogle === 0) {
      let formdata = new FormData();
      formdata.append(ApiConnections.KEYS.EMAIL, _data.email);
      formdata.append(
        ApiConnections.KEYS.ENCODED_EMAIL,
        useEncryptHook(_data.email),
      );
      formdata.append(
        ApiConnections.KEYS.PASSWORD,
        useEncryptHook(_data.password),
      );
      formdata.append(ApiConnections.KEYS.APP_ID, Globals.APP_ID);

      const [isSuccess, message, data] = await post(
        ApiConnections.LOGIN,
        formdata,
      );
      console.log(
        '🚀 ~ loginAction ~ data:---------------<><><><><><><>',
        isSuccess,
        message,
        data,
      );

      if (isSuccess) {
        setIsLoading(false);
        dispatch(setUserDetails(data?.userinfo));
        dispatch(setSessionToken(data?.userinfo?.sessionToken));
        navigation.navigate('ProfileScreen');
      } else {
        setIsLoading(false);
        Toast.show(message);
      }
    } else {
      let formdata = new FormData();
      formdata.append(ApiConnections.KEYS.EMAIL, _data.email);
      formdata.append(
        ApiConnections.KEYS.ENCODED_EMAIL,
        useEncryptHook(_data.email),
      );
      formdata.append(
        ApiConnections.KEYS.PASSWORD,
        useEncryptHook(_data.password),
      );
      formdata.append(ApiConnections.KEYS.AUTH, _data.fbgoogle);
      formdata.append(ApiConnections.KEYS.PROFILE_PIC, _data?.photo ?? '');
      formdata.append(ApiConnections.KEYS.FULL_NAME, _data?.name ?? '');
      formdata.append(ApiConnections.KEYS.APP_ID, Globals.APP_ID);

      const [isSuccess, message, data] = await post(
        ApiConnections.USER_REGISTER,
        formdata,
      );
      if (isSuccess) {
        setIsLoading(false);
        if (_data?.fbgoogle) {
          dispatch(setUserDetails(data?.user));
          dispatch(_setSelectedLanguage(data?.user?.language ?? 'en'));
          dispatch(setSessionToken(data?.user?.sessionToken));
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

        dispatch(setUserDetails(data?.user));
        dispatch(_setSelectedLanguage(data?.user?.language ?? 'en'));
        dispatch(setSessionToken(data?.user?.sessionToken));
      } else {
        setIsLoading(false);
        Toast.show(message);
      }
    }
  };
  const forgotPasswordAction = () => {
    navigation.navigate('ForgotPasswordScreen');
  };
  return (
    <Components.NetworkWrapper backgroundColor={Colors.BACKGROUND_COLOR}>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={150}
        extraScrollHeight={100}
        behaviour={Platform.OS === 'ios' ? 'padding' : 'height'}
        scrollEnabled={false}
        style={{}}
        showsVerticalScrollIndicator={false}>
        <Components.CustomStatusBar />
        <Components.ItemSeperator height={responsiveHeight(5)} />
        <Components.AppLogoComponent />
        <Components.ItemSeperator
          height={
            Platform.OS === 'ios' ? responsiveHeight(1) : responsiveHeight(3)
          }
        />
        <Components.InputField
          label={I18n.t('Email')}
          onChangeText={text => handleOnchange(text, 'email')}
          error={errors.email}
          onFocus={() => handleError(null, 'email')}
          keyboardType="email-address"
          autoCapitalize="none"
          value={inputs.email}
        />
        <Components.InputField
          label={I18n.t('Password')}
          isPassword={true}
          onChangeText={text => handleOnchange(text, 'password')}
          error={errors.password}
          onFocus={() => handleError(null, 'password')}
          keyboardType="default"
          value={inputs.password}
        />
        <Components.ItemSeperator height={responsiveHeight(1.5)} />
        <Components.RtlText
          onPress={forgotPasswordAction}
          style={{...Style.popupTitles, fontSize: responsiveFontSize(1.7)}}
          textAlign={currentLanguage === 'en' ? 'right' : 'left'}>
          {I18n.t('Forgot_Password')}
        </Components.RtlText>
        <Components.CustomButton
          title={I18n.t('Sign_In')}
          onPress={validation}
          isLoading={isLoading}
        />

        <Text style={styles.signUpText}>
          Don't have an account?
          <Text
            style={{color: Colors.SIGNUP_TEXT_COLOR}}
            onPress={navigationToSignUp}>
            Signup here
          </Text>
        </Text>
        <Components.SocialAuthentication tranaferData={loginAction} />
        <Components.ItemSeperator height={responsiveHeight(2)} />
        <Components.PrivacyPolicyComponent />
      </KeyboardAwareScrollView>
    </Components.NetworkWrapper>
  );
};

export default LoginScreen;

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
