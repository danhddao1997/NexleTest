import {StyleSheet, View} from 'react-native';
import React from 'react';
import ContentTop from './Top';
import CategoryList from './CategoryList';

const Content = () => {
  return (
    <View style={styles.container}>
      <ContentTop />
      <CategoryList />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
