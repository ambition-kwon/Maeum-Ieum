# 마음이음 (Maeum-Ieum)
> 독거노인과 요양사를 연결하는 AI 기반 감정 모니터링 플랫폼

## 🎯 요약
- **한 줄 소개**: ChatGPT API 기반 AI 대화와 감정 분석을 통해 독거노인의 정서적 안정과 요양사의 효율적 업무를 지원하는 서비스
- **핵심 성과**: 
  - React Native 기반 iOS/Android 크로스플랫폼 개발
  - 모듈화된 서비스 아키텍처와 RESTful API 설계로 확장성 확보
  - 체계적인 감정 분석 리포트 시스템으로 요양사 업무 효율성 향상

![Landing Page](https://github.com/user-attachments/assets/e009f9fe-053a-4bc6-857b-0c008b9156b2)

## 📌 프로젝트 개요

### 사회적 문제 인식
1. **고령화 사회의 심화된 고독사 문제**
    - 독거노인 증가와 정서적 고립 심화
    - 요양사의 업무 과부하와 효율적 모니터링 시스템 부재
    - 기존 복지 서비스의 일방적 접근 방식 한계

### 솔루션 접근
1. **기술적 접근을 통한 솔루션**
    - AI 기반 개인 맞춤형 감정 케어 서비스
    - 정량적 데이터를 통한 체계적 요양 관리
    - 실시간 긴급 상황 대응 시스템

### 📅 개발 기간
- **개발 기간**: 2024.06 ~ 2024.10 (약 5개월)
- **팀 구성**: Frontend 3명, Backend 1명

## ✨ 주요 기능

### 👵 독거노인용 기능
- **AI 대화 시스템**: ChatGPT API 기반 개인 맞춤형 AI와의 자연스러운 대화
- **음성 인식 채팅**: 텍스트 입력이 어려운 어르신을 위한 음성 기반 소통
- **긴급 호출 시스템**: 위급 상황 시 요양사에게 즉시 알림 전송
- **대화 기록 관리**: 과거 대화 내용 조회 및 연속성 있는 대화 지원

### 👩‍🏫 요양사용 기능
- **AI 맞춤 설정**: 담당 노인별 AI 성격 및 대화 스타일 커스터마이징
- **감정 분석 리포트**: 주간/월간 정량적·정성적 감정 상태 분석 보고서
- **실시간 모니터링**: 긴급 알림 수신 및 대화 패턴 이상 감지
- **업무 관리**: 담당 노인 정보 관리 및 케어 일정 설정

## 🏗 기술 아키텍처

### 📱 Frontend Stack
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![React Navigation](https://img.shields.io/badge/React_Navigation-6B73FF?style=for-the-badge&logo=react&logoColor=white) ![AsyncStorage](https://img.shields.io/badge/AsyncStorage-FF6B6B?style=for-the-badge&logo=react&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)


## 📁 프로젝트 구조

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

## 🚨 핵심 기술 구현 경험

### 🏛 서비스 아키텍처 설계 및 구현

#### 문제 상황
이전 프로젝트들과 달리 백엔드 개발 경험을 통해 **토큰 관리, 401 에러 핸들링, 멀티파트 데이터 처리**의 복잡성을 인지하고 있었습니다. 단순한 하드코딩 방식으로는 복잡한 사용자 플로우(요양사 ↔ AI ↔ 독거노인)와 다양한 데이터 타입(텍스트, 음성, 이미지, 리포트)을 효율적으로 관리할 수 없어, **백엔드 친화적이면서 확장 가능한 아키텍처 설계**가 필수적이었습니다.

#### 해결 접근

1. **백엔드 경험을 활용한 서비스 레이어 설계**
  - 도메인 별 API 모듈 분리 (caregiver, elderly) - **DDD(Domain Driven Design)**, **단일 책임 원칙** 적용
  - **Singleton 패턴**에서 착안한 axios 인스턴스 전역 관리
  - **의존성 주입(DI)** 개념을 활용한 모듈 간 느슨한 결합
   
2. **Axios 인터셉터 패턴 구현**
   ```javascript
   axiosInstance.interceptors.request.use(async config => {
     const token = await AsyncStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `${token}`;
     }
     return config;
   });
   ```

#### 성과
- **30개의 API 엔드포인트**를 체계적으로 관리
- **JWT 토큰 자동 갱신**기능을 구현하여 401 에러 시 자동으로 refresh token으로 재인증 후 재요청 수행
- **클래스 상속 구조**를 활용해 모든 API 모듈이 Base HTTP Client를 상속받아 중앙화된 인터셉터 적용


## 🎥 시연 영상

<div align="center">
  

https://github.com/user-attachments/assets/c3da786a-0e0d-4fed-8a92-7b4a148a0565


</div>

## 👥 팀 구성 및 역할

|<img src="https://avatars.githubusercontent.com/u/5442985?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/101165185?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/103305387?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/44336444?v=4" width="150" height="150"/>|
|:-:|:-:|:-:|:-:|
|권혁원<br/>UX / FrontEnd|정진아<br/>PM / UI / FrontEnd|유예진<br/>FrontEnd|안예원<br/>BackEnd|

## 🏆 성과
- K-HACKATHON 예선, 본선, 결선(최종 15팀) 진출
- 2024 교내 컴퓨터공학전공x인공지능전공 작품전시회 **우수상**

---

## 💭 개발 회고

### 백엔드 개발자가 바라본 프론트엔드: 경계를 허무는 아키텍처 설계

이 프로젝트는 단순한 **화면 구현을 넘어 백엔드와의 효율적인 협업을 위한 서비스 아키텍처 설계**에 중점을 둔 프로젝트였습니다.

#### "4개월간의 Spring Boot 경험이 프론트엔드에서 빛을 발하다"

**퍼블리싱은 전혀 하지 않고 오직 서버 연동 로직만 담당**하면서, 기존 Spring Boot 백엔드 개발에서 학습한 **디자인 패턴과 설계 원칙**을 JavaScript 환경에 그대로 적용할 수 있었습니다.

이 경험을 통해 **디자인 패턴과 설계 원칙은 프론트엔드/백엔드를 구분하지 않는다**는 핵심적인 깨달음을 얻었습니다. DDD, DI, SRP 등은 단순히 Java나 Spring에만 국한된 것이 아니라, **기술 스택을 초월한 소프트웨어 설계의 본질**이었습니다.

### 도전과 성장: 복잡한 도메인 로직의 체계적 관리

#### "33개 화면, 30개의 API 엔드포인트를 어떻게 관리할 것인가?"

프로젝트 초기, 요양사와 독거노인이라는 **두 개의 사용자**와 **AI, 리포트, 알림 등 다양한 기능 도메인**이 얽힌 복잡한 구조를 마주했습니다.

**당시 직면했던 기술적 과제들:**
- 사용자별 권한에 따른 API 접근 제어
- 텍스트, 음성, 이미지가 혼합된 멀티미디어 데이터 처리

#### "백엔드 경험을 살린 체계적 접근"

단순히 **화면에 맞춰 API를 호출하는 방식**에서 벗어나, **도메인 중심의 서비스 레이어 아키텍처**를 설계했습니다:

```javascript
// 기존 방식: 화면별 분산된 API 호출
❌ SeniorDetailScreen에서 직접 axios 호출
❌ ReportScreen에서 또 다른 axios 호출

// 개선된 방식: 도메인 중심 모듈화
✅ caregiver 모듈: 요양사 관련 모든 비즈니스 로직
✅ elderly 모듈: 독거노인 관련 모든 비즈니스 로직
✅ 중앙화된 axios 인스턴스로 공통 설정 관리
```

### 현재에 미친 영향: 협업 중심의 개발자로 성장

#### "백엔드 개발자와의 원활한 소통"

체계적인 API 구조 설계 경험을 통해 **백엔드 개발자의 관점을 이해**하게 되었고, 이는 현재 백엔드 개발자로서 큰 자산이 되었습니다:

- **RESTful 설계 원칙**에 대한 실무적 이해
- **프론트엔드 제약사항**을 고려한 API 응답 구조 설계
- **개발팀 전체의 생산성**을 고려한 인터페이스 정의

> **이 프로젝트는 기존 프론트엔드 개발에 있어 보여지는 결과만 집중했던 3개의 프로젝트와는 달리, 단순한 구현을 넘어 WHY?/HOW?를 생각하며 '시스템을 설계하는 개발자'로 성장할 수 있는 소중한 경험이었습니다.**
