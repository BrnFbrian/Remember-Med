import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { MainColors } from '../constants/theme';
import HomeScreen from '../src/screens/HomeScreen';
import LoginScreen from '../src/screens/LoginScreen';
import ReminderFormScreen from '../src/screens/ReminderFormScreen';
import ReminderListScreen from '../src/screens/ReminderListScreen';
import SplashScreen from '../src/screens/SplashScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  ReminderList: undefined;
  ReminderForm: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: MainColors.darkBlueBase,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}

        />
        <Stack.Screen
          name="ReminderList"
          component={ReminderListScreen}
          options={{ headerShown: false }}

        />
        <Stack.Screen
          name="ReminderForm"
          component={ReminderFormScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

