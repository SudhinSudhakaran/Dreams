import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {Components} from '../../../components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Screens} from '../../index';
import {
  setProfilePicture,
  setSessionToken,
  setUserDetails,
} from '../../../redux/slices/useDetails/userSlice';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors, Fonts, Globals, Images} from '../../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNetworkManager} from '../../../helpers/apiConnection/NetworkManager';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import ApiConnections from '../../../helpers/apiConnection/ApiConnections';
import {PROFILE_BUTTON_ACTION} from '../../../constants/enums/Enums';
import {CommonActions} from '@react-navigation/native';
import I18n from '../../../i18n';
import {Switch} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import Feather from 'react-native-vector-icons/Feather';
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {get, post} = useNetworkManager();
  // values from redux

  const {userDetails, currentLanguage} = useSelector(state => state.user);
  const [visibleLanguagePopup, setVisibleLanguagePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const [showImagePicker, setShowImagePicker] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      console.log('🚀 ~ ProfileScreen ~ userDetails:', userDetails);
      setShowEditPopup(false);
      return () => {};
    }, []),
  );

  const getImage = async img => {
    console.log('🚀 ~ getImage ~ img:', img);

    let formdata = new FormData();
    formdata.append(ApiConnections.KEYS.APP_ID, Globals.APP_ID);
    formdata.append(ApiConnections.KEYS.PROFILE_PIC, img);

    const [isSuccess, message, data] = await post(
      ApiConnections.CHANGE_PROFILE_PIC,
      formdata,
    );
    console.log(
      '🚀 ~ loginAction ~ data:---------------',
      isSuccess,
      message,
      data,
    );

    if (isSuccess) {
      dispatch(setProfilePicture(data?.profile_pic));
      Toast.show(message);
    } else {
      Toast.show(message);
    }
  };
  const onToggleSwitch = async value => {
    console.log('🚀 ~ onToggleSwitch ~ value:', value);
    let status = 0;
    if (value) {
      status = 1;
    }
    setIsSwitchOn(value);
    let formdata = new FormData();
    formdata.append(ApiConnections.KEYS.NOTIFICATION, status);
    formdata.append(ApiConnections.KEYS.APP_ID, Globals.APP_ID);

    const [isSuccess, message, data] = await post(
      ApiConnections.CHANGE_NOTIFICATION,
      formdata,
    );

    console.log(
      '🚀 ~ loginAction ~ data:---------------',
      isSuccess,
      message,
      data,
    );
  };
  const logOutAction = async () => {
    setIsLoading(true);
    let body = {
      [ApiConnections.KEYS.ACTION]: 'logout',
    };
    const [isSuccess, message, data] = await post(ApiConnections.LOG_OUT, body);
    // console.log(
    //   '🚀 ~ loginAction ~ data:---------------',
    //   isSuccess,
    //   message,
    //   data,
    // );
    setIsLoading(false);
    if (isSuccess) {
      dispatch(setUserDetails(null));
      dispatch(setSessionToken(null));
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
  };
  const enableLanguageSwichingPopUp = () => {
    setVisibleLanguagePopup(true);
  };
  const closeModal = () => {
    setVisibleLanguagePopup(false);
  };
  return (
    <Components.NetworkWrapper>
      <Components.CustomStatusBar />
      <Components.Header
        showDrawer={true}
        title={'Profile'}
        showLanguageButton={true}
        languageButtonAction={enableLanguageSwichingPopUp}
      />

      {/* Profile image container */}
      <Components.RtlView style={styles.profileImageContainer}>
        <Components.GetImage
          source={userDetails?.profile_pic}
          style={styles.profileImage}
        />

        <Components.IconButton
          onPress={() => setShowImagePicker?.(true)}
          style={styles.cameraButton}>
          <MaterialIcons
            name={'camera-alt'}
            color={Colors.PRIMARY_COLOR}
            size={22}
          />
        </Components.IconButton>
      </Components.RtlView>

      {/* Name */}

      <View style={{alignItems: 'center', marginTop: responsiveHeight(2)}}>
        <Components.RtlText style={styles.name}>
          {userDetails?.fullname?.toUpperCase()}
        </Components.RtlText>
        <Components.ItemSeperator height={responsiveHeight(0.5)} />
        <Components.RtlView style={{alignItems: 'center'}}>
          <Components.RtlText style={styles.email}>
            {userDetails?.email}
          </Components.RtlText>
        </Components.RtlView>
      </View>
      {/* menu */}
      <Components.ItemSeperator height={responsiveHeight(4)} />
      <Components.RtlView style={styles.button}>
        <Ionicons
          name={'notifications-outline'}
          size={responsiveWidth(5)}
          style={{marginHorizontal: responsiveWidth(1)}}
          color={Colors.PRIMARY_COLOR}
        />
        <Components.RtlText style={styles.buttonText}>
          {I18n.t('Notification')}
        </Components.RtlText>
        <Switch
          value={isSwitchOn}
          color={Colors.PRIMARY_COLOR}
          onValueChange={onToggleSwitch}
        />
      </Components.RtlView>
      <Components.ProfileButton
        title={'Change Name'}
        action={() => {
          console.log('Onpressed');
          setTitle(PROFILE_BUTTON_ACTION.CHANGE_NAME);
          setShowEditPopup(true);
        }}>
        <Image
          source={Images.EDIT_NAME}
          style={{
            width: responsiveWidth(5),
            height: responsiveWidth(6),
            marginHorizontal: responsiveWidth(1),
            tintColor: Colors.PRIMARY_COLOR,
          }}
        />
      </Components.ProfileButton>

      <Components.ProfileButton
        title={I18n.t('Edit_Email')}
        action={() => {
          setTitle(PROFILE_BUTTON_ACTION.CHANGE_EMAIL);
          setShowEditPopup(true);
        }}>
        <Fontisto
          name={'email'}
          size={responsiveWidth(5)}
          style={{marginHorizontal: responsiveWidth(1)}}
          color={Colors.PRIMARY_COLOR}
        />
      </Components.ProfileButton>
      <Components.ProfileButton
        title={'Change password'}
        action={() => {
          setTitle(PROFILE_BUTTON_ACTION.CHANGE_PASSWORD);
          setShowEditPopup(true);
        }}>
        <Feather
          name={'lock'}
          size={responsiveWidth(5)}
          style={{marginHorizontal: responsiveWidth(1)}}
          color={Colors.PRIMARY_COLOR}
        />
      </Components.ProfileButton>

      <Components.CustomButton
        title={'Log out'}
        isLoading={isLoading}
        onPress={logOutAction}>
        <Entypo
          name={'log-out'}
          color={Colors.WHITE}
          size={20}
          style={{
            marginLeft:
              currentLanguage === 'ar' ? undefined : responsiveWidth(2),
            marginRight:
              currentLanguage === 'en' ? undefined : responsiveWidth(2),
            transform: [
              {rotateY: currentLanguage === 'ar' ? '180deg' : '0deg'},
            ],
          }}
        />
      </Components.CustomButton>
      <Components.LangaugeScelectionPopup
        isVisible={visibleLanguagePopup}
        closeModal={closeModal}
      />
      <Components.EditPoup
        isVisible={showEditPopup}
        closeEditPopup={setShowEditPopup}
        title={title}
      />

      <Components.ImagePicker
        isVisible={showImagePicker}
        closePopup={setShowImagePicker}
        passImage={getImage}
      />
    </Components.NetworkWrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileImageContainer: {
    alignSelf: 'center',
    width: responsiveWidth(40),
    height: responsiveWidth(30),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderRadius: 100,

    borderWidth: 3,
    borderColor: Colors.PRIMARY_COLOR,
  },
  cameraButton: {
    position: 'absolute',
    right: '8%',
    bottom: 0,
    borderRadius: 100,
  },
  name: {
    fontFamily: Fonts.INTER_SEMIBOLD,
    fontSize: responsiveFontSize(1.8),
  },
  email: {
    fontFamily: Fonts.INTER_SEMIBOLD,
    fontSize: responsiveFontSize(1.5),
  },
  button: {
    borderRadius: 5,
    padding: 3,
    height: responsiveHeight(6),
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.PRIMARY_COLOR,
    marginTop: responsiveHeight(2),
  },
  buttonText: {
    fontFamily: Fonts.INTER_SEMIBOLD,
    fontSize: responsiveFontSize(1.9),
    color: Colors.PRIMARY_COLOR,
    flex: 1,
  },
});
