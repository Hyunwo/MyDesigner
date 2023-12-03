import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './screens/MainScreen'; // MainScreen 컴포넌트를 별도의 파일로 분리해야 함
import WhoScreen from './screens/WhoScreen';
import LoginScreen from './screens/LoginScreen';
import DLoginScreen from './screens/DLoginScreen';
import SignupScreen from './screens/SignupScreen';
import DSignupScreen from './screens/DSignupScreen';
import HomeScreen from './screens/HomeScreen'; // HomeScreen 컴포넌트를 별도의 파일로 분리해야 함
import SearchScreen from './screens/SearchScreen';
import ReserveScreen from './screens/ReserveScreen';
import MapScreen from './screens/MapScreen';
import MyInfoScreen from './screens/MyInfoScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReservationListScreen from './screens/ReservationListScreen';
import DReservationListScreen from './screens/DReservationListScreen';

const Stack = createStackNavigator();
//const Tab = createBottomTabNavigator();

// function MainTabScreen() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'ios-home' : 'ios-home-outline';
//           } else if (route.name === 'Main') {
//             iconName = focused ? 'ios-list-box' : 'ios-list';
//           }
//           // 다른 탭에 대한 아이콘을 추가할 수 있습니다.

//           // 아이콘 리턴
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: 'tomato',
//         inactiveTintColor: 'gray',
//       }}
//     >
//       <Tab.Screen name="Main" component={MainScreen} />
//       <Tab.Screen name="Home" component={HomeScreen} />
//       {/* 추가하고 싶은 다른 탭을 여기에 넣을 수 있습니다. */}
//     </Tab.Navigator>
//   );
// }

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="MyDesisgner" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Who" component={WhoScreen} options={{ title: 'Designer or Customer' }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DLogin" component={DLoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} options={{ title: '회원가입' }} />
        <Stack.Screen name="DSignUp" component={DSignupScreen} options={{ title: '회원가입' }} />
        {/* <Stack.Screen name="MainTab" component={MainTabScreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Reserve" component={ReserveScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="MyInfo" component={MyInfoScreen} options={{ title: '내정보' }} />
        <Stack.Screen name="MyProfile" component={MyProfileScreen} options={{ title: '내정보' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="ReservationList" component={ReservationListScreen} />
        <Stack.Screen name="DReservationList" component={DReservationListScreen} />
        <Stack.Screen name="MainTab" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="MyInfoTab" component={TabNavigator} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
