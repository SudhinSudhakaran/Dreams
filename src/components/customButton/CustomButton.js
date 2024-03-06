import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {Colors, Fonts} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import RtlButton from '../rtlComponents/RtlButton';
import RtlText from '../rtlComponents/RtlText';
import {Style} from '../../constants/styles/Style';
import LottieView from 'lottie-react-native';

const CustomButton = ({children, title, onPress, style, isLoading = false}) => {
  const [buttonWidth] = useState(new Animated.Value(responsiveWidth(0))); // Initial width of the button

  useEffect(() => {
    if (isLoading) {
      // Animate the width to zero
      Animated.timing(buttonWidth, {
        toValue: responsiveWidth(8),
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      // Animate the width back to its original size
      Animated.timing(buttonWidth, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isLoading]);

  return (
    <RtlButton
      onPress={onPress}
      style={{...styles.buttonContainer, ...style}}
      disabled={isLoading}>
      {children}
      <RtlText style={{...styles.buttonText}} textAlign={'center'}>
        {title}
      </RtlText>
      {isLoading && (
        <Animated.View
          style={{
            width: buttonWidth,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',

            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <LottieView
            source={require('../../assets/animations/AnimationLoader.json')}
            autoPlay
            loop
            style={styles.lottieView}
            speed={1}
            colorFilters={[
              {keypath: 'Camada de forma 1', color: Colors.WHITE},
              {keypath: 'Camada de forma 2', color: Colors.WHITE},
              {keypath: 'Camada de forma 3', color: Colors.WHITE},
              {keypath: 'Camada de forma 4', color: Colors.WHITE},
            ]}
          />
        </Animated.View>
      )}
    </RtlButton>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.PRIMARY_COLOR,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(4),
    borderRadius: 5,
    height: responsiveHeight(5),
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    overflow: 'hidden',
  },
  buttonText: {
    color: Colors.WHITE,
    marginHorizontal: responsiveWidth(2.5),
    fontFamily: Fonts.INTER_BOLD,
    fontSize: responsiveFontSize(2),
  },
  lottieView: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
  },
});
