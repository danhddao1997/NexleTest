import {StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import assets from 'assets';
import VectorImage from 'react-native-vector-image';
import Form from './Form';

const Content = () => {
  return (
    <SafeAreaView style={styles.container}>
      <VectorImage
        source={assets.icons.chevron_left}
        style={styles.back_icon}
      />
      <Form />
    </SafeAreaView>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  flex_1: {
    flex: 1,
  },
  back_icon: {
    width: 40,
    height: 40,
    marginTop: 8,
    marginLeft: 12,
  },
  title: {
    fontSize: 22,
    color: '#fff',
  },
});
