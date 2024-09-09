import axiosInstance from '../axiosInstance';

const caregiver = {
  checkUsername: username => {
    return axiosInstance.get(`/caregivers/check-username/${username}`);
  },
  signup: data => {
    return axiosInstance.post('/caregivers', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
  },
  login: (username, password) => {
    return axiosInstance.post(`/caregivers/login`, {
      username: username,
      password: password,
    });
  },
  info: () => {
    return axiosInstance.get('/caregivers', {
      params: {
        cursor: '',
        limit: 30,
      },
    });
  },
};

export default caregiver;
