import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/Login/MainScreen';
import WhoScreen from './screens/Login/WhoScreen'
import SignupScreen from './screens/Login/SignupScreen';
import LoginScreen from './screens/Login/LoginScreen';
import HomeScreen from './screens/Home/HomeScreen';
import SearchScreen from './screens/Home/SearchScreen';
import MapScreen from './screens/Home/MapScreen';
import MyInfoScreen from './screens/Profile/MyInfoScreen';
import DesignerDetailsScreen from './screens/Reservation/DesignerDetailsScreen';
import DSignupScreen from './screens/Login/DSignupScreen';
import MapSelectorScreen from './screens/Login/MapSelectorScreen';
import DLoginScreen from './screens/Login/DLoginScreen';
import DHomeScreen from './screens/Home/DHomeScreen';
import SettingsScreen from './screens/Profile/SettingsScreen';
import MyProfileScreen from './screens/Profile/MyProfileScreen';
import UserList from './screens/Home/UserList';
import ServiceScreen from './screens/Profile/ServiceScreen';
import ReservationMenuScreen from './screens/Reservation/ReservationMenuScreen';
import DateReservationScreen from './screens/Reservation/DateReservationScreen';
import ServiceInfoScreen from './screens/Reservation/ServiceInfoScreen'
import FinalReservationScreen from './screens/Reservation/FinalReservationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="MyDesisgner" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Who" component={WhoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignupScreen} options={{ title: '회원가입' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: '로그인' }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: '' }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: '지도에서 찾기' }}/>
        <Stack.Screen name="MyInfo" component={MyInfoScreen} options={{ title: '내정보' }} />
        <Stack.Screen name="설정" component={SettingsScreen} />
        <Stack.Screen name="DesignerDetails" component={DesignerDetailsScreen} />
        <Stack.Screen name="DSignUp" component={DSignupScreen} options={{ title: '회원가입' }} />
        <Stack.Screen name="MapSelector" component={MapSelectorScreen} options={{ title: '헤어샵 검색' }} />
        <Stack.Screen name="DLogin" component={DLoginScreen} options={{ title: '로그인' }}/>
        <Stack.Screen name="DHome" component={DHomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="MyProfile" component={MyProfileScreen} options={{ title: '프로필' }} />
        <Stack.Screen name="UserList" component={UserList} options={{ title: '고객 리스트' }}/>
        <Stack.Screen name="Service" component={ServiceScreen}/>
        <Stack.Screen name="ReservationMenu" component={ReservationMenuScreen} options={{ title: '' }}/>
        <Stack.Screen name="DateReservation" component={DateReservationScreen} options={{ title: '' }}/>
        <Stack.Screen name="ServiceInfo" component={ServiceInfoScreen}options={{ title: '' }} />
        <Stack.Screen name="FinalReservation" component={FinalReservationScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
