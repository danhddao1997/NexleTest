import {StyleSheet} from 'react-native';
import React, {memo} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Gradient = memo(() => {
  return (
    <LinearGradient
      style={styles.gradient}
      colors={['#1d223821', '#000']}
      locations={[0, 0.35]}
    />
  );
});

export default Gradient;

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
});
