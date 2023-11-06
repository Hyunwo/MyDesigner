import React from 'react';
import { Text, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen'; // MainScreen 컴포넌트를 별도의 파일로 분리해야 함
import HomeScreen from './screens/HomeScreen'; // HomeScreen 컴포넌트를 별도의 파일로 분리해야 함

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="MyDesisgner" component={MainScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
