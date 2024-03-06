import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {Components} from '../../../components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Screens} from '../../index';
import {setUserDetails} from '../../../redux/slices/useDetails/userSlice';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors, Fonts} from '../../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import I18n from '../../../i18n';
import Loader from './Loader';
import {useNetworkManager} from '../../../helpers/apiConnection/NetworkManager';
import ApiConnections from '../../../helpers/apiConnection/ApiConnections';
import Toast from 'react-native-simple-toast';
const OtherEvApps = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {get, post} = useNetworkManager();
  // values from redux
  const {userDetails, currentLanguage} = useSelector(state => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData?.();
      return () => {};
    }, []),
  );

  const fetchData = async () => {
    setIsLoading(true);
    let body = {
      [ApiConnections.KEYS.LANGUAGE]: currentLanguage === 'ar' ? 1 : 2,
    };
    const [isSuccess, message, response] = await get(
      ApiConnections.APPLICATIONS_LIST,
      body,
    );

    setIsLoading(false);
    if (isSuccess) {
      setData(response?.applications);
    } else {
      Toast.show(message);
    }
  };

  const navigationToDetails = item => {
    navigation?.navigate('OtherEvAppDetails', {item: item});
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigationToDetails?.(item)}
        activeOpacity={0.8}
        style={styles.container}>
        <Components.GetImage
          source={item?.applicationIcon}
          style={styles.appIcon}
        />
        <Components.RtlText style={styles.appName}>
          {item?.name}
        </Components.RtlText>
      </TouchableOpacity>
    );
  };
  return (
    <Components.NetworkWrapper>
      <Components.CustomStatusBar />
      <Components.Header
        title={I18n.t('Other_Ev_Apps')}
        backButtonAction={navigation?.goBack}
        showBackButton={true}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <View>
          <Components.ItemSeperator height={responsiveHeight(2)} />
          <FlatList
            data={data}
            keyExtractor={(item, index) =>
              item?.appId ? item?.appId?.toString() : index?.toString()
            }
            renderItem={renderItem}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: responsiveWidth(1.5),
              paddingBottom: responsiveHeight(15),
            }}
            bounces={false}
          />
        </View>
      )}
    </Components.NetworkWrapper>
  );
};

export default OtherEvApps;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(27),
    height: responsiveHeight(18),
    marginTop: responsiveHeight(2),
    marginRight: responsiveWidth(4),
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
  appIcon: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    alignSelf: 'center',
    marginTop: responsiveHeight(0.8),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.BACKGROUND_COLOR,
  },
  appName: {
    fontFamily: Fonts.INTER_MEDIUM,
    marginHorizontal: responsiveWidth(2),
    marginTop: responsiveHeight(1),
  },
});
