import {StyleSheet, View} from 'react-native';
import React from 'react';
import BackgroundImage from './BackgroundImage';
import Gradient from './Gradient';
import Content from './Content';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <BackgroundImage />
      <Gradient />
      <Content />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
