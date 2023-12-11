import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fontisto, AntDesign, FontAwesome } from '@expo/vector-icons';
import MainScreen from './screens/MainScreen'; // MainScreen 컴포넌트를 별도의 파일로 분리해야 함
import WhoScreen from './screens/WhoScreen';
import LoginScreen from './screens/LoginScreen';
import DLoginScreen from './screens/DLoginScreen';
import SignupScreen from './screens/SignupScreen';
import DSignupScreen from './screens/DSignupScreen';
import HomeScreen from './screens/HomeScreen'; // HomeScreen 컴포넌트를 별도의 파일로 분리해야 함
import DHomeScreen from './screens/DHomeScreen';
import SearchScreen from './screens/SearchScreen';
import ReserveScreen from './screens/ReserveScreen';
import ReservationMenuScreen from './screens/ReservationMenuScreen';
import StudentcutScreen from './screens/StudentcutScreen';
import StudentcutReservationScreen from './screens/StudentcutReservationScreen';
import MalecutScreen from './screens/MalecutScreen';
import FemalecutScreen from './screens/FemalecutScreen';
import BasicPermScreen from './screens/BasicPermScreen';
import MapScreen from './screens/MapScreen';
import MyInfoScreen from './screens/MyinfoScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReservationListScreen from './screens/ReservationListScreen';
import DReservationListScreen from './screens/DReservationListScreen';
import DesignerListScreen from './screens/DesignerListScreen';
import DesignerDetailsScreen from './screens/DesignerDetailsScreen';
import ConfirmedScreen from './screens/ConfirmedScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '' }} />
        <Stack.Screen name="DHome" component={DHomeScreen} options={{ title: '' }} />
        <Stack.Screen name="Who" component={WhoScreen} options={{ title: 'Designer or Customer' }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DLogin" component={DLoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: '회원가입' }} />
        <Stack.Screen name="DSignup" component={DSignupScreen} options={{ title: '회원가입' }} />
        {/* <Stack.Screen name="MainTab" component={MainTabScreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: '디자이너 및 샵 검색' }} />
        <Stack.Screen name="Reserve" component={ReserveScreen} />
        <Stack.Screen name="ReservationMenu" component={ReservationMenuScreen} />
        <Stack.Screen name="Studentcut" component={StudentcutScreen} />
        <Stack.Screen name="StudentcutReservation" component={StudentcutReservationScreen} />
        <Stack.Screen name="Malecut" component={MalecutScreen} />
        <Stack.Screen name="Femalecut" component={FemalecutScreen} />
        <Stack.Screen name="BasicPerm" component={BasicPermScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="MyInfo" component={MyInfoScreen} options={{ title: '내 프로필' }} />
        <Stack.Screen name="MyProfile" component={MyProfileScreen} options={{ title: '내 프로필' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: '설정' }} />
        <Stack.Screen name="ReservationList" component={ReservationListScreen} options={{ title: '예약 내역' }} />
        <Stack.Screen name="DReservationList" component={DReservationListScreen} options={{ title: '예약 내역' }} />
        <Stack.Screen name="DesignerList" component={DesignerListScreen} />
        <Stack.Screen name="DesignerDetails" component={DesignerDetailsScreen} />
        <Stack.Screen name="Confirmed" component={ConfirmedScreen} options={{ title: '' }} />
        {/* <Stack.Screen name="MainTab" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="MyInfoTab" component={TabNavigator} options={{ headerShown: true }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
