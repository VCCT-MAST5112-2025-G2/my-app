import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './WelcomePage';
import MenuApp from './MenuApp';
import FilterMenu from './FilterMenu';
import { MenuProvider } from './MenuContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="MenuApp" component={MenuApp} />
          <Stack.Screen name="FilterMenu" component={FilterMenu} />
        </Stack.Navigator>
      </NavigationContainer>
      </MenuProvider>
  );
}
