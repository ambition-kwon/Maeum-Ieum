import axiosInstance from '../axiosInstance';

const elderly = {
  signup: data => {
    return axiosInstance.post(`/caregivers/elderlys`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default elderly;
