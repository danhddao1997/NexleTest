import React, {useMemo} from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import SignUpScreen from 'screens/SignUp';
import CategoriesScreen from 'screens/Categories';
import {useAppSelector} from 'rtk/slices';

const AppStack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

const AppStackComponent = () => {
  const user = useAppSelector(state => state.persisted.user);

  const screen = useMemo(() => {
    return user ? (
      <AppStack.Screen name="Categories" component={CategoriesScreen} />
    ) : (
      <AppStack.Screen name="SignUp" component={SignUpScreen} />
    );
  }, [user]);

  return (
    <AppStack.Navigator screenOptions={screenOptions}>
      {screen}
    </AppStack.Navigator>
  );
};

export default AppStackComponent;
