/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Videoplay from './videoPlay';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts} from '../../constants';
const {height, width} = Dimensions.get('screen');
const isLargeScreen = width >= 768;
const titleExtSize = isLargeScreen ? 90 : 0;
const leftMargin = isLargeScreen ? 32 : 0;
const titleSize = isLargeScreen ? 8 : 0;
const extraHeight = isLargeScreen ? 180 : 0;
const VERTICAL_VIEW_WIDTH = isLargeScreen ? 90 : 60;
const VideoItemComponent = ({item, navigation, poster}) => {
  // states

  const [selectedFile, setSelectedFile] = useState('720');
  const [videoFiles, setVideoFiles] = useState([]);
  const [videoIsLoading, setVideoIsLoading] = useState(true);
  const [link, setLink] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  useEffect(() => {
    console.log('Video Item component', item);
    loadVideo(item);

    return () => {};
  }, [item]);

  const handleQualityChange = selectedQuality => {
    setSelectedFile(selectedQuality);
    setLink(selectedQuality?.link);
    console.log('selectedFile', selectedFile);
    toggleMenu();
  };
  const fadeAnimation = new Animated.Value(0);

  const toggleMenu = () => {
    if (!menuVisible) {
      setMenuVisible(true);
    } else {
      setMenuVisible(false);
    }
  };
  const menuStyle = {
    opacity: fadeAnimation,
    transform: [
      {
        scale: fadeAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };
  const RenderQualityOptions = () => {
    return videoFiles.map(_item => (
      <TouchableOpacity
        onPress={() => handleQualityChange(_item)}
        key={_item?.rendition.toString()}
        style={[
          styles.qualityOption,
          _item === selectedFile && styles.selectedQualityOption,
        ]}>
        <Text
          style={{
            color: _item === selectedFile ? '#fff' : '#000',
            fontSize: 10,
          }}>
          {_item?.rendition === 'adaptive' ? 'Mp3' : _item?.rendition}
        </Text>
      </TouchableOpacity>
    ));
  };

  const loadVideo = async item => {
    setVideoIsLoading(true);
    const videoId = item?.match(/vimeo\.com\/(\d+)/i)[1];
    const response = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
      headers: {
        Authorization: 'Bearer d9637d5d2beb40131e526edd58930e8f',
        'Content-Type': 'application/json',
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
      },
    });
    const videoData = await response.json();
    // console.log('videoData ===========', videoData);

    const url = videoData.files.find(
      file => file.rendition === selectedFile,
    )?.link;
    const availableQualities = videoData?.files.map(file => file.rendition);
    console.log('videoData', videoData?.files, videoData.files?.[0]);

    setVideoFiles(videoData?.files);
    setSelectedFile(videoData.files?.[0]);
    setLink(videoData.files?.[0]?.link);

    setVideoIsLoading(false);
  };

  return link !== '' ? (
    <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
      <View
        style={{
          borderWidth: 1,
          width: responsiveWidth(93),
          height: responsiveHeight(26),
          borderRadius: 5,
        }}>
        <Videoplay navigation={navigation} videoLink={link} />
        {!videoIsLoading && videoFiles.length > 0 && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: responsiveWidth(5),
              top: responsiveWidth(5),
            }}
            onPress={() => {
              toggleMenu();
            }}>
            <Icon name="settings-outline" color={'white'} size={20} />
          </TouchableOpacity>
        )}
        {menuVisible && (
          <ScrollView
            style={[styles.menu]}
            contentContainerStyle={{alignItems: 'center'}}>
            <RenderQualityOptions />
          </ScrollView>
        )}
      </View>
    </TouchableWithoutFeedback>
  ) : null;
};

export default VideoItemComponent;

const styles = StyleSheet.create({
  container: {
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    marginBottom: 5,
    marginRight: 5,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.TITLE_COLOR,
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: responsiveWidth(3.5),
    overflow: 'hidden',
    paddingVertical: 5,
  },
  audioContainer: {
    margin: 15,
    alignSelf: 'flex-end',
  },
  qualityOptionsContainer: {
    width: responsiveHeight(4),
    height: responsiveHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    position: 'absolute',
    right: 10,
  },
  qualityOption: {
    paddingHorizontal: 10,
    backgroundColor: Colors.BACKGROUND_COLOR,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(2.5),
    width: responsiveWidth(15),
    marginTop: 5,
  },
  selectedQualityOption: {
    backgroundColor: Colors.PRIMARY_COLOR,
  },

  videoPlayContainer: {
    flex: 1,
    backgroundColor: '#EDEDED',
    alignSelf: 'center',
    borderRadius: 20,
  },
  videoImageContainer: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoThumbnailStyle: {
    height: '100%',
    borderRadius: 5,
  },

  videoTitleContainer: {
    width: '86%',
  },
  videoTitleStyle: {
    textAlign: 'left',
    fontSize: responsiveFontSize(2),
    color: Colors.WHITE,
    fontFamily: Fonts.INTER_SEMIBOLD,
    marginLeft: 5,
  },
  videoMediaContainer: {},
  videoPlayerContainer: {width: '90%', height: '80%'},
  menu: {
    position: 'absolute',
    top: 30,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 8,
  },
  menuItem: {},
});
