import axiosInstance from '../axiosInstance';

const elderly = {
  signup: data => {
    return axiosInstance.post(`/caregivers/elderlys`, data);
  },
};

export default elderly;
