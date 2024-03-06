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
const ChangePassword = ({onClose}) => {
  const {userDetails} = useSelector(state => state.user);
  const {get, post} = useNetworkManager();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    return () => {};
  }, []);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  const validate = () => {
    Keyboard.dismiss();
    let isValidOldPassword = 0;
    let isValidPassword = 0;
    let isValidConfirmPassword = 0;

    if (inputs?.oldPassword?.trim().length <= 0) {
      handleError(I18n.t('Password_Cant_Empty'), 'oldPassword');
      isValidOldPassword = 0;
    } else if (inputs?.oldPassword?.trim().length < 6) {
      handleError('Password must be 6 characters', 'oldPassword');
      isValidOldPassword = 0;
    } else {
      handleError('', 'oldPassword');
      isValidOldPassword = 1;
    }

    if (inputs?.newPassword?.trim().length <= 0) {
      handleError(I18n.t('Password_Cant_Empty'), 'newPassword');
      isValidPassword = 0;
    } else if (inputs?.newPassword?.trim().length < 6) {
      handleError('Password must be 6 characters', 'newPassword');
      isValidPassword = 0;
    } else if (inputs?.newPassword === inputs?.oldPassword) {
      handleError(
        'Old password and new password should be different',
        'newPassword',
      );
      isValidPassword = 0;
    } else {
      handleError('', 'newPassword');
      isValidPassword = 1;
    }
    if (inputs?.confirmPassword?.trim().length <= 0) {
      handleError(I18n.t('Enter_Password_again'), 'confirmPassword');
      isValidConfirmPassword = 0;
    } else if (inputs?.newPassword !== inputs?.confirmPassword) {
      handleError(I18n.t('Password_Should_Be_Same'), 'confirmPassword');
      isValidConfirmPassword = 0;
    } else {
      handleError('', 'confirmPassword');
      isValidConfirmPassword = 1;
    }
    if (
      isValidOldPassword === 1 &&
      isValidPassword === 1 &&
      isValidConfirmPassword === 1
    ) {
      changeAction?.();
    }
  };
  const changeAction = async () => {
    setIsLoading(true);
    let body = {
      [ApiConnections.KEYS.OLD_PASSWORD]: inputs.oldPassword,
      [ApiConnections.KEYS.NEW_PASSWORD]: inputs.newPassword,
      appid: Globals.APP_ID,
    };
    const [isSuccess, message, data] = await post(
      ApiConnections.CHANGE_PASSSWORD,
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
      Toast.show(message);
      onClose?.();
    } else {
      onClose?.();
    }
  };
  return (
    <View style={{flex: 1}}>
      <InputField
        label={I18n.t('Old_Password')}
        isPassword={true}
        onChangeText={text => handleOnchange(text, 'oldPassword')}
        error={errors.oldPassword}
        onFocus={() => handleError(null, 'oldPassword')}
        value={inputs.oldPassword}
        keyboardType="default"
      />
      <InputField
        label={I18n.t('New_Password')}
        isPassword={true}
        onChangeText={text => handleOnchange(text, 'newPassword')}
        error={errors.newPassword}
        onFocus={() => handleError(null, 'newPassword')}
        value={inputs.newPassword}
        keyboardType="default"
      />

      <InputField
        label={I18n.t('Confirm_Password')}
        isPassword={true}
        onChangeText={text => handleOnchange(text, 'confirmPassword')}
        error={errors.confirmPassword}
        onFocus={() => handleError(null, 'confirmPassword')}
        value={inputs.confirmPassword}
        keyboardType="default"
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

export default ChangePassword;

const styles = StyleSheet.create({});
