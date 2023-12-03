import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import MyInfoScreen from './screens/MyInfoScreen';
import SettingsScreen from './screens/SettingsScreen';
import MapScreen from './screens/MapScreen';
import DesignerListScreen from './screens/DesignerListScreen';
import DesignerDetailsScreen from './screens/DesignerDetailsScreen';
import DSignupScreen from './screens/DSignupScreen';
import MapSelectorScreen from './screens/MapSelectorScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="MyDesisgner" component={MainScreen} />
        <Stack.Screen name="로그인" component={LoginScreen} />
        <Stack.Screen name="회원가입" component={SignupScreen} />
        <Stack.Screen name="홈" component={HomeScreen} />
        <Stack.Screen name="검색" component={SearchScreen} />
        <Stack.Screen name="내정보" component={MyInfoScreen} />
        <Stack.Screen name="설정" component={SettingsScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="DesignerList" component={DesignerListScreen} />
        <Stack.Screen name="DesignerDetails" component={DesignerDetailsScreen} />
        <Stack.Screen name="디자이너 회원가입" component={DSignupScreen} />
        <Stack.Screen name="헤어샵 검색" component={MapSelectorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
