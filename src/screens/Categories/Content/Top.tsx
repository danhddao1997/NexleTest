import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {Header} from '@react-navigation/elements';
import VectorImage from 'react-native-vector-image';
import assets from 'assets';
import {useAppSelector} from 'rtk/slices';
import CText from 'components/CText';

const HeaderRight = () => {
  const selectedCategories = useAppSelector(
    state => state.persisted.selectedCategories,
  );

  const categories = useAppSelector(state => state.categories.categories);

  return useMemo(() => {
    return selectedCategories.length > 0 && categories.length > 0 ? (
      <TouchableOpacity activeOpacity={0.8}>
        <CText style={styles.doneButton}>Done</CText>
      </TouchableOpacity>
    ) : undefined;
  }, [categories.length, selectedCategories.length]);
};

const ContentTop = () => {
  const headerLeft = useCallback(
    () => (
      <TouchableOpacity activeOpacity={0.8}>
        <VectorImage
          source={assets.icons.chevron_left}
          style={styles.back_icon}
        />
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <Header
        headerLeft={headerLeft}
        headerRight={HeaderRight}
        headerLeftContainerStyle={styles.headerLeftContainer}
        headerRightContainerStyle={styles.headerRightContainer}
        title={''}
        headerStyle={styles.header}
      />
      <View style={styles.bottom}>
        <CText style={styles.title}>Welcome to Nexle Entrance Test</CText>
        <CText style={styles.subtitle}>
          Please select categories what you would like to see on your feed. You
          can set this later on Filter.
        </CText>
      </View>
    </View>
  );
};

export default ContentTop;

const styles = StyleSheet.create({
  container: {
    height: '35%',
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
    color: '#fff',
  },
  subtitle: {
    color: '#ffffffd1',
    lineHeight: 23,
  },
  doneButton: {
    color: '#fff',
  },
  headerLeftContainer: {
    paddingLeft: 16,
  },
  headerRightContainer: {
    paddingRight: 16,
  },
  back_icon: {width: 24, height: 24},
});
