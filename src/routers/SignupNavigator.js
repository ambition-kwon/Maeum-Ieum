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
import RegisterENum from '../screens/Register/RegisterENum';
import RegisterName from '../screens/Register/RegisterName';
import RegisterGender from '../screens/Register/RegisterGender';
import RegisterDate from '../screens/Register/RegisterDate';
import RegisterHome from '../screens/Register/RegisterHome';
import RegisterImg from '../screens/Register/RegisterImg';
import RegisterNum from '../screens/Register/RegisterNum';
import RegisterNote from '../screens/Register/RegisterNote';
import RegisterComplete from '../screens/Register/RegisterComplete';
import CreateAIScreen from '../screens/CreateAIScreen';
import EditInfo from '../screens/EditInfo';
import EditAIScreen from '../screens/EditAIScreen';
import SeniorDetail from '../screens/SeniorDetail';

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
        <Stack.Screen
          name="SignupNameElder"
          component={RegisterName}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupGenderElder"
          component={RegisterGender}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupDateElder"
          component={RegisterDate}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupAddressElder"
          component={RegisterHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupNumElder"
          component={RegisterENum}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupImgElder"
          component={RegisterImg}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupContactElder"
          component={RegisterNum}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupNoteElder"
          component={RegisterNote}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupCompleteElder"
          component={RegisterComplete}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateAIScreen"
          component={CreateAIScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditAIScreen"
          component={EditAIScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyPageScreen"
          component={EditInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SeniorDetailScreen"
          component={SeniorDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
