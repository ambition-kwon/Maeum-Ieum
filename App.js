import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/Splash/SplashScreen.js';
import Login from './src/screens/Login/Login.js';
import CodeLogin from './src/screens/Login/CodeLogin.js';
import Signup from './src/screens/Signup/Signup.js';
import SignupName from './src/screens/Signup/SignupName.js';
import SignupGender from './src/screens/Signup/SignupGender.js';
import SignupDate from './src/screens/Signup/SignupDate.js';
import SignupOrg from './src/screens/Signup/SignupOrg.js';
import SignupImg from './src/screens/Signup/SignupImg.js';
import SignupNum from './src/screens/Signup/SignupNum.js';
import AdminApprove from './src/screens/Signup/AdminApprove.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="CodeLogin" component={CodeLogin} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="SignupName" component={SignupName} options={{ headerShown: false }} />
        <Stack.Screen name="SignupGender" component={SignupGender} options={{ headerShown: false }} />
        <Stack.Screen name="SignupDate" component={SignupDate} options={{ headerShown: false }} />
        <Stack.Screen name="SignupOrg" component={SignupOrg} options={{ headerShown: false }} />
        <Stack.Screen name="SignupImg" component={SignupImg} options={{ headerShown: false }} />
        <Stack.Screen name="SignupNum" component={SignupNum} options={{ headerShown: false }} />
        <Stack.Screen name="AdminApprove" component={AdminApprove} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
