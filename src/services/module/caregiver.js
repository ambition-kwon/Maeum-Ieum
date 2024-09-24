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
  editMypage: data => {
    return axiosInstance.patch(`/caregivers/mypage`, data);
  },
  editMypageImg: data => {
    return axiosInstance.patch(`/caregivers/mypage/image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
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
  infoElderly: elderlyId => {
    return axiosInstance.get(`/caregivers/elderlys/${elderlyId}`);
  },
  editElderly: (elderlyId, data) => {
    return axiosInstance.patch(`/caregivers/elderlys/${elderlyId}`, data);
  },
  editElderlyImage: (elderlyId, data) => {
    return axiosInstance.patch(`caregivers/elderlys/${elderlyId}/image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteElderly: elderlyId => {
    return axiosInstance.delete(`/caregivers/elderlys/${elderlyId}`);
  },
  editReportDay: (elderlyId, reportDay) => {
    return axiosInstance.patch(`/caregivers/elderlys/${elderlyId}/report`, {
      reportDay: reportDay,
    });
  },
  infoEmergency: (page, size) => {
    return axiosInstance.get('/caregivers/emergency-alerts', {
      params: {
        page: page,
        size: size,
      },
    });
  },
  editReportMemo: (elderlyId, reportId, content) => {
    return axiosInstance.post(
      `caregivers/elderlys/${elderlyId}/reports/${reportId}/memo`,
      {memo: content},
    );
  },
};

export default caregiver;
