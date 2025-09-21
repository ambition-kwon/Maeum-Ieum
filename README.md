# 마음이음 (Maeum-Ieum)
> 독거노인과 요양사를 연결하는 AI 기반 감정 모니터링 플랫폼

## 프로젝트 요약
- **한 줄 소개**: OpenAI API 기반 AI 대화와 감정 분석을 통해 독거노인의 정서적 안정과 요양사의 효율적 업무를 지원하는 서비스
- **핵심 성과**: 
  - React Native 기반 IOS/Android 크로스플랫폼 개발
  - 모듈화된 서비스 아키텍처와 RESTful API 설계로 확장성 확보
  - 체계적인 감정 분석 리포트 시스템으로 요양사 업무 효율성 향상

![Landing Page](https://github.com/user-attachments/assets/e009f9fe-053a-4bc6-857b-0c008b9156b2)

## 프로젝트 개요

### 사회적 문제 인식
-  **고령화 사회의 심화된 고독사 문제**
    - 독거노인 증가와 정서적 고립 심화
    - 요양사의 업무 과부하와 효율적 모니터링 시스템 부재
    - 기존 복지 서비스의 일방적 접근 방식 한계

### 솔루션 접근
-  **기술적 접근을 통한 솔루션**
    - AI 기반 개인 맞춤형 감정 케어 서비스
    - 정량적 데이터를 통한 체계적 요양 관리
    - 실시간 긴급 상황 대응 시스템

### 개발 기간
- **개발 기간**: 2024.06 ~ 2024.10 (약 5개월)
- **팀 구성**: Frontend 3명(본인 : 서비스 로직 담당), Backend 1명

## 주요 기능

### 독거노인용 기능
- **AI 대화 시스템**: OpenAI API 기반 개인 맞춤형 AI와의 자연스러운 대화
- **음성 인식 채팅**: 텍스트 입력이 어려운 어르신을 위한 음성 기반 소통
- **긴급 호출 시스템**: 위급 상황 시 요양사에게 즉시 알림 전송
- **대화 기록 관리**: 과거 대화 내용 조회 및 연속성 있는 대화 지원

### 요양사용 기능
- **AI 맞춤 설정**: 담당 노인별 AI 성격 및 대화 스타일 커스터마이징
- **감정 분석 리포트**: 주간/월간 정량적·정성적 감정 상태 분석 보고서
- **실시간 모니터링**: 긴급 알림 수신 및 대화 패턴 이상 감지
- **업무 관리**: 담당 노인 정보 관리 및 케어 일정 설정

## 기술 스택

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![React Navigation](https://img.shields.io/badge/React_Navigation-6B73FF?style=for-the-badge&logo=react&logoColor=white) ![AsyncStorage](https://img.shields.io/badge/AsyncStorage-FF6B6B?style=for-the-badge&logo=react&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)


## 프로젝트 구조

```
Maeum-Ieum/
├── src/
│   ├── screens/                # 화면 컴포넌트
│   ├── services/               # ⭐서비스 레이어(담당 영역)
│   │   ├── axiosInstance.js    # HTTP 클라이언트 설정
│   │   ├── controller.js       # API 컨트롤러 통합
│   │   └── module/             # 도메인별 API 모듈
│   │       ├── caregiver.js    # 요양사 관련 API
│   │       └── elderly.js      # 독거노인 관련 API
│   ├── routers/                # 네비게이션 라우터
│   └── assets/                 # 정적 리소스
```

## 서비스 아키텍처 설계 및 구현

### 문제 상황
이전 프로젝트들과 달리 백엔드 개발 경험을 통해 **토큰 관리, 401 에러 핸들링, 멀티파트 데이터 처리**의 복잡성을 인지하고 있었습니다. 단순한 하드코딩 방식으로는 복잡한 사용자 플로우(요양사 ↔ AI ↔ 독거노인)와 다양한 데이터 타입(텍스트, 음성, 이미지, 리포트)을 효율적으로 관리할 수 없어, **백엔드 친화적이면서 확장 가능한 아키텍처 설계**가 필수적이었습니다.

### 설계 접근 방식

#### 1. 도메인 중심 설계 (DDD) 적용
기능별 분리가 아닌 **“누가 사용하는가?”** 중심으로 아키텍처를 설계했습니다.

```javascript
// 기능별 분리 (적용 전)
auth.js        // 로그인, 회원가입
chat.js        // 채팅 기능
report.js      // 리포트 기능

// 도메인별 분리 (적용 후)
caregiver.js   // 요양사가 수행하는 모든 기능
elderly.js     // 독거노인이 수행하는 모든 기능
```

**실제 구현 코드**

##### `src/services/module/caregiver.js` — 요양사 도메인
```javascript
const caregiver = {
  // 인증 관련
  checkUsername: (username) => axiosInstance.get(`/caregivers/check-username/${username}`),
  login: (username, password) => axiosInstance.post(`/caregivers/login`, { username, password }),

  // AI 관리 (요양사의 핵심 업무)
  createAI: (elderlyId, data) => axiosInstance.post(`/caregivers/elderlys/${elderlyId}/assistants`, data),
  editAI: (elderlyId, assistantId, data) =>
    axiosInstance.patch(`/caregivers/elderlys/${elderlyId}/assistants/${assistantId}`, data),

  // 리포트 관리 (요양사만 접근 가능)
  getWeeklyReportList: (elderlyId) =>
    axiosInstance.get(`/caregivers/elderlys/${elderlyId}/weekly-reports`, { params: { limit: 100 } }),
  editReportMemo: (elderlyId, reportId, content) =>
    axiosInstance.post(`/caregivers/elderlys/${elderlyId}/reports/${reportId}/memo`, { memo: content }),
};

export default caregiver;
```

##### `src/services/module/elderly.js` — 독거노인 도메인
```javascript
const elderly = {
  // 간단한 접근 코드 로그인 (독거노인 특화)
  signin: (accessCode) => axiosInstance.get(`/elderlys/access-code/${accessCode}`),

  // AI와의 대화 (독거노인의 핵심 기능)
  getNonStreamText: (elderlyId, data) => axiosInstance.post(`/elderlys/${elderlyId}/message`, data),
  getVoice: (elderlyId, data) => axiosInstance.post(`/elderlys/${elderlyId}/voice-message`, data),

  // 응급 호출 (독거노인만 사용)
  emergencyAlert: (elderlyId, caregiverId) =>
    axiosInstance.post(`/elderlys/${elderlyId}/caregivers/${caregiverId}/emergency-alerts`, {
      emergencyType: 'CAREGIVER_NOTIFY',
    }),
};

export default elderly;
```


#### 2. 중앙화된 HTTP 클라이언트 관리
Spring boot에서 경험한 Singleton 패턴에서 착안하여 **하나의 axios 인스턴스**로 모든 HTTP 통신을 통합 관리했습니다.

##### `src/services/axiosInstance.js` - Singleton Pattern
```javascript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: 'http://***.***.***.***:8081',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 자동 토큰 삽입 로직
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    console.log('interceptor 오류');
    if (error?.response?.data) {
      console.log(JSON.stringify(error.response.data, null, 2));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

**핵심 장점**
- 자동 토큰 관리: 모든 API 호출에 자동으로 인증 토큰 삽입  
- 중앙화된 설정: `baseURL`, `timeout` 등을 한 곳에서 관리  
- 일관된 에러 처리: 모든 HTTP 요청에 동일한 에러 핸들링 적용  


#### 3. Facade 디자인 패턴을 통한 단순화된 인터페이스
복잡한 내부 모듈 구조를 숨기고 **퍼사드 객체만을(caregiver, elderly)** 제공하도록 구현하였습니다.

##### `src/services/controller.js` — Facade Pattern
```javascript
import caregiver from './module/caregiver';
import elderly from './module/elderly';

export { caregiver, elderly };
```

**사용 예시 (화면 컴포넌트)**
```javascript
import { caregiver, elderly } from '../services/controller';

// 요양사 로그인
const handleCaregiverLogin = async () => {
  try {
    const response = await caregiver.login(username, password);
    // ...
  } catch (error) {
    // ...
  }
};

// 독거노인 AI 대화
const handleElderlyChat = async () => {
  try {
    const response = await elderly.getNonStreamText(elderlyId, messageData);
    // ...
  } catch (error) {
    // ...
  }
};
```


#### 최종 서비스 아키텍처 구조
```plaintext
src/services/
├── axiosInstance.js    # 중앙화된 HTTP 클라이언트
├── controller.js       # Facade 패턴 - 통합 진입점
└── module/
    ├── caregiver.js    # 요양사 도메인 (26개 API)
    └── elderly.js      # 독거노인 도메인 (13개 API)
```


### 구현 성과

#### 정량적 성과
- 39개 API 엔드포인트를 체계적으로 관리  
- 6개 주요 기능 도메인을 2개 모듈로 효율적 통합  
- 100% 자동화된 토큰 관리로 인증 관련 버그 **제로**

#### 정성적 성과
- 백엔드 팀과의 협업 효율성 향상: RESTful API 구조가 백엔드 API와 1:1 매칭  
- 유지보수성 확보: API 변경 시 **해당 도메인 모듈만** 수정하면 되는 구조  
- 확장성 보장: 새로운 사용자 타입(예: 관리자) 추가 시 **새 모듈**만 생성하면 되는 구조  


## 시연 영상

<div align="center">
  

https://github.com/user-attachments/assets/c3da786a-0e0d-4fed-8a92-7b4a148a0565


</div>

## 팀 구성 및 역할

|<img src="https://avatars.githubusercontent.com/u/5442985?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/101165185?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/103305387?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/44336444?v=4" width="150" height="150"/>|
|:-:|:-:|:-:|:-:|
|권혁원<br/>UX / FrontEnd|정진아<br/>PM / UI / FrontEnd|유예진<br/>FrontEnd|안예원<br/>BackEnd|

## 성과
- K-HACKATHON 예선, 본선, 결선(최종 15팀) 진출
- 2024 교내 컴퓨터공학전공x인공지능전공 작품전시회 **우수상**

---

## 개발 회고

  ### 백엔드 개발자가 바라본 프론트엔드: 경계를 허무는 아키텍처 설계

  이 프로젝트는 단순한 **화면 구현을 넘어 백엔드와의 효율적인 협업을 위한 서비스 아키텍처 설계**에 중점을 둔
  프로젝트였습니다.

  #### "백엔드로 진로를 정한 후 받은 마지막 프론트엔드 개발 제의"

  4학년 1학기, 백엔드 개발자로 진로를 확정한 상황에서 팀원으로부터 프로젝트 제의를 받았습니다. 고민 끝에
  "어차피 이왕 할 거라면 기존과는 완전히 다른 방식으로 접근해보자"는 결심을 했습니다.

  과거 프론트엔드 개발에 참여했던 다수의 프로젝트는 단순히 화면 구현에만 집중했다면, 이번에는 **퍼블리싱은 전혀 하지 않고 오직 서버 연동 
  로직과 비즈니스 아키텍처 설계만** 담당하기로 했습니다.

  #### "Spring Boot 경험을 JavaScript 환경에 그대로 적용하자"

  약 5개월간의 Spring Boot 백엔드 개발 경험에서 학습한 **DDD, Facade 패턴, 중앙화된 인스턴스 관리** 등의 설계
  원칙을 JavaScript 환경에 적용해보고 싶었습니다.

  ```javascript
  // 기존 방식: 화면별 분산된 API 호출
  ❌ SeniorDetailScreen에서 직접 axios 호출
  ❌ ReportScreen에서 또 다른 axios 호출

  // 개선된 방식: 도메인 중심 모듈화
  ✅ caregiver 모듈: 요양사 관련 모든 비즈니스 로직
  ✅ elderly 모듈: 독거노인 관련 모든 비즈니스 로직
  ✅ 중앙화된 axios 인스턴스로 공통 설정 관리
```

#### 도전과 성장: 복잡한 도메인 로직의 체계적 관리

  "39개 API 엔드포인트를 어떻게 관리할 것인가?"

  프로젝트 초기, 요양사와 독거노인이라는 두 개의 사용자 그룹과 AI, 리포트, 알림 등 다양한 기능 도메인이 얽힌
  복잡한 구조를 마주했습니다.

  당시 직면했던 기술적 과제들:
  - 사용자별 권한에 따른 API 접근 제어
  - 텍스트, 음성, 이미지가 혼합된 멀티미디어 데이터 처리
  - JWT 토큰 자동 관리 및 401 에러 핸들링

  #### 해결방법: "백엔드 사고방식으로 프론트엔드 아키텍처 재설계"


### 배운 점: 기술 스택을 초월한 설계 원칙의 가치

  이 경험을 통해 디자인 패턴과 설계 원칙은 프론트엔드/백엔드를 구분하지 않는다는 핵심적인 깨달음을 얻었습니다.
  DDD, Facade 패턴, 중앙화된 인스턴스 관리 등은 단순히 Java나 Spring에만 국한된 것이 아니라, 기술 스택을 초월한
   소프트웨어 설계의 본질이었습니다.

  본 아키텍처 설계 경험은 과거와 달리 단순한 화면 구현을 넘어 시스템 전반을 바라보며 설계 역량을 키울 수 있었던
   소중한 경험이었습니다. 현재는 백엔드 개발자로 성장하고 있지만, 이 과정에서 적용했던 설계 원칙들은 기술의 
  영역은 나뉘어 보이더라도, 서로 연결되고 배울 점이 있다는 사실을 직접 체감하게 해주었습니다.

  이 프로젝트는 기존 프론트엔드 개발에서 보여지는 결과만 집중했던 과거의 프로젝트와는 달리, 단순한 구현을 넘어 
  WHY·HOW를 생각하며 '시스템을 설계하는 개발자'로 성장할 수 있는 전환점이 된 경험이었습니다.
