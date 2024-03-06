import React, {useState, useLayoutEffect} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import ContentLoader, {Facebook, Rect} from 'react-content-loader/native';
import {Images} from '../../constants';
import {useFocusEffect} from '@react-navigation/native';

const GetImage = ({
  source,
  isLocal,
  style,
  resizeMode = 'cover',
  shadowStyle,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageUri, setImageUri] = useState('');
  // useLayoutEffect(() => {

  //   return () => {
  //     setImageUri('');
  //   };
  // }, [source]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setImageUri(source + '&' + 'test=12' + new Date().getTime());
  //     return () => {
  //       setImageUri('');
  //     };
  //   }, [source]),
  // );

  const onLoadStart = () => {
    setIsLoading(true);
    setError(false);
  };

  const onLoadEnd = () => {
    setIsLoading(false);
  };

  const onError = () => {
    setIsLoading(false);
    setError(true);
  };

  const getResizeMode = mode => {
    switch (mode) {
      case 'cover':
        return FastImage.resizeMode.cover;
      case 'center':
        return FastImage.resizeMode.center;
      case 'contain':
        return FastImage.resizeMode.contain;
      case 'stretch':
        return FastImage.resizeMode.stretch;
      default:
        return FastImage.resizeMode.stretch;
    }
  };

  const Loader = ({style}) => (
    <View
      style={{
        ...style,
        borderWidth: 0,
        overflow: 'hidden',
      }}>
      <ContentLoader
        height={'100%'}
        speed={1}
        backgroundColor={'#D3D3D3'}
        foregroundColor={'gray'}
        opacity={0.2}>
        <Rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
      </ContentLoader>
    </View>
  );

  return (
    <View
      style={{
        ...style,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
      }}>
      <FastImage
        {...props}
        source={{
          uri: source,
          headers: {Accept: '*/*'},
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.web,
        }}
        style={{
          flex: 1,
          ...style,
          ...shadowStyle,
          borderWidth: isLoading || error ? 0 : style.borderWidth,
        }}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}
        resizeMode={getResizeMode(resizeMode)}
      />

      {isLoading && <Loader style={style} />}
      {error && (
        <Image
          source={Images.DEFAULT_IMAGE}
          style={{
            ...style,
            borderWidth: isLoading ? 0 : style.borderWidth,
          }}
        />
      )}
    </View>
  );
};

GetImage.propTypes = {
  source: PropTypes.string.isRequired,
  style: PropTypes.object,
  imageResizeMode: PropTypes.oneOf(['cover', 'center', 'contain', 'stretch']),
};

GetImage.defaultProps = {
  style: {},
  resizeMode: 'stretch',
};

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
});
export default GetImage;
