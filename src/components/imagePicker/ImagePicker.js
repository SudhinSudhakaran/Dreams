import {
  FlatList,
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
import Imagepicker from 'react-native-image-crop-picker';
import {useNetworkManager} from '../../helpers/apiConnection/NetworkManager';
import ProfileButton from '../profileButton/ProfileButton';
import {IMAGE_PICK_OPTION} from '../../constants/enums/Enums';

import {request, PERMISSIONS} from 'react-native-permissions';
import uuid from 'react-native-uuid';
const ImagePicker = ({isVisible, closePopup, passImage}) => {
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
    return () => {};
  }, [isVisible]);

  const getImage = async option => {
    let image_temp = null;
    switch (option) {
      case IMAGE_PICK_OPTION.CAMERA:
        const result = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA,
        );
        if (result === 'granted') {
          // Permission granted, proceed with opening the camera
          // Call imagePicker.openCamera here
          Imagepicker.openCamera({
            width: 400,
            height: 400,
            cropping: true,
          }).then(image => {
            let _name = uuid.v4();
            image_temp = {
              uri: image.path,
              type: image.mime,
              name: `${_name}.jpg`,
            };

            console.log('image_temp', image_temp);
            passImage?.(image_temp);
            closePopup?.();
          });
        } else {
          // Handle the case where permission is not granted
          console.log('Camera permission denied');
          closePopup?.();
        }

        break;
      case IMAGE_PICK_OPTION.GALLERY:
        Imagepicker.openPicker({
          width: 400,
          height: 400,
          cropping: true,
        }).then(image => {
          let _name = uuid.v4();
          image_temp = {
            uri: image.path,
            type: image.mime,
            name: `${_name}.jpg`,
          };

          console.log('image_temp', image_temp);
          passImage?.(image_temp);
          closePopup?.();
        });
        break;
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
          closePopup?.();
        }}
        onBackdropPress={() => {
          closePopup?.();
        }}
        animationOutTiming={1000}
        style={styles.bottomModal}>
        <View
          style={[
            styles.container,
            {
              ...Style.shadow,
            },
          ]}>
          <RtlView>
            <View style={{justifyContent: 'center', flex: 1}}>
              <RtlText style={Style.popupTitles}>{'Select an option'}</RtlText>
            </View>
            <IconButton
              onPress={() => closePopup?.()}
              style={{
                borderRadius: 100,
                width: responsiveWidth(7),
                height: responsiveWidth(7),
              }}>
              <Ionicons name="close" size={22} color={Colors.PRIMARY_COLOR} />
            </IconButton>
          </RtlView>

          <ProfileButton
            title={I18n.t('Take_Photo')}
            action={() => {
              getImage(IMAGE_PICK_OPTION.CAMERA);
            }}>
            <MaterialIcons
              name={'camera-alt'}
              color={Colors.PRIMARY_COLOR}
              size={responsiveWidth(5)}
            />
          </ProfileButton>
          <ProfileButton
            title={I18n.t('Choose_Form_Gallery')}
            action={() => {
              getImage(IMAGE_PICK_OPTION.GALLERY);
            }}>
            <MaterialIcons
              name={'photo-library'}
              color={Colors.PRIMARY_COLOR}
              size={responsiveWidth(5)}
            />
          </ProfileButton>
        </View>
      </Modal>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  bottomModal: {
    margin: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: Colors.WHITE,
    width: responsiveWidth(100),
    minHeight: responsiveHeight(30),
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
