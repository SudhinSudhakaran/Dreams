import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Components} from '../../../components';
import {useSelector, useDispatch} from 'react-redux';
import I18n from '../../../i18n';
const HomeScreen = () => {
  const [visibleLanguagePopup, setVisibleLanguagePopup] = useState(false);
  const {userDetails, isFirstLogin, currentLanguage, name} = useSelector(
    state => state.user,
  );
  const enableLanguageSwichingPopUp = () => {
    setVisibleLanguagePopup(true);
  };
  const closeModal = () => {
    setVisibleLanguagePopup(false);
  };
  return (
    <Components.NetworkWrapper>
      <Components.CustomStatusBar />
      <Components.Header
        showDrawer={true}
        title={I18n.translate('Home')}
        showSearchButton={true}
        showLanguageButton={true}
        languageButtonAction={enableLanguageSwichingPopUp}
      />

      <Components.LangaugeScelectionPopup
        isVisible={visibleLanguagePopup}
        closeModal={closeModal}
      />
    </Components.NetworkWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
