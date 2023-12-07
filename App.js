import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import WhoScreen from './screens/WhoScreen'
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import MapScreen from './screens/MapScreen';
import MyInfoScreen from './screens/MyInfoScreen';
import DesignerDetailsScreen from './screens/DesignerDetailsScreen';
import DSignupScreen from './screens/DSignupScreen';
import MapSelectorScreen from './screens/MapSelectorScreen';
import DLoginScreen from './screens/DLoginScreen';
import DHomeScreen from './screens/DHomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import ServiceScreen from './screens/ServiceScreen';
import ReservationMenuScreen from './screens/ReservationMenuScreen';
import DateReservtionScreen from './screens/DateReservtionScreen';
import ServiceInfoScreen from './screens/ServiceInfoScreen'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="MyDesisgner" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Who" component={WhoScreen} options={{ title: 'Designer or Customer' }} />
        <Stack.Screen name="SignUp" component={SignupScreen} options={{ title: '회원가입' }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: '디자이너 및 샵 검색' }} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="MyInfo" component={MyInfoScreen} options={{ title: '내정보' }} />
        <Stack.Screen name="설정" component={SettingsScreen} />
        <Stack.Screen name="DesignerDetails" component={DesignerDetailsScreen} />
        <Stack.Screen name="DSignUp" component={DSignupScreen} options={{ title: '회원가입' }} />
        <Stack.Screen name="MapSelector" component={MapSelectorScreen} options={{ title: '헤어샵 검색' }} />
        <Stack.Screen name="DLogin" component={DLoginScreen} />
        <Stack.Screen name="DHome" component={DHomeScreen} />
        <Stack.Screen name="MyProfile" component={MyProfileScreen} options={{ title: '프로필' }} />
        <Stack.Screen name="Service" component={ServiceScreen}/>
        <Stack.Screen name="ReservationMenu" component={ReservationMenuScreen}/>
        <Stack.Screen name="DateReservtion" component={DateReservtionScreen} />
        <Stack.Screen name="ServiceInfo" component={ServiceInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
