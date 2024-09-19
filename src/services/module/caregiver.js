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
    return axiosInstance.get(`/caregivers`);
  },
  ruleGenerate: (elderlyId, content) => {
    return axiosInstance.post(
      `/caregivers/elderlys/${elderlyId}/assistants/rules/autocomplete`,
      {content: content},
    );
  },
  mypage: () => {
    return axiosInstance.get(`/caregivers/mypage`);
  },
  createAI: (elderlyId, data) => {
    return axiosInstance.post(
      `/caregivers/elderlys/${elderlyId}/assistants`,
      data,
    );
  },
  infoAI: (elderlyId, assistantId) => {
    return axiosInstance.get(
      `/caregivers/elderlys/${elderlyId}/assistants/${assistantId}`,
    );
  },
  deleteAI: (elderlyId, assistantId) => {
    return axiosInstance.delete(
      `/caregivers/elderlys/${elderlyId}/assistants/${assistantId}`,
    );
  },
  editAI: (elderlyId, assistantId, data) => {
    return axiosInstance.patch(
      `/caregivers/elderlys/${elderlyId}/assistants/${assistantId}`,
      data,
    );
  },
};

export default caregiver;
