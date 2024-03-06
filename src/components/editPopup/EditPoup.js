import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {Colors, Fonts, Globals} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Style} from '../../constants';
import RtlView from '../rtlComponents/RtlView';
import RtlText from '../rtlComponents/RtlText';
import I18n from '../../i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconButton from '../iconButton/IconButton';
import RtlButton from '../rtlComponents/RtlButton';
import RadioButton from '../radioButton/RadioButton';
import Toast from 'react-native-simple-toast';
import {useSelector, useDispatch} from 'react-redux';
import {_setSelectedLanguage} from '../../redux/slices/useDetails/userSlice';
import CustomButton from '../customButton/CustomButton';
import ApiConnections from '../../helpers/apiConnection/ApiConnections';
import {useNetworkManager} from '../../helpers/apiConnection/NetworkManager';
import {PROFILE_BUTTON_ACTION} from '../../constants/enums/Enums';
import ChangeName from '../changeName/ChangeName';
import ChangeEmail from '../changeEmail/ChangeEmail';
import ChangePassword from '../changePassword/ChangePassword';
import InputField from '../input/InputField';
const EditPoup = ({isVisible, closeEditPopup, title}) => {
  const dispatch = useDispatch();
  const {get, post} = useNetworkManager();
  const [selectedLanguage, setSelectedLanguage] = useState({});
  const {userDetails, currentLanguage, isFirstLogin} = useSelector(
    state => state?.user,
  );

  const [name, setName] = useState(userDetails?.fullname);
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // console.log('🚀 ~ useLayoutEffect ~ currentLanguage:', currentLanguage);
    setSelectedLanguage({languageCode: currentLanguage});

    return () => {};
  }, [isVisible]);
  const close = () => {
    Keyboard.dismiss();
    closeEditPopup?.();
  };
  const getTitle = () => {
    switch (title) {
      case PROFILE_BUTTON_ACTION.CHANGE_NAME:
        return 'Change Name';
        break;
      case PROFILE_BUTTON_ACTION.CHANGE_EMAIL:
        return I18n.t('Edit_Email');
        break;
      case PROFILE_BUTTON_ACTION.CHANGE_PASSWORD:
        return 'Change Password';
        break;
      default:
        return '';
        break;
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      hasBackdrop={true}
      backdropOpacity={0.02}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      animationInTiming={1000}
      onBackButtonPress={() => {
        close?.();
      }}
      onBackdropPress={() => {
        close?.();
      }}
      animationOutTiming={1000}
      style={styles.bottomModal}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
        behavior="padding"
        enabled
        keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : -300}>
        <View
          style={[
            styles.container,
            {
              ...Style.shadow,
              minHeight:
                title === PROFILE_BUTTON_ACTION.CHANGE_PASSWORD
                  ? responsiveHeight(55)
                  : responsiveHeight(30),
            },
          ]}>
          <RtlView>
            <View style={{justifyContent: 'center', flex: 1}}>
              <RtlText style={Style.popupTitles}>{getTitle()}</RtlText>
            </View>
            <IconButton
              onPress={() => close?.()}
              style={{
                borderRadius: 100,
                width: responsiveWidth(7),
                height: responsiveWidth(7),
              }}>
              <Ionicons name="close" size={22} color={Colors.PRIMARY_COLOR} />
            </IconButton>
          </RtlView>

          {title === PROFILE_BUTTON_ACTION.CHANGE_NAME ? (
            <ChangeName onClose={closeEditPopup} />
          ) : null}
          {title === PROFILE_BUTTON_ACTION.CHANGE_EMAIL ? (
            <ChangeEmail onClose={closeEditPopup} />
          ) : null}
          {title === PROFILE_BUTTON_ACTION.CHANGE_PASSWORD ? (
            <ChangePassword onClose={closeEditPopup} />
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditPoup;

const styles = StyleSheet.create({
  bottomModal: {
    margin: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: Colors.WHITE,
    width: responsiveWidth(100),
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingHorizontal: responsiveWidth(4),
    paddingTop: responsiveHeight(2),
    borderWidth: 1,
    borderColor: Colors.PRIMARY_COLOR,
  },
  listButton: {
    alignItems: 'center',
  },
  listText: {
    color: Colors.TITLE_COLOR,
    fontFamily: Fonts.INTER_SEMIBOLD,
    marginVertical: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    marginHorizontal: responsiveWidth(2),
  },
});
