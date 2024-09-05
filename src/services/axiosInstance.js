import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: 'https://port-0-maeum-ieum-test-m0nh6gqqc01cecdf.sel4.cloudtype.app',
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
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log('interceptor 오류');
    console.log(JSON.stringify(error.response.data, null, 2));
  },
);

export const checkUsername = async username => {
  try {
    const response = await axiosInstance.get(
      `/caregivers/check-username/${username}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async data => {
  try {
    const response = await axiosInstance.post('/caregivers', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log('응답 오류');
    console.log(JSON.stringify(error.response.data, null, 2));
  }
};
