import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Screens} from '../../screens';
import TabNavigator from '../tab/TabNavigator';
import {useSelector} from 'react-redux';
import CustomDrawerContent from './CustomDrawerContent';
import {Colors, Fonts} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Components} from '../../components';
import I18n from '../../i18n';
const DrawerNavigator = () => {
  const {currentLanguage} = useSelector(state => state?.user);
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerPosition: currentLanguage === 'en' ? 'left' : 'right',
        drawerType: 'front',
        drawerStyle: {
          //  backgroundColor: Colors.BACKGROUND_COLOR,
        },
        drawerItemStyle: {
          backgroundColor: Colors.WHITE,
        },
        drawerLabelStyle: {
          fontFamily: Fonts.INTER_SEMIBOLD,
          fontSize: 16, // Assuming you have responsiveFontSize function
          color: Colors.PRIMARY_COLOR,
          // textAlign: currentLanguage === 'en' ? 'left' : 'right',
          // marginHorizontal: currentLanguage === 'en' ? 0 : 0, // Adjust this value as needed
          marginRight: -50,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerLabel: () => (
            <Components.RtlView
              style={{
                width: responsiveWidth(58),
                marginLeft:
                  currentLanguage === 'en' ? responsiveWidth(1) : undefined,
              }}>
              <Ionicons name={'home'} size={22} color={Colors.PRIMARY_COLOR} />
              <Components.RtlText
                style={{
                  fontFamily: Fonts.INTER_SEMIBOLD,
                  fontSize: responsiveFontSize(1.9),
                  color: Colors.PRIMARY_COLOR,
                  marginHorizontal: responsiveWidth(2),
                }}>
                {I18n.translate('Home')}
              </Components.RtlText>
            </Components.RtlView>
          ),

          drawerItem: props => (
            <TouchableOpacity disabled={true} onPress={() => {}}>
              <View {...props} />
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
