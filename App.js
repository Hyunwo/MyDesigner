import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './screens/MainScreen'; // MainScreen 컴포넌트를 별도의 파일로 분리해야 함
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen'; // HomeScreen 컴포넌트를 별도의 파일로 분리해야 함
import SearchScreen from './screens/SearchScreen';

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
        <Stack.Screen name="MyDesisgner" component={MainScreen} />
        <Stack.Screen name="MyDesisgner" component={LoginScreen} />
        <Stack.Screen name="회원가입" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MainTab" component={MainTabScreen} options={{ headerShown: false }} />
        <Stack.Screen name="디자이너 및 샵 검색" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
