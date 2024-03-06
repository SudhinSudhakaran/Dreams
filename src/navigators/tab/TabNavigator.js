import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Screens} from '../../screens';
import {Colors} from '../../constants';
import {Fonts} from '../../constants/fonts/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import {useSelector} from 'react-redux';
import I18n from '../../i18n';
const Tab = createBottomTabNavigator();

const getIcon = (label, isFocused) => {
  if (label === I18n.t('Home'))
    return (
      <Entypo name="home" color={isFocused ? Colors.WHITE : '#222'} size={20} />
    );
  if (label === I18n.t('Settings'))
    return (
      <Ionicons
        name="settings"
        color={isFocused ? Colors.WHITE : '#222'}
        size={20}
      />
    );
  if (label === I18n.t('Profile'))
    return (
      <Entypo name="user" color={isFocused ? Colors.WHITE : '#222'} size={20} />
    );
};
function MyTabBar({state, descriptors, navigation, tabBarIcons}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopColor: Colors.PRIMARY_COLOR,
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingVertical: responsiveHeight(0.5),
        backgroundColor: Colors.PRIMARY_COLOR,
        shadowColor: Colors.PRIMARY_COLOR,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5.46,

        elevation: 9,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            key={index} // Add a unique key
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: responsiveHeight(7),
              paddingBottom: responsiveHeight(1),
              backgroundColor: Colors.PRIMARY_COLOR,
            }}>
            {getIcon(label, isFocused)}
            <Text
              style={{
                color: isFocused ? Colors.WHITE : '#222',
                fontFamily: Fonts.INTER_BOLD,
                fontSize: responsiveFontSize(1.4),
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabNavigator = () => {
  const {currentLanguage, userDetails} = useSelector(state => state.user);

  const isRTL = currentLanguage === 'ar';

  const tabs = isRTL
    ? [
        {
          name: userDetails ? 'ProfileScreen' : 'LoginScreen',
          label: I18n.t('Profile'),
          icon: ({color, size}) => (
            <Entypo name="user" color={color} size={size} />
          ),
          options: {
            tabBarIconStyle: {
              marginTop: responsiveHeight(1),
            },
          },
        },
        {
          name: 'SettingsScreen',
          label: I18n.t('Settings'),
          icon: ({color, size}) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          options: {
            tabBarIconStyle: {
              marginTop: responsiveHeight(1),
            },
          },
        },
        {
          name: 'HomeScreen',
          label: I18n.t('Home'),
          icon: ({color, size}) => (
            <Entypo name="home" color={color} size={size} />
          ),
          options: {
            tabBarIconStyle: {
              marginTop: responsiveHeight(1),
            },
          },
        },
      ]
    : [
        {
          name: 'HomeScreen',
          label: 'Home',
          icon: ({color, size}) => (
            <Entypo name="home" color={color} size={size} />
          ),
          options: {
            tabBarIconStyle: {
              marginTop: responsiveHeight(1),
            },
          },
        },
        {
          name: 'SettingsScreen',
          label: 'Settings',
          icon: ({color, size}) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          options: {
            tabBarIconStyle: {
              marginTop: responsiveHeight(1),
            },
          },
        },
        {
          name: userDetails ? 'ProfileScreen' : 'LoginScreen',
          label: 'Profile',
          icon: ({color, size}) => (
            <Entypo name="user" color={color} size={size} />
          ),
          options: {
            tabBarIconStyle: {
              marginTop: responsiveHeight(1),
            },
          },
        },
      ];

  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY_COLOR,
        sceneContainerStyle: {transform: [{scaleX: -1}]},
        tabBarLabelStyle: {
          fontFamily: Fonts.INTER_BOLD,
        },

        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: responsiveHeight(7),
          position: 'absolute',
        },
      }}>
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={Screens[tab.name]}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: tab.icon,
            ...tab.options,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
