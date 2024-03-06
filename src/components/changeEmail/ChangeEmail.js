import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import CustomButton from '../customButton/CustomButton';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import InputField from '../input/InputField';
import {useDispatch, useSelector} from 'react-redux';
import RtlView from '../rtlComponents/RtlView';
import I18n from '../../i18n';
import {useNetworkManager} from '../../helpers/apiConnection/NetworkManager';
import ApiConnections from '../../helpers/apiConnection/ApiConnections';
import {Globals} from '../../constants';
import Toast from 'react-native-simple-toast';
import {setUserName} from '../../redux/slices/useDetails/userSlice';
import {Helper} from '../../helpers/helper/Helper';
import {useNavigation} from '@react-navigation/native';
import {OTP_NAVIGATION_OPTION} from '../../constants/enums/Enums';
const ChangeEmail = ({onClose}) => {
  const {userDetails} = useSelector(state => state.user);
  const {get, post} = useNetworkManager();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [_error, _setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    setEmail(userDetails.email);

    return () => {};
  }, []);
  const validate = () => {
    Keyboard.dismiss();

    let isValidaEmail = 0;
    if (email?.trimStart()?.length == 0) {
      _setError(I18n.t('Email_Cant_Empty'));
      isValidaEmail = 0;
    } else if (!Helper.isValidEmail(email)) {
      _setError('Enter a valid email');
      isValidaEmail = 0;
    } else if (email === userDetails?.email) {
      _setError('No Changes found');
      isValidaEmail = 0;
    } else {
      _setError('');
      isValidaEmail = 1;
    }

    if (isValidaEmail === 1) {
      changeAction?.();
    }
  };
  const changeAction = async () => {
    setIsLoading(true);
    let body = {
      [ApiConnections.KEYS.EMAIL]: email,
      appId: Globals.APP_ID,
    };
    const [isSuccess, message, data] = await post(
      ApiConnections.REQUEST_OTP,
      body,
    );

    setIsLoading(false);

    console.log(
      '🚀 ~ loginAction ~ data:---------------',
      isSuccess,
      message,
      data,
    );

    if (isSuccess) {
      //   dispatch(setUserName(email));
      //   Toast.show(message);
      //   onClose?.();
      navigation.navigate('OtpScreen', {
        isFrom: OTP_NAVIGATION_OPTION.CHANGE_EMAIL,
        email: email,
      });
    } else {
      onClose?.();
    }
  };
  return (
    <View style={{flex: 1}}>
      <InputField
        label={I18n.t('Email')}
        onChangeText={text => setEmail(text)}
        error={_error}
        onFocus={() => _setError(null)}
        value={email}
        keyboardType="default"
        autoCapitalize="none"
      />

      <View style={{marginTop: responsiveHeight(1)}}>
        <CustomButton
          title={I18n.t('Submit')}
          onPress={() => validate?.()}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default ChangeEmail;

const styles = StyleSheet.create({});
