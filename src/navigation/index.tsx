import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppStackComponent from './stacks/AppStack';

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppStackComponent />
    </NavigationContainer>
  );
};

export default AppNavigation;
