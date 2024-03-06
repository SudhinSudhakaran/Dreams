import {StyleSheet, Text, View, Image, Linking} from 'react-native';
import React from 'react';
import HTMLView from 'react-native-htmlview';
import GetImage from '../getImage/GetImage';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors, Fonts} from '../../constants';

const HtmlView = ({source}) => {
  function renderNode(node, index, siblings, parent, defaultRenderer) {
    // console.log('renderNode', node, index, siblings, parent, defaultRenderer)

    if (node.name == 'p') {
      const specialStyle = node.attribs.style;
      return (
        <Text
          key={index}
          style={[
            specialStyle,
            {
              textAlign: 'justify',
              fontFamily: Fonts.INTER_REGULAR,
              fontSize: responsiveFontSize(1.8),
              color: Colors.TITLE_COLOR,
            },
          ]}>
          {defaultRenderer(node.children, parent)}
        </Text>
      );
    }
    if (node.name == 'img') {
      const a = node.attribs;
      return (
        <GetImage
          style={{width: responsiveWidth(90), height: responsiveHeight(25)}}
          source={a.src}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      {source ? (
        <HTMLView
          value={source}
          stylesheet={styles}
          renderNode={renderNode}
          onLinkPress={url => Linking.openURL(url)}
        />
      ) : null}
    </View>
  );
};

export default HtmlView;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: responsiveWidth(93),
  },
  p: {width: 100},
});
