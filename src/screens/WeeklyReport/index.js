import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {caregiver} from '../../services/controller';
import {useNavigation, useRoute} from '@react-navigation/native';

const WeeklyReport = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {elderlyId, reportId} = route.params;
  const [selectedTab, setSelectedTab] = useState('quantitative'); // 기본적으로 '정량적 분석' 선택
  const [currentIndex, setCurrentIndex] = useState(0); // 슬라이드 인덱스 관리
  const [isMemoVisible, setIsMemoVisible] = useState(false); // 메모 입력 필드 표시 여부
  const [memoText, setMemoText] = useState(''); // 메모 입력 필드 내용
  const [savedMemo, setSavedMemo] = useState(''); // 저장된 메모
  const [data, setData] = useState({});
  const getIconByStatus = status => {
    switch (status) {
      case '아주 좋아요':
        return 'emoticon-excited-outline';
      case '좋아요':
        return 'emoticon-happy-outline';
      case '그냥 그래요':
        return 'emoticon-neutral-outline';
      case '별로예요':
        return 'emoticon-sad-outline';
      case '정말 별로예요':
        return 'emoticon-cry-outline';
      default:
        return 'emoticon-neutral-outline';
    }
  };

  const indicators = [
    {
      title: '건강 상태 지표',
      description: data?.quantitativeAnalysis?.healthStatusIndicator,
      icon: getIconByStatus(data?.healthStatus),
      status: data?.healthStatus,
    },
    {
      title: '사회적 연결성 지표',
      description: data?.quantitativeAnalysis?.socialConnectivityIndicator,
      icon: getIconByStatus(data?.socialConnectivity),
      status: data?.socialConnectivity,
    },
    {
      title: '심리적 안정 지표',
      description: data?.quantitativeAnalysis?.psychologicalStabilityIndicator,
      icon: getIconByStatus(data?.psychologicalStability),
      status: data?.psychologicalStability,
    },
    {
      title: '생활 만족도 지표',
      description: data?.quantitativeAnalysis?.lifeSatisfactionIndicator,
      icon: getIconByStatus(data?.lifeSatisfaction),
      status: data?.lifeSatisfaction,
    },
    {
      title: '인지 기능 지표',
      description: data?.quantitativeAnalysis?.cognitiveFunctionIndicator,
      icon: getIconByStatus(data?.cognitiveFunction),
      status: data?.cognitiveFunction,
    },
    {
      title: '활동 수준 지표',
      description: data?.quantitativeAnalysis?.activityLevelIndicator,
      icon: getIconByStatus(data?.activityLevel),
      status: data?.activityLevel,
    },
    {
      title: '필요 지원 지표',
      description: data?.quantitativeAnalysis?.supportNeedsIndicator,
      icon: getIconByStatus(data?.supportNeeds),
      status: data?.supportNeeds,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await caregiver.getWeeklyReportData(
          elderlyId,
          reportId,
        );
        setData(response.data.data);
        setMemoText(response.data.data.memo);
        console.log(JSON.stringify(response.data.data, null, 2));
      } catch (error) {
        console.log(JSON.stringify(error.response.data, null, 2));
      }
    };
    fetchData();
  }, []);

  const renderContent = () => {
    if (selectedTab === 'quantitative') {
      const {title, description, icon, status} = indicators[currentIndex];

      return (
        <View style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>분석 결과</Text>
          <View style={styles.resultContainer}>
            <TouchableOpacity
              onPress={handlePrevious}
              disabled={currentIndex === 0}
              style={styles.leftArrow}>
              <Text style={styles.navButtonText}>{'<'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              disabled={currentIndex === indicators.length - 1}
              style={styles.rightArrow}>
              <Text style={styles.navButtonText}>{'>'}</Text>
            </TouchableOpacity>
            <Text style={styles.resultTitle}>{title}</Text>
            <View style={styles.resultIconContainer}>
              <MaterialCommunityIcons name={icon} size={70} color="#000" />
            </View>
            <Text style={styles.resultStatus}>{status}</Text>
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
              {data.qualitativeAnalysis || '정량적 분석이 진행되지 않았습니다.'}
            </Text>
          </View>
        </View>
      );
    }
  };

  // 메모 저장 함수
  const handleSaveMemo = async () => {
    try {
      await caregiver.editReportMemo(elderlyId, reportId, memoText);
      setSavedMemo(memoText); // 입력된 메모 저장
      setIsMemoVisible(false); // 메모 입력 필드 숨김
      Alert.alert('알림', '메모 저장이 완료되었습니다.');
    } catch (error) {
      Alert.alert('오류', '서버 오류로 인해 메모가 저장되지 않았습니다.');
      console.log(JSON.stringify(error.response.data, null, 2));
      setIsMemoVisible(false); // 메모 입력 필드 숨김
    }
  };

  // 메모 수정 버튼을 누르면 입력 필드 표시
  const handleMemoEdit = () => {
    setMemoText(savedMemo); // 기존 메모를 입력 필드로 가져오기
    setIsMemoVisible(true); // 메모 입력 필드 다시 표시
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{data.elderlyName} 어르신</Text>
          <Text style={styles.headerSubtitle}>주간 보고서</Text>
          <Text style={styles.headerDate}>
            {data.startDate} ~ {data.endDate}
          </Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'quantitative' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('quantitative')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'quantitative' && styles.activeTabText,
            ]}>
            정량적 분석
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'qualitative' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('qualitative')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'qualitative' && styles.activeTabText,
            ]}>
            정성적 분석
          </Text>
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
              <TouchableOpacity
                style={styles.saveMemoButton}
                onPress={handleSaveMemo}>
                <Text style={styles.saveMemoButtonText}>메모 저장</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {savedMemo ? (
                <>
                  <Text style={styles.savedMemo}>{savedMemo}</Text>
                  <TouchableOpacity
                    style={styles.memoButton}
                    onPress={handleMemoEdit}>
                    <Text style={styles.memoButtonText}>메모 수정</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.memoButton}
                  onPress={() => setIsMemoVisible(true)}>
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

const {width} = Dimensions.get('window');

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
    transform: [{translateY: -12}],
  },
  rightArrow: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -12}],
  },
});

export default WeeklyReport;
