import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants';
import RtlView from '../rtlComponents/RtlView';
import {Style} from '../../constants/styles/Style';
import LottieView from 'lottie-react-native';
import RtlText from '../rtlComponents/RtlText';
import ItemSeperator from '../itemSeperator/ItemSeperator';
import RtlButton from '../rtlComponents/RtlButton';
import I18n from '../../i18n';
import CustomButton from '../customButton/CustomButton';
const SuccessPopup = ({isVisible, text, onClose}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => onClose?.()}
      backdropOpacity={0.5}
      style={{
        margin: 0,
      }}>
      <View style={{...styles.modalContainer, ...Style.shadow}}>
        <ItemSeperator height={responsiveHeight(1)} />
        <View
          style={{
            height: responsiveHeight(9),
            width: responsiveHeight(10),
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <LottieView
            source={require('../../assets/animations/success.json')}
            autoPlay
            loop
            style={styles.lottieView}
            speed={1}
            colorFilters={[
              {keypath: 'check', color: Colors.PRIMARY_COLOR},
              {keypath: 'circle', color: 'green'},
            ]}
          />
        </View>
        <ItemSeperator height={responsiveHeight(1)} />
        <RtlText style={{...Style.popupTitles}} textAlign={'center'}>
          {text}
        </RtlText>

        <CustomButton
          title={I18n.t('Okay_Got_it')}
          onPress={() => onClose?.()}
          style={{}}
        />
      </View>
    </Modal>
  );
};

export default SuccessPopup;

const styles = StyleSheet.create({
  modalContainer: {
    width: responsiveWidth(80),
    backgroundColor: Colors.WHITE,
    height: responsiveHeight(25),
    alignSelf: 'center',
    borderRadius: 5,
  },
  lottieView: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    alignSelf: 'center',
  },
});
