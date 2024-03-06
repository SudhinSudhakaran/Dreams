import {FlatList, StyleSheet, Text, View} from 'react-native';
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
const LangaugeScelectionPopup = ({isVisible, closeModal}) => {
  const dispatch = useDispatch();
  const {get, post} = useNetworkManager();
  const [selectedLanguage, setSelectedLanguage] = useState({});
  const {userDetails, currentLanguage, isFirstLogin} = useSelector(
    state => state?.user,
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // console.log('🚀 ~ useLayoutEffect ~ currentLanguage:', currentLanguage);
    setSelectedLanguage({languageCode: currentLanguage});

    return () => {};
  }, [isVisible]);

  const langiageButtonAction = async () => {
    let _language = selectedLanguage?.languageCode === 'en' ? 'en' : 'ar';

    if (userDetails) {
      setIsLoading(true);
      let formdata = new FormData();
      formdata.append(ApiConnections.KEYS.APP_ID, Globals.APP_ID);
      formdata.append(ApiConnections.KEYS.LANGUAGE, _language);

      const [isSuccess, message, data] = await post(
        ApiConnections.CHANGE_LANGUAGE,
        formdata,
      );
      // console.log(
      //   '🚀 ~ loginAction ~ data:---------------',
      //   isSuccess,
      //   message,
      //   data,
      // );
      setIsLoading(false);
      if (isSuccess) {
        I18n.locale = data?.language;
        dispatch(_setSelectedLanguage(data?.language));
        closeModal?.();
      } else {
        Toast.show(message);
      }
    } else {
      I18n.locale = _language;
      dispatch(_setSelectedLanguage(_language));
      closeModal?.();
    }
  };

  return (
    <View>
      <Modal
        isVisible={isVisible}
        hasBackdrop={true}
        backdropOpacity={0.02}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        animationInTiming={1000}
        onBackButtonPress={() => {
          closeModal?.();
        }}
        onBackdropPress={() => {
          closeModal?.();
        }}
        animationOutTiming={1000}
        style={styles.bottomModal}>
        <View style={[styles.container, {...Style.shadow}]}>
          <RtlView>
            <View style={{justifyContent: 'center', flex: 1}}>
              <RtlText style={Style.popupTitles}>
                {I18n.t('Change_Language')}
              </RtlText>
            </View>
            <IconButton
              onPress={closeModal}
              style={{
                borderRadius: 100,
                width: responsiveWidth(7),
                height: responsiveWidth(7),
              }}>
              <Ionicons name="close" size={22} color={Colors.PRIMARY_COLOR} />
            </IconButton>
          </RtlView>
          <View style={{marginTop: responsiveHeight(1)}}>
            <RtlButton
              onPress={() => {
                setSelectedLanguage(Globals.LANGUAGE_OPTIONS[0]);
              }}
              style={styles.listButton}>
              <RadioButton
                isChecked={
                  selectedLanguage?.languageCode ===
                  Globals.LANGUAGE_OPTIONS[0]?.languageCode
                }
              />

              <RtlText style={styles.listText}>
                {Globals.LANGUAGE_OPTIONS[0].title}
              </RtlText>
            </RtlButton>
            <RtlButton
              onPress={() => {
                setSelectedLanguage(Globals.LANGUAGE_OPTIONS[1]);
              }}
              style={styles.listButton}>
              <RadioButton
                isChecked={
                  selectedLanguage?.languageCode ===
                  Globals.LANGUAGE_OPTIONS[1]?.languageCode
                }
              />
              <RtlText style={styles.listText}>
                {Globals.LANGUAGE_OPTIONS[1].title}
              </RtlText>
            </RtlButton>

            <CustomButton
              title={I18n.t('Change_Language')}
              onPress={langiageButtonAction}
              isLoading={isLoading}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LangaugeScelectionPopup;

const styles = StyleSheet.create({
  bottomModal: {
    margin: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: Colors.WHITE,
    width: responsiveWidth(100),
    height: responsiveHeight(30),
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
