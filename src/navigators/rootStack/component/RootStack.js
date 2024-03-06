// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../../../screens';
import DrawerNavigator from '../../drawer/DrawerNavigator';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const {currentLanguage} = useSelector(state => state.user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation:
            currentLanguage === 'en' ? 'slide_from_right' : 'slide_from_left',
        }}
        initialRouteName="EntryScreen">
        <Stack.Screen name="EntryScreen" component={Screens.EntryScreen} />
        <Stack.Screen name="OnBoardScreen" component={Screens.OnBoardScreen} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="LoginScreen" component={Screens.LoginScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={Screens.ForgotPasswordScreen}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={Screens.RegisterScreen}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={Screens.ResetPasswordScreen}
        />
        <Stack.Screen name="OtpScreen" component={Screens.OtpScreen} />
        <Stack.Screen name="ProfileScreen" component={Screens.ProfileScreen} />
        <Stack.Screen
          name="OtherEvAppDetails"
          component={Screens.OtherEvAppDetails}
        />
        <Stack.Screen name="OtherEvApps" component={Screens.OtherEvApps} />

        <Stack.Screen
          name="PrivacyPolicyScreen"
          component={Screens.PrivacyPolicyScreen}
        />
        <Stack.Screen
          name="SubscriptionScreen"
          component={Screens.SubscriptionScreen}
        />
        <Stack.Screen
          name="DreamsCharList"
          component={Screens.DreamsCharList}
        />
        <Stack.Screen name="DreamsList" component={Screens.DreamsList} />
        <Stack.Screen
          name="DreamsSubjectList"
          component={Screens.DreamsSubjectList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
