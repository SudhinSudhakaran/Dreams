import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import VideoItemComponent from './VideoItemComponent';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import GetImage from './../getImage/GetImage';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../constants/colors/Colors';
import Swiper from 'react-native-swiper';
const VideoList = ({navigation, data = [], coverImage}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showVideoIndex, setShowVideoIndex] = useState(null);
  const RenderItem = ({item, index}) => {
    console.log('🚀 ~ RenderItem ~ item:', item);

    return (
      <View
        style={{
          height: responsiveHeight(28),
          width: responsiveWidth(93),
          backgroundColor: '#ffffff',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          overflow: 'hidden',
        }}>
        {showVideoIndex === index ? (
          <VideoItemComponent
            navigation={navigation}
            item={item?.link || item?.videoLink}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setShowVideoIndex(prev => index);
            }}
            activeOpacity={0.8}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 5,
              overflow: 'hidden',
            }}>
            <GetImage
              source={coverImage}
              resizeMode="stretch"
              style={{
                // flex: 1,
                width: '100%',
                height: '95%',
                borderRadius: 5,
              }}
            />
            <Entypo
              name={'controller-play'}
              color={Colors.PRIMARY_COLOR}
              size={responsiveWidth(20)}
              style={{position: 'absolute', top: '35%', left: '43%'}}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return data?.length > 0 ? (
    <View
      style={{
        backgroundColor: '#ffffff',
        alignItems: 'center',
        width: responsiveWidth(93),
      }}>
      {/* <Carousel
        data={data}
        renderItem={_renderItem}
        sliderWidth={responsiveWidth(93)}
        itemWidth={responsiveWidth(93)}
        scrollEnabled={data?.length > 1}
        contentContainerStyle={{
          alignSelf: 'center',
        }}
        onSnapToItem={index => {
          setActiveSlide(index);
        }}
      /> */}
      {/* <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          backgroundColor: '#ffffff',
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: Colors.PRIMARY_COLOR,
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /> */}

      <Swiper style={{}}>
        {data?.map((item, index) => {
          return <RenderItem item={item} index={index} />;
        })}
      </Swiper>
    </View>
  ) : null;
};

export default VideoList;

const styles = StyleSheet.create({});
