import {
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {Components} from '../../../components';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Screens} from '../../index';
import {setUserDetails} from '../../../redux/slices/useDetails/userSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors, Fonts} from '../../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import I18n from '../../../i18n';
import Loader from './Loader';
import {useNetworkManager} from '../../../helpers/apiConnection/NetworkManager';
import ApiConnections from '../../../helpers/apiConnection/ApiConnections';
import VideoList from '../../../components/videoComponent/VideoList';
import {HTMLView} from 'react-native-htmlview';
import DetailsLoader from './DetailsLoader';
import Toast from 'react-native-simple-toast';
const OtherEvAppDetails = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {get, post} = useNetworkManager();
  const route = useRoute();
  const {item} = route.params;
  // values from redux
  const {userDetails, currentLanguage} = useSelector(state => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showImageFullView, setShowImageFullView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  useFocusEffect(
    React.useCallback(() => {
      fetchData?.();
      return () => {};
    }, []),
  );

  const fetchData = async () => {
    console.log('Item', item);
    setIsLoading(true);
    let body = {
      [ApiConnections.KEYS.LANGUAGE]: currentLanguage === 'ar' ? 1 : 2,
      appId: item?.appId,
    };
    const [isSuccess, message, response] = await get(
      ApiConnections.APPLICATIONS_LIST,
      body,
    );

    if (isSuccess) {
      setIsLoading(false);
      setData(response?.applications?.[0]);
    } else {
      setIsLoading(false);
      Toast.show(message);
    }
    console.log('🚀 ~ fetchData ~ APPLICATIONS_:', isSuccess, message, data);
  };
  const closeImageFullView = () => {
    setShowImageFullView(false);
  };
  const selectImageAction = _index => {
    setCurrentIndex(_index);
    setShowImageFullView(true);
  };

  const installButtonAction = () => {
    Linking.openURL(
      Platform.OS === 'ios' ? data?.appStoreLink : data?.googleStoreLink,
    );
  };
  return (
    <Components.NetworkWrapper>
      <Components.CustomStatusBar />
      <Components.Header
        title={!isLoading ? data?.name?.toUpperCase() : ''}
        backButtonAction={navigation?.goBack}
        showBackButton={true}
      />
      {!isLoading ? (
        <>
          <Components.ItemSeperator />
          <Components.RtlView>
            <Components.GetImage
              source={!isLoading ? data?.applicationIcon : ''}
              style={styles.appIcon}
              shadowStyle={styles.shadowStyle}
            />
            <Components.ItemSeperator />
            <View>
              <Components.ItemSeperator height={responsiveHeight(3)} />
              <Components.RtlText style={styles.appName}>
                {data?.name?.toUpperCase()}
              </Components.RtlText>
              <Components.RtlText style={styles.tag}>
                {data?.tagline}
              </Components.RtlText>
              {data?.websiteLink && (
                <Components.RtlView style={{marginTop: responsiveHeight(1)}}>
                  <MaterialCommunityIcons
                    name="web"
                    size={20}
                    color={Colors.PRIMARY_COLOR}
                  />

                  <Components.RtlText
                    onPress={() => {
                      Linking.openURL(data?.websiteLink);
                    }}
                    style={{
                      color: Colors.SIGNUP_TEXT_COLOR,
                      marginHorizontal: responsiveWidth(1),
                    }}>
                    {data?.websiteLink}
                  </Components.RtlText>
                </Components.RtlView>
              )}
              {(data?.appStoreLink || data?.googleStoreLink) && (
                <Components.CustomButton
                  onPress={installButtonAction}
                  title={' Install '}
                  style={{
                    marginTop: responsiveHeight(2),
                    alignSelf:
                      currentLanguage === 'ar' ? 'flex-end' : 'flex-start',
                  }}
                />
              )}
            </View>
          </Components.RtlView>
          <Components.ItemSeperator />
          <ScrollView
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            bounces={false}>
            {data?.videoURL && (
              <VideoList
                data={[{link: data?.videoURL}]}
                coverImage={data?.coverImage}
              />
            )}
            <Components.ItemSeperator height={responsiveHeight(5)} />
            <Components.HtmlView source={data?.description?.trimStart()} />
            <Components.ItemSeperator height={responsiveHeight(5)} />
            {data?.screenshots?.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data?.screenshots?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => selectImageAction?.(index)}
                      style={styles.screenShortContainer}>
                      <Components.GetImage
                        source={item}
                        style={styles.screenShort}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
            <Components.ItemSeperator height={responsiveHeight(5)} />
            {data?.screenshots?.length > 0 && (
              <Components.ImageFullView
                isVisible={showImageFullView}
                data={data?.screenshots}
                onClose={closeImageFullView}
                currentIndex={currentIndex}
              />
            )}
          </ScrollView>
        </>
      ) : (
        <DetailsLoader />
      )}
    </Components.NetworkWrapper>
  );
};

export default OtherEvAppDetails;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(27),
    height: responsiveHeight(18),
    marginTop: responsiveHeight(2),
    marginRight: responsiveWidth(4),
    backgroundColor: '#ffffff',
  },
  appIcon: {
    width: responsiveWidth(35),
    height: responsiveWidth(40),
    alignSelf: 'center',

    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.BACKGROUND_COLOR,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0.5,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  appName: {
    fontFamily: Fonts.INTER_MEDIUM,
    fontSize: responsiveFontSize(2),
  },
  tag: {
    fontFamily: Fonts.INTER_REGULAR,
    fontSize: responsiveFontSize(1.5),
    marginTop: responsiveHeight(1),
  },
  screenShortContainer: {
    width: responsiveWidth(28),
    height: responsiveHeight(18),
    shadowColor: '#000',
    shadowOffset: {
      width: 0.5,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,

    marginRight: responsiveWidth(4),
    // borderWidth: StyleSheet.hairlineWidth,
  },
  screenShort: {
    width: responsiveWidth(28),
    height: responsiveHeight(18),
  },
});
