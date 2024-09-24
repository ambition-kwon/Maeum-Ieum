import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WeeklyReport = () => {
  const [selectedTab, setSelectedTab] = useState('quantitative'); // 기본적으로 '정량적 분석' 선택
  const [currentIndex, setCurrentIndex] = useState(0); // 슬라이드 인덱스 관리
  const [isMemoVisible, setIsMemoVisible] = useState(false); // 메모 입력 필드 표시 여부
  const [memoText, setMemoText] = useState(''); // 메모 입력 필드 내용
  const [savedMemo, setSavedMemo] = useState(''); // 저장된 메모

  // 나중에 여기 icon에 대한 것을 backend에서 받아와서 그에 맞는 아이콘으로 변경해야 함
  const indicators = [
    {
      title: '건강 상태 지표',
      description: '건강 상태 지표에 대한 2~3줄 정도의 간략한 요약이 담기면 좋겠네요. 이상입니다. 수고하셨어요',
      icon: 'emoticon-sad-outline',
    },
    {
      title: '사회적 연결성 지표',
      description: '사회적 연결성 지표에 대한 분석 결과가 여기에 표시됩니다.',
      icon: 'emoticon-neutral-outline',
    },
    {
      title: '심리적 안정 지표',
      description: '심리적 안정 지표에 대한 분석 결과가 여기에 표시됩니다.',
      icon: 'emoticon-happy-outline',
    },
    {
      title: '생활 만족도 지표',
      description: '생활 만족도 지표에 대한 분석 결과가 여기에 표시됩니다.',
      icon: 'emoticon-outline',
    },
    {
      title: '인지 기능 지표',
      description: '인지 기능 지표에 대한 분석 결과가 여기에 표시됩니다.',
      icon: 'emoticon-excited-outline',
    },
    {
      title: '활동 수준 지표',
      description: '활동 수준 지표에 대한 분석 결과가 여기에 표시됩니다.',
      icon: 'emoticon-neutral-outline',
    },
    {
      title: '필요 지원 지표',
      description: '필요 지원 지표에 대한 분석 결과가 여기에 표시됩니다.',
      icon: 'emoticon-excited-outline',
    },
  ];

  const handleNext = () => {
    if (currentIndex < indicators.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderContent = () => {
    if (selectedTab === 'quantitative') {
      const { title, description, icon } = indicators[currentIndex];

      return (
        <View style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>분석 결과</Text>
          <View style={styles.resultContainer}>
            <TouchableOpacity onPress={handlePrevious} disabled={currentIndex === 0} style={styles.leftArrow}>
              <Text style={styles.navButtonText}>{"<"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} disabled={currentIndex === indicators.length - 1} style={styles.rightArrow}>
              <Text style={styles.navButtonText}>{">"}</Text>
            </TouchableOpacity>
            <Text style={styles.resultTitle}>{title}</Text>
            <View style={styles.resultIconContainer}>
              <MaterialCommunityIcons name={icon} size={70} color="#000" />
            </View>
            <Text style={styles.resultStatus}>매우 나쁨</Text>
            <Text style={styles.resultDescription}>{description}</Text>
          </View>
        </View>
      );
    } else if (selectedTab === 'qualitative') {
      return (
        <View style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>정성적 분석 결과</Text>
          <View style={styles.resultContainer}>
            <Text style={styles.resultDescription}>
              본 어르신의 전반적인 상태를 분석한 결과, 심리적 지원이 필요함을 확인했습니다. 외로움과 불안을 줄이기 위해 정기적인 상담 및 심리 지원 프로그램을 제공하는 것이 중요합니다. 건강 관리 측면에서는 관절 통증과 같은 건강 문제에 대한 정기적인 검진과 치료 지원을 강화해야 합니다. 또한, 사회적 연결을 증진하기 위해 사회적 활동 참여 기회를 늘리고, 가족 및 친구와의 교류를 촉진하는 프로그램을 개발하는 것이 필요합니다. 생활 만족도를 향상시키기 위해서는 주거 환경을 개선하고, 일상 활동을 지원하는 것이 중요합니다. 마지막으로, 인지 기능 강화를 위해 인지 자극 활동을 제공하여 인지 기능을 유지하고 향상시킬 필요가 있습니다. 이러한 종합적인 지원을 통해 독거노인들의 삶의 질을 전반적으로 향상시킬 수 있을 것입니다.
            </Text>
          </View>
        </View>
      );
    }
  };

  // 메모 저장 함수
  const handleSaveMemo = () => {
    setSavedMemo(memoText); // 입력된 메모 저장
    setIsMemoVisible(false); // 메모 입력 필드 숨김
  };

  // 메모 수정 버튼을 누르면 입력 필드 표시
  const handleMemoEdit = () => {
    setMemoText(savedMemo); // 기존 메모를 입력 필드로 가져오기
    setIsMemoVisible(true); // 메모 입력 필드 다시 표시
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>권혁원 어르신</Text>
          <Text style={styles.headerSubtitle}>주간 보고서</Text>
          <Text style={styles.headerDate}>2024.07.07(일) ~ 2024.07.13(토)</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'quantitative' && styles.activeTab]}
          onPress={() => setSelectedTab('quantitative')}
        >
          <Text style={[styles.tabText, selectedTab === 'quantitative' && styles.activeTabText]}>정량적 분석</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'qualitative' && styles.activeTab]}
          onPress={() => setSelectedTab('qualitative')}
        >
          <Text style={[styles.tabText, selectedTab === 'qualitative' && styles.activeTabText]}>정성적 분석</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderContent()}

        <View style={styles.memoContainer}>
          <Text style={styles.memoLabel}>메모</Text>
          {isMemoVisible ? (
            <>
              <TextInput
                style={styles.memoInput}
                value={memoText}
                onChangeText={setMemoText}
                placeholder="내용을 입력해주세요"
                placeholderTextColor="#c4c4c4"
              />
              <TouchableOpacity style={styles.saveMemoButton} onPress={handleSaveMemo}>
                <Text style={styles.saveMemoButtonText}>메모 저장</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {savedMemo ? (
                <>
                  <Text style={styles.savedMemo}>{savedMemo}</Text>
                  <TouchableOpacity style={styles.memoButton} onPress={handleMemoEdit}>
                    <Text style={styles.memoButtonText}>메모 수정</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity style={styles.memoButton} onPress={() => setIsMemoVisible(true)}>
                  <Text style={styles.memoButtonText}>메모 작성</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  headerContainer: {
    backgroundColor: '#FCCB02',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 10,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  headerDate: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    paddingVertical: 10,
    width: '50%',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    color: '#666',
  },
  activeTab: {
    borderBottomWidth: 4,
    borderBottomColor: '#FCCB02',
  },
  activeTabText: {
    color: '#FCCB02',
    fontWeight: 'bold',
  },
  analysisContainer: {
    padding: 20,
  },
  analysisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  resultContainer: {
    backgroundColor: '#FFDDDD',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultIconContainer: {
    marginBottom: 10,
  },
  resultStatus: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  resultDescription: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
  qualitativeResultDescription: {
    fontSize: 16,
    color: '#000',
  },
  memoContainer: {
    padding: 20,

  },
  memoLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  memoInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  memoButton: {
    backgroundColor: '#FCCB02',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  memoButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  saveMemoButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveMemoButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  savedMemo: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  navButtonText: {
    fontSize: 24,
    color: '#000',
  },
  leftArrow: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  rightArrow: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
});

export default WeeklyReport;
