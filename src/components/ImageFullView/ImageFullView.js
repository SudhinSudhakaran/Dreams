import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import ImageZoom from 'react-native-image-pan-zoom';
import GetImage from '../getImage/GetImage';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconButton from '../iconButton/IconButton';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constants';
import RtlView from '../rtlComponents/RtlView';
const ImageFullView = ({data, isVisible, currentIndex, onClose}) => {
  console.log('🚀 ~ ImageFullView ~ data:', data);

  return (
    <Modal
      isVisible={isVisible}
      hideModalContentWhileAnimating={true}
      animationIn="zoomIn"
      animationOut="zoomOut"
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.9}
      onBackButtonPress={() => () => onClose?.()}
      onBackdropPress={() => () => onClose?.()}
      style={styles.modal}>
      <View style={{...styles.containerModal, alignItems: 'center'}}>
        <IconButton onPress={() => onClose?.()} style={styles.close}>
          <Ionicons name="close" size={22} color={Colors.PRIMARY_COLOR} />
        </IconButton>
        <Swiper style={styles.swiper} index={currentIndex}>
          {data?.map(item => {
            return (
              <View style={styles.imageZoomContainer}>
                <ImageZoom
                  cropWidth={responsiveWidth(100)}
                  cropHeight={responsiveHeight(98)}
                  imageWidth={responsiveWidth(96)}
                  maxOverflow={100}
                  imageHeight={responsiveHeight(98)}>
                  <Image
                    resizeMode="contain"
                    source={{uri: item}}
                    style={styles.swipeImg}
                  />
                </ImageZoom>
              </View>
            );
          })}
        </Swiper>
      </View>
    </Modal>
  );
};

export default ImageFullView;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000000',
    margin: 0,
  },
  containerModal: {
    flex: 1,
  },
  close: {
    borderRadius: 100,
    width: responsiveWidth(7),
    height: responsiveWidth(7),
    position: 'absolute',
    top: responsiveHeight(3),
    right: responsiveWidth(5),
    zIndex: 100,
  },
  swiper: {},
  swipeImg: {
    height: responsiveHeight(90),
    width: responsiveWidth(93),
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
  },
  imageZoomContainer: {
    justifyContent: 'center',
  },
});
