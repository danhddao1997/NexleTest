import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import VectorImage from 'react-native-vector-image';
import {PRIMARY_COLOR} from 'utils/constants';
import assets from 'assets';
import CText from 'components/CText';

interface Props {
  value: boolean;
  setValue: () => void;
}

const OldEnoughField = memo(({value, setValue}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={setValue}
        testID="form-age-checkbox">
        <VectorImage
          source={assets.icons[value ? 'square_check' : 'square']}
          style={styles.icon}
          tintColor={value ? undefined : PRIMARY_COLOR}
        />
      </TouchableOpacity>
      <CText style={styles.text}>I am over 16 years of age</CText>
    </View>
  );
});

export default OldEnoughField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  icon: {width: 32, height: 32},
  text: {color: '#fff', marginLeft: 8},
});
