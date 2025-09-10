import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  // baseURL: 'https://port-0-maeum-ieum-test-m0nh6gqqc01cecdf.sel4.cloudtype.app',
  baseURL: 'http://3.37.227.56:8081',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  error => {
    console.log('interceptor 오류');
    console.log(JSON.stringify(error.response.data, null, 2));
  },
);

export default axiosInstance;
