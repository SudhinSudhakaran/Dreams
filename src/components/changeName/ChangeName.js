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
const ChangeName = ({onClose}) => {
  const {userDetails} = useSelector(state => state.user);
  const {get, post} = useNetworkManager();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [_error, _setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    setName(userDetails.fullname);

    return () => {};
  }, []);
  const validate = () => {
    Keyboard.dismiss();

    let isValidaName = 0;
    if (name?.trimStart()?.length == 0) {
      _setError('Name cannot be empty');
      isValidaName = 0;
    } else if (name === userDetails?.fullname) {
      _setError('No Changes found');
      isValidaName = 0;
    } else {
      _setError('');
      isValidaName = 1;
    }

    if (isValidaName === 1) {
      changeAction?.();
    }
  };
  const changeAction = async () => {
    setIsLoading(true);
    let body = {
      [ApiConnections.KEYS.USERNAME]: name,
      appid: Globals.APP_ID,
    };
    const [isSuccess, message, data] = await post(
      ApiConnections.CHANGE_USERNAME,
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
      dispatch(setUserName(name));
      Toast.show(message);
      onClose?.();
    } else {
      onClose?.();
    }
  };
  return (
    <View style={{flex: 1}}>
      <InputField
        label={I18n.t('Name')}
        onChangeText={text => setName(text)}
        error={_error}
        onFocus={() => _setError(null)}
        value={name}
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

export default ChangeName;

const styles = StyleSheet.create({});
