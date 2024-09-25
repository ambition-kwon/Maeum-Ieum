import React from 'react';
import SignupNavigator from './src/routers/SignupNavigator.js';
import {LogBox} from 'react-native';

export default function App() {
  LogBox.ignoreAllLogs(true);
  return <SignupNavigator />;
}
