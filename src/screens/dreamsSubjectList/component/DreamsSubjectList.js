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
const DreamsSubjectList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {get, getPrivacyDetails} = useNetworkManager();
  const route = useRoute();

  // values from redux
  const {userDetails, currentLanguage} = useSelector(state => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isList, setIsList] = useState(false);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      fetchData?.(1, true);
      return () => {};
    }, []),
  );
  const gridListAction = () => {
    setIsList(prev => !prev);
  };

  const loadMoreData = () => {
    console.log('loadMoreData', isLoading, isLastPage);
    if (!isLoading && !isLastPage) {
      let pageNumber = page + 1;
      setPage(pageNumber);

      fetchData(pageNumber, false);
    }
  };
  const fetchData = async (pageNumber, showLoader) => {
    if (showLoader) setIsLoading(true);
    let _l = currentLanguage === 'ar' ? 1 : 2;
    const [isSuccess, message, response] = await get(
      `${ApiConnections.DREAMS_SUBJECTS}?language=${_l}&page=${pageNumber}&parentId=0`,
    );

    if (isSuccess) {
      setIsLoading(false);
      setData(oldList => [...response?.entity, ...oldList]);
      setIsLastPage(response?.isLastPage);
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
  const renderGridItem = ({item, index}) => {
    const evenIndex = index % 2 === 0;
    return (
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={0.8}
        style={[
          styles.rendarItemcontainer,
          {marginRight: evenIndex ? responsiveWidth(3) : undefined},
        ]}>
        <View style={styles.charConainer}>
          <Components.RtlText style={styles.appName}>
            {item?.title}
          </Components.RtlText>
        </View>
        <Components.RtlText
          style={styles.charName}
          numberOfLines={2}
          textAlign={'justify'}>
          {item?.description}
        </Components.RtlText>
      </TouchableOpacity>
    );
  };

  const renderListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={0.8}
        style={styles.rendarListItemcontainer}>
        <Components.RtlView style={styles.titleContainer}>
          <Components.RtlText style={styles.title}>
            {item?.title}
          </Components.RtlText>
        </Components.RtlView>
        <Components.RtlText
          style={styles.description}
          numberOfLines={3}
          textAlign={'justify'}>
          {item?.description}
        </Components.RtlText>
      </TouchableOpacity>
    );
  };
  return (
    <Components.NetworkWrapper>
      <Components.CustomStatusBar />
      <Components.Header
        title={'Subjects'}
        backButtonAction={navigation?.goBack}
        showBackButton={true}
        isList={isList}
        showGridListButton={true}
        gridListAction={gridListAction}
      />
      <Components.ItemSeperator />
      {!isLoading ? (
        <View style={{flex: 1}}>
          <Components.DisplayData
            data={data}
            renderItem={isList ? renderListItem : renderGridItem}
            numColumns={1}
            isList={isList}
            onEndReached={loadMoreData}
            isLastPage={isLastPage}
            emptyMessage={'No Subjects Found'}
          />
        </View>
      ) : (
        <Loader />
      )}
    </Components.NetworkWrapper>
  );
};

export default DreamsSubjectList;

const styles = StyleSheet.create({
  rendarItemcontainer: {
    width: responsiveWidth(44),
    height: responsiveHeight(15),
    marginTop: responsiveHeight(2),
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0.5,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  charConainer: {
    width: '90%',
    height: '40%',
    marginTop: responsiveHeight(1.5),

    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontFamily: Fonts.INTER_BOLD,
    fontSize: responsiveFontSize(2),
    color: Colors.PRIMARY_COLOR,
  },
  charName: {
    fontFamily: Fonts.INTER_SEMIBOLD,
    fontSize: responsiveFontSize(2),
    color: Colors.TITLE_COLOR,
    marginHorizontal: '10%',
  },

  //   list

  rendarListItemcontainer: {
    width: responsiveWidth(91),
    marginHorizontal: 5,
    height: responsiveHeight(15),
    marginTop: responsiveHeight(2),
    padding: responsiveWidth(2),
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0.5,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  titleContainer: {
    width: '90%',
    height: '30%',
    marginTop: responsiveHeight(1),
    alignSelf: 'center',
    // alignItems: 'fle',
    // justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.INTER_BOLD,
    fontSize: responsiveFontSize(2),
    color: Colors.PRIMARY_COLOR,
  },
});
