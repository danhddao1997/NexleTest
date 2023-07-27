import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Category} from 'ts/DAOs';
import {useAppDispatch, useAppSelector} from 'rtk/slices';
import {toggleSelectedCategories} from 'rtk/slices/persisted';
import {fetchCategoriesThunk} from 'rtk/thunks/categories';
import CText from 'components/CText';

const CategoryItem = ({item}: {item: Category | number}) => {
  const selectedCategories = useAppSelector(
    state => state.persisted.selectedCategories,
  );
  const dispatch = useAppDispatch();

  const isSelected = useMemo(() => {
    return typeof item === 'object'
      ? selectedCategories.indexOf(item.id) > -1
      : false;
  }, [item, selectedCategories]);

  const onItemSelect = useCallback(() => {
    typeof item === 'object' && dispatch(toggleSelectedCategories(item.id));
  }, [dispatch, item]);

  return typeof item === 'object' ? (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onItemSelect}
      style={[
        styles.item,
        styles.itemContainer,
        isSelected ? undefined : styles.border,
      ]}>
      {isSelected ? (
        <LinearGradient
          style={styles.background}
          colors={['#8A32A9', '#8A00FF']}
          start={{x: 0.2, y: 1}}
          end={{x: 1.2, y: 0}}
          locations={[0, 1]}
        />
      ) : undefined}
      <CText style={styles.title}>{item.name}</CText>
    </TouchableOpacity>
  ) : (
    <View style={styles.item} />
  );
};

const CategoryList = () => {
  const categories = useAppSelector(state => state.categories.categories);
  const isLoading = useAppSelector(state => state.categories.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchCategoriesThunk());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const ListEmptyComponent = useMemo(() => {
    return isLoading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <CText style={styles.no_item}>No items found</CText>
    );
  }, [isLoading]);

  const renderItem = useCallback(({item}: {item: Category | number}) => {
    return <CategoryItem item={item} />;
  }, []);

  const keyExtractor = useCallback(
    (item: Category | number, index: number) =>
      typeof item === 'number' ? index + '' : `category-${item.id}`,
    [],
  );

  const listData = useMemo(() => {
    const {length} = categories;
    const rem = length % 3;
    if (rem === 0) {
      return categories;
    } else {
      return [...categories, ...Array(3 - rem).fill(-1)];
    }
  }, [categories]) as [Category | -1];

  return (
    <FlatList
      data={listData}
      keyExtractor={keyExtractor}
      numColumns={3}
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={styles.columnWrapper}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={renderItem}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  item: {
    width: '30%',
  },
  itemContainer: {
    height: 71,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    color: '#fff',
    lineHeight: 23,
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  border: {
    borderColor: '#ffffff1F',
    borderWidth: 1,
  },
  contentContainer: {
    padding: 16,
  },
  columnWrapper: {
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  no_item: {
    color: '#ffffff80',
    textAlign: 'center',
    lineHeight: 23,
  },
});
