import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Components} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-simple-toast';
import {Colors, Fonts, Globals} from '../../../constants';
import I18n from '../../../i18n/';
import {Helper} from '../../../helpers/helper/Helper';
import {useNavigation} from '@react-navigation/native';
import ApiConnections from '../../../helpers/apiConnection/ApiConnections';
import useEncryptHook from '../../../hooks';
import {useNetworkManager} from '../../../helpers/apiConnection/NetworkManager';
import {
  _setSelectedLanguage,
  setFcmToken,
  setSessionToken,
  setUserDetails,
} from '../../../redux/slices/useDetails/userSlice';
import {CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {OTP_NAVIGATION_OPTION} from '../../../constants/enums/Enums';
const RegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {get, post} = useNetworkManager();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const validation = () => {
    let isValidName = 0;
    let isValidEmail = 0;
    let isValidPassword = 0;
    let isValidConfirmPassword = 0;

    if (inputs?.name.length <= 0) {
      handleError(I18n.t('Name_Required'), 'name');
      isValidName = 0;
    } else {
      handleError('', 'name');
      isValidName = 1;
    }

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
    if (inputs?.confirmPassword?.trim().length <= 0) {
      handleError(I18n.t('Enter_Password_again'), 'confirmPassword');
      isValidConfirmPassword = 0;
    } else if (inputs?.password !== inputs?.confirmPassword) {
      handleError(I18n.t('Password_Should_Be_Same'), 'confirmPassword');
      isValidConfirmPassword = 0;
    } else {
      handleError('', 'confirmPassword');
      isValidConfirmPassword = 1;
    }

    if (
      isValidName === 1 &&
      isValidEmail === 1 &&
      isValidPassword === 1 &&
      isValidConfirmPassword === 1
    ) {
      let _data = {...inputs, fbgoogle: 0};
      registerAction?.(_data);
    }
  };
  const navigationToSignUp = () => {
    navigation.goBack();
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const registerAction = async _data => {
    Keyboard.dismiss();
    setIsLoading(true);

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
    console.log('🚀 ~ registerAction ~ formdata:', formdata);
    const [isSuccess, message, data] = await post(
      ApiConnections.USER_REGISTER,
      formdata,
    );
    console.log(
      '🚀 ~ loginAction ~ data:---------------',
      isSuccess,
      message,
      data,
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
      } else {
        navigation.navigate('OtpScreen', {
          isFrom: OTP_NAVIGATION_OPTION.REGISTER_SCREEN,
          email: data?.user?.email,
        });

        dispatch(setUserDetails(data?.user));
        dispatch(_setSelectedLanguage(data?.user?.language ?? 'en'));
        dispatch(setSessionToken(data?.user?.sessionToken));
      }
    } else {
      setIsLoading(false);
      Toast.show(message);
    }
  };

  return (
    <Components.NetworkWrapper backgroundColor={Colors.BACKGROUND_COLOR}>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={150}
        extraScrollHeight={10}
        behaviour={Platform.OS === 'ios' ? 'padding' : 'height'}
        scrollEnabled={true}
        style={{}}
        showsVerticalScrollIndicator={false}>
        <Components.ItemSeperator height={responsiveHeight(3)} />
        <Components.AppLogoComponent />

        <Components.InputField
          label={I18n.t('Name')}
          onChangeText={text => handleOnchange(text, 'name')}
          error={errors.name}
          onFocus={() => handleError(null, 'password')}
          value={inputs.name}
          keyboardType="default"
        />
        <Components.InputField
          label={I18n.t('Email')}
          onChangeText={text => handleOnchange(text, 'email')}
          error={errors.email}
          onFocus={() => handleError(null, 'password')}
          value={inputs.email}
          keyboardType="email-address"
        />
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
          title={I18n.t('Sign_In')}
          onPress={validation}
          isLoading={isLoading}
        />

        <Text style={styles.signUpText}>
          Already have an account?
          <Text
            style={{color: Colors.SIGNUP_TEXT_COLOR}}
            onPress={navigationToSignUp}>
            {' '}
            Log in
          </Text>
        </Text>

        <Components.SocialAuthentication tranaferData={registerAction} />
        <Components.ItemSeperator height={responsiveHeight(2)} />
        <Components.PrivacyPolicyComponent />
        <Components.ItemSeperator height={responsiveHeight(5)} />
      </KeyboardAwareScrollView>
    </Components.NetworkWrapper>
  );
};

export default RegisterScreen;

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
    marginTop: responsiveHeight(2),
  },
});
