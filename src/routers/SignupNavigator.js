import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/Splash/SplashScreen.js';
import Login from '../screens/Login/Login.js';
import CodeLogin from '../screens/Login/CodeLogin.js';
import Signup from '../screens/Signup/Signup.js';
import SignupName from '../screens/Signup/SignupName.js';
import SignupGender from '../screens/Signup/SignupGender.js';
import SignupDate from '../screens/Signup/SignupDate.js';
import SignupOrg from '../screens/Signup/SignupOrg.js';
import SignupImg from '../screens/Signup/SignupImg.js';
import SignupNum from '../screens/Signup/SignupNum.js';
import AdminApprove from '../screens/Signup/AdminApprove.js';
import ExpertMainScreen from '../screens/ExpertMainScreen';

const Stack = createStackNavigator();

export default function SignupNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CodeLogin"
          component={CodeLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupName"
          component={SignupName}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupGender"
          component={SignupGender}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupDate"
          component={SignupDate}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupOrg"
          component={SignupOrg}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupImg"
          component={SignupImg}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupNum"
          component={SignupNum}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminApprove"
          component={AdminApprove}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ExpertMainScreen"
          component={ExpertMainScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
