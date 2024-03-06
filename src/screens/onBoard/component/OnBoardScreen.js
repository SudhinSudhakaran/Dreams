import {
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Components} from '../../../components';
import {Colors, Images} from '../../../constants';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {Globals} from '../../../constants/globals/Globals';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {setIsFirstLogin} from '../../../redux/slices/useDetails/userSlice';

import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const OnBoardScreen = () => {
  // values from redux
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {userDetails} = useSelector(state => state.user);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const exploreButtonAction = () => {
    dispatch(setIsFirstLogin(false));

    navigation.reset({
      index: 0,
      routes: [{name: 'DrawerNavigator'}],
    });
  };
  return (
    <Components.NetworkWrapper backgroundColor={Colors.BACKGROUND_COLOR}>
      <Components.CustomStatusBar />
      <View style={styles.container}>
        <Components.ItemSeperator height={responsiveHeight(20)} />
        <Components.AppLogoComponent />
        <Components.ItemSeperator height={responsiveHeight(10)} />
        <Components.DropdownList />
        <Components.CustomButton
          style={{width: responsiveWidth(30)}}
          title={'Explore'}
          onPress={exploreButtonAction}
        />
      </View>
      <Components.PrivacyPolicyComponent />
      <Components.ItemSeperator height={responsiveHeight(5)} />
    </Components.NetworkWrapper>
  );
};

export default OnBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
