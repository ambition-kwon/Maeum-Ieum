import React, {useEffect, useState} from 'react';
import {
  Alert,
  Clipboard,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'; // DatePicker 추가
import {caregiver} from '../../services/controller';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

const SeniorDetail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showWeeklyReportsModal, setShowWeeklyReportsModal] = useState(false);
  const [showMonthlyReportsModal, setShowMonthlyReportsModal] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState([]);
  const [monthlyReports, setMonthlyReports] = useState([]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const navigation = useNavigation();
  const route = useRoute();
  const {elderlyId} = route.params;

  const [profileData, setProfileData] = useState({
    imgUrl: 'https://via.placeholder.com/150',
    uid: '',
    name: '',
    gender: '',
    birthDate: '',
    address: '',
    organization: '',
    contact: '',
    specialNotes: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    aiAssistantName: '',
    aiAssistantId: 0,
    reportDay: '',
  });

  const handleElderlyDelete = async () => {
    Alert.alert('경고', '정말 삭제하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('노인 삭제 취소'),
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: async () => {
          try {
            await caregiver.deleteElderly(elderlyId);
            navigation.reset({
              index: 0,
              routes: [{name: 'ExpertMainScreen'}],
            });
          } catch (error) {
            Alert.alert('오류', '서버 문제로 인해 삭제되지 않았습니다.');
            console.log(error.response.data);
          }
        },
      },
    ]);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await caregiver.infoElderly(elderlyId);
        console.log(JSON.stringify(response.data.data, null, 2));
        const formatBirthDate = dateString => {
          const regex = /(\d{4})년 (\d{2})월 (\d{2})일/;
          const match = dateString.match(regex);
          if (match) {
            const [_, year, month, day] = match;
            return `${year}-${month}-${day}`;
          }
          return dateString;
        };
        setProfileData({
          imgUrl:
            response.data.data.imgUrl || 'https://via.placeholder.com/150',
          uid: response.data.data.accessCode || '',
          name: response.data.data.name || '',
          gender: response.data.data.gender || '',
          birthDate: formatBirthDate(response.data.data.birthDate || ''), // 생년월일 변환
          homeAddress: response.data.data.homeAddress || '',
          organization: response.data.data.organization || '',
          contact: response.data.data.contact || '',
          healthInfo: response.data.data.healthInfo || '',
          emergencyContactName: response.data.data.emergencyName || '',
          emergencyContactPhone: response.data.data.emergencyContact || '',
          emergencyContactRelation: response.data.data.relationship || '',
          aiAssistantName: response.data.data.assistantName || '',
          aiAssistantId: response.data.data.assistantId || 0,
          reportDay: response.data.data.reportDay || '',
        });
        console.log(JSON.stringify(response.data, null, 2));
      } catch (error) {
        console.log(error.response.data);
      }
    };

    const fetchWeeklyReports = async () => {
      try {
        const response = await caregiver.getWeeklyReportList(elderlyId);
        setWeeklyReports(response.data.data.reportList);
      } catch (error) {
        Alert.alert(
          '오류',
          '서버 오류로 인해 보고서 정보를 불러올 수 없습니다.',
        );
        console.log(JSON.stringify(error.response.data, null, 2));
      }
    };

    const fetchMonthlyReports = async () => {
      try {
        const response = await caregiver.getMonthlyReportList(elderlyId);
        setMonthlyReports(response.data.data.reportList);
      } catch (error) {
        Alert.alert(
          '오류',
          '서버 오류로 인해 보고서 정보를 불러올 수 없습니다.',
        );
        console.log(JSON.stringify(error.response.data, null, 2));
      }
    };
    fetchData();
    fetchWeeklyReports();
    fetchMonthlyReports();
  }, []);

  const toggleEditing = async () => {
    if (isEditing) {
      try {
        const data = {
          name: profileData.name,
          gender: profileData.gender,
          birthDate: profileData.birthDate,
          homeAddress: profileData.homeAddress,
          contact: profileData.contact,
          healthInfo: profileData.healthInfo,
          emergencyName: profileData.emergencyContactName,
          emergencyContact: profileData.emergencyContactPhone,
          relationship: profileData.emergencyContactRelation,
          assistantName: profileData.assistantName,
        };
        await caregiver.editElderly(elderlyId, data);
        Alert.alert('알림', '수정된 정보가 성공적으로 반영되었습니다.');
      } catch (error) {
        Alert.alert('오류', '필수 입력 정보를 모두 채웠는지 확인해주세요.');
        console.log(error.response.data);
      } finally {
        setIsEditing(prev => !prev);
      }
    } else {
      setIsEditing(prev => !prev);
    }
  };

  const handleChange = (key, value) => {
    setProfileData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleReportDay = async date => {
    if (date !== '') {
      try {
        await caregiver.editReportDay(elderlyId, date);
        Alert.alert('알림', '보고서 발행 일자가 성공적으로 변경되었습니다.');
      } catch (error) {
        console.log(JSON.stringify(error.response.data, null, 2));
      }
    } else {
      Alert.alert('오류', '보고서 발행 일자를 지정해주세요');
    }
  };

  // 생년월일 수정 시 DatePicker를 표시하는 함수
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  // DatePicker에서 날짜 선택 시 실행되는 함수
  const handleDateConfirm = selectedDate => {
    setIsDatePickerVisible(false);
    setDate(selectedDate);
    const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD 포맷으로 변환
    handleChange('birthDate', formattedDate);
  };

  const handleCancel = () => {
    setIsDatePickerVisible(false);
  };

  const handlePatchImage = async updatedImage => {
    try {
      const formData = new FormData();
      formData.append('img', updatedImage);
      await caregiver.editElderlyImage(elderlyId, formData);
    } catch (error) {
      console.log(JSON.stringify(error.response.data, null, 2));
    }
  };

  const handleProfilePress = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 300,
      maxHeight: 300,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        try {
          setProfileData(prevData => ({
            ...prevData,
            imgUrl: response.assets[0].uri,
          }));
          // 서버 이미지 변경 API
          const image = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: `image_${Date.now()}`,
          };
          handlePatchImage(image)
            .then(() => {
              Alert.alert('알림', '이미지를 성공적으로 변경하였습니다.');
              navigation.reset({
                index: 0,
                routes: [{name: 'ExpertMainScreen'}],
              });
            })
            .catch(error => {
              Alert.alert('오류', '첨부하신 이미지를 다시 한번 확인해주세요.');
              console.log(JSON.stringify(error.response.data, null, 2));
            });
        } catch (error) {
          console.log(JSON.stringify(error.response.data, null, 2));
        }
      }
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const copyToClipboard = () => {
    Clipboard.setString(profileData.uid);
    Alert.alert('복사 완료', 'UID가 복사되었습니다.');
  };

  const handleWeeklyReportPress = () => {
    setShowWeeklyReportsModal(true);
  };

  const handleMonthlyReportPress = () => {
    setShowMonthlyReportsModal(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>어르신 상세정보</Text>

        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profileImageButton}
            onPress={handleProfilePress}
            disabled={!isEditing}>
            <Image
              source={{uri: profileData.imgUrl}}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>{profileData.name} 어르신</Text>
          <View style={styles.uidContainer}>
            <Text style={styles.profileUID}>uid: {profileData.uid}</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={copyToClipboard}>
              <FeatherIcon name="copy" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.basicInfoSection}>
        <View style={styles.infoHeader}>
          <Text style={styles.sectionTitle}>기본정보</Text>
          <TouchableOpacity onPress={toggleEditing}>
            <Text style={styles.editButtonText}>
              {isEditing ? '저장하기' : '수정하기'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.name}
              onChangeText={text => handleChange('name', text)}
            />
          ) : (
            <Text style={styles.infoValue}>{profileData.name}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>성별</Text>
          {isEditing ? (
            <Picker
              selectedValue={profileData.gender}
              style={styles.input}
              onValueChange={value => handleChange('gender', value)}>
              <Picker.Item
                label="성별을 선택해주세요"
                value={profileData.gender}
              />
              <Picker.Item label="남자" value="MALE" />
              <Picker.Item label="여자" value="FEMALE" />
            </Picker>
          ) : (
            <Text style={styles.infoValue}>{profileData.gender}</Text>
          )}
        </View>

        {/* 생년월일 필드 */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>생년월일</Text>
          {isEditing ? (
            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.datePickerButton}>
              <Text>{profileData.birthDate || 'YYYY-MM-DD'}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.infoValue}>{profileData.birthDate}</Text>
          )}
        </View>

        {/* DatePicker 모달 */}
        <DatePicker
          modal
          mode="date"
          open={isDatePickerVisible}
          date={date}
          onConfirm={handleDateConfirm}
          onCancel={handleCancel}
          minimumDate={new Date(1900, 0, 1)}
          maximumDate={new Date()}
          locale="ko"
          title="날짜 선택"
          confirmText="확인"
          cancelText="취소"
        />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>주거지</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.homeAddress}
              onChangeText={text => handleChange('homeAddress', text)}
            />
          ) : (
            <Text style={styles.infoValue}>{profileData.homeAddress}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>소속기관</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.organization}
              onChangeText={text => handleChange('organization', text)}
            />
          ) : (
            <Text style={styles.infoValue}>{profileData.organization}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>연락처</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.contact}
              onChangeText={text => handleChange('contact', text)}
            />
          ) : (
            <Text style={styles.infoValue}>{profileData.contact}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>특이사항</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.healthInfo}
              onChangeText={text => handleChange('healthInfo', text)}
            />
          ) : (
            <Text style={styles.infoValue}>{profileData.healthInfo}</Text>
          )}
        </View>
      </View>

      {/* 긴급연락처 추가 */}
      <View style={styles.emergencyContactSection}>
        <Text style={styles.sectionTitle}>긴급 연락처</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.emergencyContactName}
              onChangeText={text => handleChange('emergencyContactName', text)}
            />
          ) : (
            <Text style={styles.infoValue}>
              {profileData.emergencyContactName}
            </Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>연락처</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.emergencyContactPhone}
              onChangeText={text => handleChange('emergencyContactPhone', text)}
            />
          ) : (
            <Text style={styles.infoValue}>
              {profileData.emergencyContactPhone}
            </Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>관계</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.emergencyContactRelation}
              onChangeText={text =>
                handleChange('emergencyContactRelation', text)
              }
            />
          ) : (
            <Text style={styles.infoValue}>
              {profileData.emergencyContactRelation}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.sectionTitle}>주간 보고서</Text>
        <View style={styles.customPickerContainer}>
          <Picker
            selectedValue={profileData.reportDay}
            style={styles.customPicker}
            onValueChange={itemValue => {
              setProfileData(prevProfileData => ({
                ...prevProfileData,
                reportDay: itemValue,
              }));
              // 서버 API 전송
              handleReportDay(itemValue);
            }}
            enabled={isEditing}>
            <Picker.Item label="보고서 발행 일자를 선택해주세요" value="" />
            <Picker.Item label="월요일마다 받을래요" value="MONDAY" />
            <Picker.Item label="화요일마다 받을래요" value="TUESDAY" />
            <Picker.Item label="수요일마다 받을래요" value="WEDNESDAY" />
            <Picker.Item label="목요일마다 받을래요" value="THURSDAY" />
            <Picker.Item label="금요일마다 받을래요" value="FRIDAY" />
            <Picker.Item label="토요일마다 받을래요" value="SATURDAY" />
            <Picker.Item label="일요일마다 받을래요" value="SUNDAY" />
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.customButton}
          onPress={handleWeeklyReportPress}>
          <Text style={styles.customButtonText}>주간 보고서 확인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.sectionTitle}>월간 보고서</Text>
        <TouchableOpacity
          style={styles.customButton}
          onPress={handleMonthlyReportPress}>
          <Text style={styles.customButtonText}>월간 보고서 확인</Text>
        </TouchableOpacity>
      </View>

      {/* 삭제하기 버튼 */}
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleElderlyDelete}>
          <Text style={styles.deleteButtonText}>삭제하기</Text>
        </TouchableOpacity>
      </View>

      {/* 주간 보고서 모달 */}
      <Modal visible={showWeeklyReportsModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>주간 보고서</Text>
          {weeklyReports.map((report, index) => (
            <TouchableOpacity
              key={index}
              style={styles.reportButton}
              onPress={() => {
                setShowWeeklyReportsModal(false);
                navigation.navigate('WeeklyReportScreen', {
                  reportId: report.reportId,
                  elderlyId: elderlyId,
                });
              }}>
              <Text style={styles.modalItem}>{`주간 보고서(${report.startDate})`}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowWeeklyReportsModal(false)}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* 월간 보고서 모달 */}
      <Modal visible={showMonthlyReportsModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>월간 보고서</Text>
          {monthlyReports.map((report, index) => (
            <TouchableOpacity
              key={index}
              style={styles.reportButton}
              onPress={() => {
                setShowMonthlyReportsModal(false);
                navigation.navigate('MonthlyReportScreen', {
                  reportId: report.reportId,
                  elderlyId: elderlyId,
                });
              }}>
              <Text>{`월간 보고서(${report.startDate})`}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowMonthlyReportsModal(false)}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FCCB02',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 15,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  profileImageButton: {
    borderRadius: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  uidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileUID: {
    fontSize: 14,
    color: '#666',
  },
  copyButton: {
    marginLeft: 10,
  },
  basicInfoSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FCCB02',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoLabel: {
    width: 80,
    fontSize: 16,
    color: '#999',
  },
  infoValue: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  emergencyContactSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  reportSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  customPickerContainer: {
    borderWidth: 1,
    borderColor: '#FCCB02',
    borderRadius: 8,
    backgroundColor: '#FCCB02',
    marginVertical: 10,
  },
  customPicker: {
    color: '#000',
    fontWeight: 'bold',
  },
  customButton: {
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
  },
  customButtonText: {
    color: '#000',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  modalItem: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  reportButton: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FCCB02',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#FF5A5F',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SeniorDetail;
