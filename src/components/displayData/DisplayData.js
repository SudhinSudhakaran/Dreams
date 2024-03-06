import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ItemSeperator from '../itemSeperator/ItemSeperator';
import ListFooter from '../listFooter/ListFooter';
import ListEmptyComponent from '../listFooter/ListEmptyComponent';

const DisplayData = ({
  data,
  renderItem,
  numColumns,
  isList = false,
  onEndReached,
  isLastPage = true,
  emptyMessage,
}) => {
  return (
    <View style={{alignItems: 'center'}}>
      {!isList && (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index?.toString()}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: responsiveHeight(15),
          }}
          bounces={false}
          onEndReached={onEndReached}
          ListFooterComponent={!isLastPage ? <ListFooter /> : null}
          ListEmptyComponent={<ListEmptyComponent text={emptyMessage} />}
        />
      )}
      {isList && (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index?.toString()}
          renderItem={renderItem}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: responsiveHeight(15),
          }}
          bounces={false}
          onEndReached={onEndReached}
          ListFooterComponent={!isLastPage ? <ListFooter /> : null}
          ListEmptyComponent={<ListEmptyComponent text={emptyMessage} />}
        />
      )}
    </View>
  );
};

export default DisplayData;

const styles = StyleSheet.create({});
