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
import {useNetworkManager} from '../../../helpers/apiConnection/NetworkManager';
import ApiConnections from '../../../helpers/apiConnection/ApiConnections';
import VideoList from '../../../components/videoComponent/VideoList';
import {HTMLView} from 'react-native-htmlview';
import Loader from './Loader';
const PrivacyPolicyScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {get, getPrivacyDetails} = useNetworkManager();
  const route = useRoute();
  const {pageId} = route.params;
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
    setIsLoading(true);
    let body = {
      [ApiConnections.KEYS.PAGE_ID]: pageId,
      [ApiConnections.KEYS.LANGUAGE]: currentLanguage === 'ar' ? 1 : 2,
    };
    const [isSuccess, message, response] = await getPrivacyDetails(
      ApiConnections.PRIVACY_POLICY,
      body,
    );

    if (isSuccess) {
      setIsLoading(false);
      setData(response?.page);
    } else {
      setIsLoading(false);
    }
    console.log(
      '🚀 ~ fetchData ~ APPLICATIONS_:',
      isSuccess,
      message,
      response,
    );
  };
  const closeImageFullView = () => {
    setShowImageFullView(false);
  };
  const selectImageAction = _index => {
    setCurrentIndex(_index);
    setShowImageFullView(true);
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: responsiveHeight(8),
          }}>
          <Components.HtmlView source={data?.description} />
        </ScrollView>
      ) : (
        <Loader />
      )}
    </Components.NetworkWrapper>
  );
};

export default PrivacyPolicyScreen;

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
