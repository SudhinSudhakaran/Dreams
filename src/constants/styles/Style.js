import {StyleSheet} from 'react-native';
import {Colors} from '../colors/Colors';
import {Fonts} from '../fonts/fonts';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export const Style = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    borderRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  popupTitles: {
    color: Colors.PRIMARY_COLOR,
    fontFamily: Fonts.INTER_BOLD,
    fontSize: responsiveFontSize(2),
  },
});
