import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RtlView from '../rtlComponents/RtlView';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import RtlText from '../rtlComponents/RtlText';
import {Colors, Style} from '../../constants';
import IconButton from '../iconButton/IconButton';
import {useSelector} from 'react-redux';
const Header = ({
  showDrawer,
  showBackButton,
  backButtonAction,
  title,
  showSearchButton,
  searchButtonAction,
  showLanguageButton,
  languageButtonAction,
  showGridListButton,
  gridListAction,
  isList,
}) => {
  const navigation = useNavigation();

  const {currentLanguage} = useSelector(state => state.user);
  const drawerButtonAction = () => {
    navigation.toggleDrawer();
  };
  return (
    <RtlView style={styles.header}>
      {showDrawer && (
        <IconButton onPress={drawerButtonAction}>
          <Entypo
            size={responsiveWidth(7)}
            name={'menu'}
            color={Colors.PRIMARY_COLOR}
          />
        </IconButton>
      )}
      {showBackButton && (
        <IconButton
          onPress={backButtonAction}
          style={{
            transform: [
              {rotateY: currentLanguage === 'ar' ? '180deg' : '0deg'},
            ],
          }}>
          <Ionicons
            size={responsiveWidth(7)}
            name={'arrow-back'}
            color={Colors.PRIMARY_COLOR}
          />
        </IconButton>
      )}
      <RtlView style={{flex: 1, paddingHorizontal: responsiveWidth(2)}}>
        <RtlText style={Style.popupTitles}>{title}</RtlText>
      </RtlView>

      {showLanguageButton ? (
        <IconButton
          onPress={languageButtonAction}
          style={{marginHorizontal: responsiveWidth(1)}}>
          <MaterialIcons
            size={responsiveWidth(6)}
            name={'language'}
            color={Colors.PRIMARY_COLOR}
          />
        </IconButton>
      ) : null}

      {showGridListButton ? (
        <IconButton onPress={gridListAction}>
          <Feather
            size={responsiveWidth(6)}
            name={isList ? 'grid' : 'list'}
            color={Colors.PRIMARY_COLOR}
          />
        </IconButton>
      ) : null}

      {showSearchButton ? (
        <IconButton onPress={searchButtonAction}>
          <Feather
            size={responsiveWidth(6)}
            name={'search'}
            color={Colors.PRIMARY_COLOR}
          />
        </IconButton>
      ) : null}
    </RtlView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.WHITE,
    height: responsiveHeight(6),
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
});
