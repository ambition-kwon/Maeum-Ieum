import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { caregiver } from '../../services/controller';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const EditInfo = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false); // 모달 상태 관리
  const [currentField, setCurrentField] = useState(''); // 수정 중인 필드
  const [newValue, setNewValue] = useState(''); // 입력된 값
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // 생년월일 선택창 상태
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 상태

  const handleLogout = async () => {
    Alert.alert('로그아웃', '정말 로그아웃하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('로그아웃 취소'),
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('token');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          } catch (error) {
            console.log(error.message);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    caregiver
      .mypage()
      .then((response) => {
        console.log(JSON.stringify(response.data.data, null, 2));
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const handleProfilePress = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 300,
      maxHeight: 300,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      }
      // 이미지 업로드 API 호출 코드 추가
    });
  };

  const handleEditField = (field) => {
    if (field === 'birthDate') {
      setDatePickerVisibility(true); // 생년월일 필드 수정 시 DatePicker 열기
    } else {
      setCurrentField(field); // 현재 필드 설정
      setNewValue(data[field]); // 기존 필드 값을 입력 필드에 설정
      setIsEditing(true); // 모달을 열어줌
    }
  };

  const handleDateConfirm = (date) => {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setData((prevData) => ({
      ...prevData,
      birthDate: formattedDate, // 생년월일 필드를 수정된 값으로 설정
    }));
    setDatePickerVisibility(false); // DatePicker 닫기
  };

  const saveNewValue = () => {
    setData((prevData) => ({
      ...prevData,
      [currentField]: newValue, // 수정된 값을 저장
    }));
    setIsEditing(false); // 모달 닫기
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 정보</Text>
      </View>

      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image source={{ uri: data.imgUrl }} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.profileName}>{data.name} 요양사</Text>
      </View>

      <View style={styles.basicInfoSection}>
        <Text style={styles.sectionTitle}>기본정보</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          <View style={styles.infoTextWithIcon}>
            <Text style={styles.infoValue}>{data.name}</Text>
            <TouchableOpacity onPress={() => handleEditField('name')}>
              <FontAwesome5Icon name="pen" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>성별</Text>
          <View style={styles.infoTextWithIcon}>
            <Text style={styles.infoValue}>
              {data.gender === 'MALE' ? '남' : '여'}
            </Text>
            <TouchableOpacity onPress={() => handleEditField('gender')}>
              <FontAwesome5Icon name="pen" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>생년월일</Text>
          <View style={styles.infoTextWithIcon}>
            <Text style={styles.infoValue}>{data.birthDate}</Text>
            <TouchableOpacity onPress={() => handleEditField('birthDate')}>
              <FontAwesome5Icon name="pen" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>소속기관</Text>
          <View style={styles.infoTextWithIcon}>
            <Text style={styles.infoValue}>{data.organization}</Text>
            <TouchableOpacity onPress={() => handleEditField('organization')}>
              <FontAwesome5Icon name="pen" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>연락처</Text>
          <View style={styles.infoTextWithIcon}>
            <Text style={styles.infoValue}>{data.contact}</Text>
            <TouchableOpacity onPress={() => handleEditField('contact')}>
              <FontAwesome5Icon name="pen" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>

      {/* 모달 창 */}
      <Modal visible={isEditing} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{`수정하기`}</Text>
            <TextInput
              style={styles.modalInput}
              value={newValue}
              onChangeText={setNewValue}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveNewValue}>
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 생년월일 선택 모달 */}
      <DatePicker
        modal
        open={isDatePickerVisible}
        date={selectedDate}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        minimumDate={new Date(1900, 0, 1)}
        maximumDate={new Date()}
        locale="ko"
        title="생년월일 선택"
        confirmText="확인"
        cancelText="취소"
      />
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  basicInfoSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  infoLabel: {
    width: 80,
    fontSize: 16,
    color: '#999',
  },
  infoTextWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 16,
    color: '#000',
    marginRight: 8,
  },
  logoutButton: {
    backgroundColor: '#FCCB00',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#FCCB00', // 노란색 저장 버튼
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#fff', // 흰색 취소 버튼
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditInfo;
