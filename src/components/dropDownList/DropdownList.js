import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors, Fonts} from '../../constants';

import RtlView from '../rtlComponents/RtlView';
import {Components} from '../index';
import {Globals} from '../../constants/globals/Globals';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {useDispatch} from 'react-redux';
import I18n from '../../i18n';
import {_setSelectedLanguage} from '../../redux/slices/useDetails/userSlice';
const DropdownList = ({}) => {
  const [showList, setShowList] = useState(false);
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  let timeoutId; // declare a variable to hold the timeout ID
  const animation = useSharedValue({height: 0});

  const animationStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(animation.value.height, {
        duration: 400,
      }),
    };
  });

  /**
 <---------------------------------------------------------------------------------------------->
 * Purpose:  open languages list
 * Created/Modified By: Sudhin Sudhakaran
 * Created/Modified Date: 14-02-2024
 * Steps:
 * 1.  Change the value fo showList state
 <---------------------------------------------------------------------------------------------->
 */
  const openLanguageList = option => {
    console.log('🚀 ~ openLanguageList ~ option:', option);
    if (option) {
      setSelectedLanguage(option?.title);

      I18n.locale = option?.languageCode === 'en' ? 'en' : 'ar';
      dispatch(_setSelectedLanguage(option?.languageCode));
    }

    // Clear any existing timeout
    clearTimeout(timeoutId);

    if (showList) {
      animation.value = {height: 0};
      timeoutId = setTimeout(() => {
        setShowList(!showList);
      }, 500);
    } else {
      animation.value = {height: responsiveHeight(10)};
      setShowList(!showList);
    }
  };
  return (
    <View>
      <Components.RtlButton onPress={openLanguageList} style={styles.container}>
        <Components.RtlView style={styles.textContainer}>
          <Components.RtlText style={styles.text}>
            {selectedLanguage}
          </Components.RtlText>
        </Components.RtlView>

        <Entypo
          style={styles.icon}
          color={Colors.PRIMARY_COLOR}
          name="chevron-down"
          size={20}
        />
      </Components.RtlButton>
      {showList && (
        <Animated.View style={[styles.listContainder, animationStyle]}>
          <Components.RtlButton
            onPress={() => openLanguageList(Globals?.LANGUAGE_OPTIONS?.[0])}
            style={styles.listButton}>
            <Components.RtlText style={styles.listText}>
              {Globals.LANGUAGE_OPTIONS[0].title}
            </Components.RtlText>
          </Components.RtlButton>
          <Components.RtlButton
            onPress={() => openLanguageList(Globals?.LANGUAGE_OPTIONS?.[1])}
            style={styles.listButton}>
            <Components.RtlText style={styles.listText}>
              {Globals.LANGUAGE_OPTIONS[1].title}
            </Components.RtlText>
          </Components.RtlButton>
        </Animated.View>
      )}
    </View>
  );
};

export default DropdownList;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginTop: responsiveHeight(2),
    borderColor: Colors.PRIMARY_COLOR,
    height: responsiveHeight(5),
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(1),
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(1),
    backgroundColor: '#ffffff',
  },
  text: {
    color: Colors.TITLE_COLOR,
    fontFamily: Fonts.INTER_SEMIBOLD,
    fontSize: responsiveFontSize(2),
  },
  icon: {},
  listContainder: {
    // height: responsiveHeight(10),
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.PRIMARY_COLOR,
    borderRightColor: Colors.PRIMARY_COLOR,
    borderBottomColor: Colors.PRIMARY_COLOR,
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
    backgroundColor: '#ffffff',
  },
  listButton: {
    paddingHorizontal: responsiveWidth(2),
  },
  listText: {
    color: Colors.TITLE_COLOR,
    fontFamily: Fonts.INTER_SEMIBOLD,
    marginVertical: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
  },
});
