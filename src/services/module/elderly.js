import axiosInstance from '../axiosInstance';

const elderly = {
  signup: data => {
    return axiosInstance.post(`/caregivers/elderlys`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  signin: accessCode => {
    return axiosInstance.get(`elderlys/access-code/${accessCode}`);
  },
  getVoice: (elderlyId, data) => {
    return axiosInstance.post(`/elderlys/${elderlyId}/voice-message`, data);
  },
  getStreamText: (elderlyId, data) => {
    return axiosInstance.post(`/elderlys/${elderlyId}/stream-message`, data);
  },
  emergencyAlert: (elderlyId, caregiverId) => {
    return axiosInstance.post(
      `/elderlys/${elderlyId}/caregivers/${caregiverId}/emergency-alerts`,
      {
        emergencyType: 'CAREGIVER_NOTIFY',
      },
    );
  },
  getBeforeChat: (elderlyId, page, size) => {
    return axiosInstance.get(`/elderlys/${elderlyId}/chats`, {
      params: {
        page: page,
        size: size,
      },
    });
  },
  mainInfo: (elderlyId, assistantId) => {
    return axiosInstance.get(
      `/elderlys/${elderlyId}/assistants/${assistantId}`,
    );
  },
  accessChat: (elderlyId, assistantId) => {
    return axiosInstance.get(
      `elderlys/${elderlyId}/assistants/${assistantId}/status`,
    );
  },
};

export default elderly;
