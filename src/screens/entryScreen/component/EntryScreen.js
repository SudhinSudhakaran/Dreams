import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import I18n from '../../../i18n';
import messaging from '@react-native-firebase/messaging';
import {sentFcmToken} from '../../../common/sentFcmToken';
import DeviceInfo from 'react-native-device-info';
import ApiConnections from '../../../helpers/apiConnection/ApiConnections';
import {setFcmToken} from '../../../redux/slices/useDetails/userSlice';
import {Globals} from '../../../constants';
import {CommonActions} from '@react-navigation/native';
import {useNetworkManager} from '../../../helpers/apiConnection/NetworkManager';
import {getUniqueId, getManufacturer} from 'react-native-device-info';
const EntryScreen = () => {
  const navigation = useNavigation();
  const {post} = useNetworkManager();
  const dispatch = useDispatch();

  // value from redux
  const {isFirstLogin, currentLanguage, fcmToken} = useSelector(
    state => state.user,
  );

  useEffect(() => {
    requestUserPermission?.();
    SplashScreen.hide();
    I18n.locale = currentLanguage === 'en' ? 'en' : 'ar';
    if (isFirstLogin) {
      navigation.reset({
        index: 0,
        routes: [{name: 'OnBoardScreen'}],
      });
    } else {
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
                          name: 'HomeScreen', // Name of the screen you want to navigate to
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

    return () => {};
  }, []);
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

    const _fcmToken = await messaging().getToken();
    console.log('🚀 ~ requestUserPermission ~ fcmToken:', _fcmToken);

    if (_fcmToken) {
      DeviceInfo.getUniqueId().then(uniqueId => {
        console.log('🚀 ~ requestUserPermission ~ uniqueId:', uniqueId);

        const osType = Platform.OS === 'ios' ? 1 : 2;
        sentFcmToken(_fcmToken, osType, uniqueId, false);
      });
    }
  };

  const sentFcmToken = async (_fcmToken, osType, uniqueId, forced) => {
    console.log('🚀 ~ sentFcmToken ~ osType:', osType);

    let formdata = new FormData();
    formdata.append(ApiConnections.KEYS.OS_TYPE, osType);
    formdata.append(ApiConnections.KEYS.FCM_TOKEN, _fcmToken);
    formdata.append(ApiConnections.KEYS.DEVICE_ID, uniqueId);
    formdata.append('appId', Globals.APP_ID);

    if (!(forced || fcmToken != _fcmToken)) {
      const [isSuccess, message, data] = await post(
        ApiConnections.NOTIFICATION,
        formdata,
      );

      console.log('isSuccess', isSuccess, data);
      if (isSuccess) {
        dispatch(setFcmToken(_fcmToken));
      }
    }
  };

  return <View />;
};

export default EntryScreen;

const styles = StyleSheet.create({});
