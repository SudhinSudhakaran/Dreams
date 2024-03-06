import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {Components} from '../../components';
import {Colors, Fonts, Images} from '../../constants';
import I18n from '../../i18n';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
const CustomDrawerContent = props => {
  const navigation = useNavigation();

  const {currentLanguage} = useSelector(state => state?.user);

  const otherEvAppsAction = () => {
    navigation.navigate('OtherEvApps');
  };
  const navigationAction = id => {
    navigation.navigate('PrivacyPolicyScreen', {pageId: id});
  };
  return (
    <DrawerContentScrollView
      // style={{paddingHorizontal: responsiveWidth(2)}}
      {...props}>
      <DrawerItemList {...props} />
      <Components.ItemSeperator height={responsiveHeight(48)} />
      <Components.DrawerButton
        action={() => navigation.navigate('DreamsSubjectList')}
        title={'Subjects'}>
        <View style={styles.child}>
          <Image source={Images.LIST} style={styles.menuIcon} />
        </View>
      </Components.DrawerButton>
      <Components.DrawerButton
        action={() => navigation.navigate('DreamsCharList')}
        title={'DreamsCharList'}>
        <View style={styles.child}>
          <Image source={Images.LIST} style={styles.menuIcon} />
        </View>
      </Components.DrawerButton>
      <Components.DrawerButton
        action={() => navigation.navigate('DreamsList', {item: null})}
        title={'Dreams List'}>
        <View style={styles.child}>
          <Image source={Images.LIST} style={styles.menuIcon} />
        </View>
      </Components.DrawerButton>
      <Components.DrawerButton
        action={() => navigation.navigate('SubscriptionScreen')}
        title={I18n.t('Subscribe')}>
        <View style={styles.child}>
          <MaterialCommunityIcons
            name={'crown-outline'}
            size={responsiveWidth(6)}
            color={Colors.PRIMARY_COLOR}
            style={{}}
          />
        </View>
      </Components.DrawerButton>
      <Components.DrawerButton
        action={navigationAction}
        title={'Privacy Policy'}
        pageId={59}>
        <View style={styles.child}>
          <Image source={Images.COOKIE_POLICY} style={styles.menuIcon} />
        </View>
      </Components.DrawerButton>
      <Components.DrawerButton
        action={navigationAction}
        title={'Cookie Policy'}
        pageId={46}>
        <View style={styles.child}>
          <Image source={Images.PRICAY_POLICY} style={styles.menuIcon} />
        </View>
      </Components.DrawerButton>
      <Components.DrawerButton
        action={navigationAction}
        title={'Terms and Conditions'}
        pageId={47}>
        <View style={styles.child}>
          <Image source={Images.TERMS_AND_CONDITION} style={styles.menuIcon} />
        </View>
      </Components.DrawerButton>

      <Components.ItemSeperator height={responsiveHeight(1)} />
      <Components.CustomButton
        title={I18n.t('Other_Ev_Apps')}
        onPress={otherEvAppsAction}
      />
      <Components.ItemSeperator height={responsiveHeight(2)} />
      <View>
        <Components.RtlText style={styles.poweredByText} textAlign={'center'}>
          {I18n.t('Powered_By')}
        </Components.RtlText>
        <Components.RtlText
          textAlign={'center'}
          onPress={() => Linking.openURL(EV_LINK)}
          style={styles.evText}>
          {I18n.t('Electronic_Village')}
        </Components.RtlText>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  poweredByText: {
    fontFamily: Fonts.INTER_SEMIBOLD,
    fontSize: responsiveFontSize(1.5),
    color: Colors.TITLE_COLOR,
  },
  evText: {
    fontFamily: Fonts.INTER_EXTRA_BOLD,
    fontSize: responsiveFontSize(2.5),
    color: Colors.PRIMARY_COLOR,
    textShadowColor: Colors.BACKGROUND_COLOR,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  menuIcon: {
    width: responsiveWidth(5),
    height: responsiveWidth(6),
    tintColor: Colors.PRIMARY_COLOR,
    marginHorizontal: responsiveWidth(2),
  },
  child: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
