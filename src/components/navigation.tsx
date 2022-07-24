import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Details: { Category: number | undefined };
};

const Stack = createStackNavigator<RootStackParamList>();

// screens

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen}  />
        <Stack.Screen name='Details' component={DetailsScreen}   initialParams={{ Category: undefined}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}