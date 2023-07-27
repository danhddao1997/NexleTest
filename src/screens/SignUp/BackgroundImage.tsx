import {Image, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import assets from 'assets';

const BackgroundImage = memo(() => {
  return (
    <Image
      source={assets.images.signup_bg}
      style={styles.image}
      resizeMode="cover"
    />
  );
});

export default BackgroundImage;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    zIndex: -2,
  },
});
