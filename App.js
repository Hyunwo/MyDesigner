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
import DateReservationScreen from './screens/DateReservationScreen';
import ServiceInfoScreen from './screens/ServiceInfoScreen'
import FinalReservationScreen from './screens/FinalReservationScreen';
import UserList from './screens/userList';

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
        <Stack.Screen name="Service" component={ServiceScreen}/>
        <Stack.Screen name="ReservationMenu" component={ReservationMenuScreen} options={{ title: '' }}/>
        <Stack.Screen name="DateReservation" component={DateReservationScreen} options={{ title: '' }}/>
        <Stack.Screen name="ServiceInfo" component={ServiceInfoScreen}options={{ title: '' }} />
        <Stack.Screen name="FinalReservation" component={FinalReservationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="UserList" component={UserList} options={{ title: '고객 리스트' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
