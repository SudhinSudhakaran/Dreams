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
import Loader from '../../otherEvApps/component/Loader';
import ListEmptyComponent from '../../../components/listFooter/ListEmptyComponent';
const DreamsCharList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {get, getPrivacyDetails} = useNetworkManager();
  const route = useRoute();

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
    let _l = currentLanguage === 'ar' ? 1 : 2;
    const [isSuccess, message, response] = await get(
      `${ApiConnections.DREAMS_CHAR}?language=${_l}`,
    );

    if (isSuccess) {
      setIsLoading(false);
      setData(response?.entity);
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

  const onPressAction = item => {
    navigation.navigate('DreamsList', {item: item});
  };
  const renderItem = ({item}) => {
    // console.log('🚀 ~ renderItem ~ item:', item);

    return (
      <TouchableOpacity
        onPress={() => {
          onPressAction?.(item);
        }}
        activeOpacity={0.8}
        style={styles.rendarItemcontainer}>
        <View style={styles.charConainer}>
          <Components.RtlText style={styles.appName}>
            {item?.char}
          </Components.RtlText>
        </View>
        <Components.RtlText style={styles.charName}>
          {item?.title}
        </Components.RtlText>
      </TouchableOpacity>
    );
  };
  return (
    <Components.NetworkWrapper>
      <Components.CustomStatusBar />
      <Components.Header
        title={'Dreams Charlist'}
        backButtonAction={navigation?.goBack}
        showBackButton={true}
      />
      {!isLoading ? (
        <View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index?.toString()}
            renderItem={renderItem}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: responsiveWidth(1.5),
              paddingBottom: responsiveHeight(15),
            }}
            bounces={false}
            ListEmptyComponent={<ListEmptyComponent />}
          />
        </View>
      ) : (
        <Loader />
      )}
    </Components.NetworkWrapper>
  );
};

export default DreamsCharList;

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
  rendarItemcontainer: {
    width: responsiveWidth(27.5),
    height: responsiveHeight(15),
    marginTop: responsiveHeight(2),
    marginRight: responsiveWidth(4),
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    borderRadius: 5,
    shadowOffset: {
      width: 0.5,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  charConainer: {
    width: '70%',
    height: '60%',
    marginTop: responsiveHeight(1.5),

    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontFamily: Fonts.INTER_BOLD,
    fontSize: responsiveFontSize(5),
    color: Colors.PRIMARY_COLOR,
  },
  charName: {
    fontFamily: Fonts.INTER_SEMIBOLD,
    fontSize: responsiveFontSize(2),
    color: Colors.TITLE_COLOR,
    marginHorizontal: '15%',
  },
});
