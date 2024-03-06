import React, {useState, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import RtlView from '../rtlComponents/RtlView';
import {Colors, Fonts} from '../../constants';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import RtlText from '../rtlComponents/RtlText';
import * as Animatable from 'react-native-animatable';
const InputField = ({
  label,
  placeholder,
  isPassword,
  onChangeText,
  value,
  error,
  onFocus = () => {},
  ...props
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);
  const [isFocused, setIsFocused] = useState(false);

  const {currentLanguage} = useSelector(state => state?.user);
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        marginTop: responsiveHeight(2),
        height: responsiveHeight(9),
        justifyContent: 'flex-end',
      }}>
      {value ? (
        <Animatable.Text
          animation={fadeIn}
          style={{
            fontSize: responsiveFontSize(1.8),
            marginBottom: 3,
            textAlign: currentLanguage === 'ar' ? 'right' : 'left',
            marginHorizontal: responsiveWidth(1),
          }}
          duration={1500}>
          {label}
        </Animatable.Text>
      ) : null}
      <RtlView
        style={{
          ...styles.inputContainer,
          borderColor: isFocused ? Colors.PRIMARY_COLOR : 'gray',
          borderWidth: isFocused ? 1.5 : 1,
        }}>
        <TextInput
          placeholder={label}
          secureTextEntry={secureTextEntry}
          onChangeText={text => onChangeText(text)}
          activeOutlineColor={Colors.PRIMARY_COLOR}
          value={value}
          autoComplete={'off'}
          autoCorrect={false}
          style={[
            styles.input,
            {
              alignItems: currentLanguage === 'ar' ? 'flex-end' : 'flex-start',
              textAlign: currentLanguage === 'ar' ? 'right' : 'left',
              direction: currentLanguage === 'ar' ? 'rtl' : 'ltr',
            },
          ]}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            style={styles.eyeButton}>
            <Entypo
              name={secureTextEntry ? 'eye-with-line' : 'eye'}
              size={responsiveWidth(5.5)}
              color={Colors.PRIMARY_COLOR}
            />
          </TouchableOpacity>
        )}
      </RtlView>
      {error && !isFocused && (
        <RtlText
          style={styles.error}
          textAlign={currentLanguage === 'en' ? 'right' : 'left'}>
          {error}
        </RtlText>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 4,
    height: responsiveHeight(6),
    alignItems: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: responsiveHeight(6),
    paddingHorizontal: responsiveWidth(4),
    fontFamily: Fonts.INTER_MEDIUM,
    fontSize: responsiveFontSize(1.8),
  },
  error: {
    color: 'red',
  },
  eyeButton: {
    backgroundColor: '#ffffff',
    height: responsiveHeight(6),
    width: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
