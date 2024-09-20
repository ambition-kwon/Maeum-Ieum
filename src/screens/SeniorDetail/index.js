import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {caregiver} from '../../services/controller';
import {useNavigation, useRoute} from '@react-navigation/native';

const SeniorDetail = () => {
  const [selectedDay, setSelectedDay] = useState('수요일마다 받을래요');
  const [isEditing, setIsEditing] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await caregiver.infoElderly(elderlyId);
        setProfileData({
          imgUrl:
            response.data.data.imgUrl || 'https://via.placeholder.com/150',
          uid: response.data.data.accessCode || '',
          name: response.data.data.name || '',
          gender: response.data.data.gender || '',
          birthDate: response.data.data.birthDate || '',
          homeAddress: response.data.data.homeAddress || '',
          organization: response.data.data.organization || '',
          contact: response.data.data.contact || '',
          healthInfo: response.data.data.healthInfo || '',
          emergencyName: response.data.data.emergencyName || '',
          emergencyContact: response.data.data.emergencyContact || '',
          emergencyRelationship: response.data.data.relationship || '',
          aiAssistantName: response.data.data.assistantName || '',
          aiAssistantId: response.data.data.assistantId || 0,
          reportDay: response.data.data.reportDay || '',
        });
        console.log(JSON.stringify(response.data, null, 2));
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  const toggleEditing = async () => {
    // 수정 전용 화면일 경우
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
      } catch (error) {
        Alert.alert('오류', JSON.stringify(error.response.data.data, null, 2));
        console.log(error.response.data);
      } finally {
        setIsEditing(prev => !prev);
      }
    }
    // 보기 전용 화면일 경우
    else {
      setIsEditing(prev => !prev);
    }
  };

  const handleChange = (key, value) => {
    setProfileData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleProfilePress = () => {
    if (isEditing) {
      console.log('프로필 이미지 클릭됨');
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDateChange = text => {
    const formattedDate = text.replace(/[^0-9-]/g, '');
    const maxLength = 10;

    if (formattedDate.length <= maxLength) {
      setProfileData(prevState => ({
        ...prevState,
        birthDate: formattedDate,
      }));
    }
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
            disabled={!isEditing} // 수정 모드가 아닐 때 비활성화
          >
            <Image
              source={{uri: profileData.imgUrl}}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>{profileData.name} 어르신</Text>
          <Text style={styles.profileUID}>uid: {profileData.uid}</Text>
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
                value={`${profileData.gender}`}
              />
              <Picker.Item label="남자" value="MALE" />
              <Picker.Item label="여자" value="FEMALE" />
            </Picker>
          ) : (
            <Text style={styles.infoValue}>{profileData.gender}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>생년월일</Text>
          {isEditing ? (
            // <TextInput
            //   style={styles.input}
            //   value={profileData.birthDate}
            //   onChangeText={text => handleChange('birthDate', text)}
            // />
            //수정 중 입니다. 추후 변동 가능성 높습니다.
            <TextInput
              style={styles.input}
              value={profileData.birthDate}
              placeholder="YYYY-MM-DD"
              onChangeText={handleDateChange}
              keyboardType="numeric"
              maxLength={10}
            />
          ) : (
            <Text style={styles.infoValue}>{profileData.birthDate}</Text>
          )}
        </View>
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

      <View style={styles.reportSection}>
        <Text style={styles.sectionTitle}>주간 보고서</Text>
        <View style={styles.customPickerContainer}>
          <Picker
            selectedValue={selectedDay}
            style={styles.customPicker}
            onValueChange={itemValue => setSelectedDay(itemValue)}
            enabled={isEditing} // 수정 모드일 때만 선택 가능
          >
            <Picker.Item
              label="월요일마다 받을래요"
              value="월요일마다 받을래요"
            />
            <Picker.Item
              label="화요일마다 받을래요"
              value="화요일마다 받을래요"
            />
            <Picker.Item
              label="수요일마다 받을래요"
              value="수요일마다 받을래요"
            />
            <Picker.Item
              label="목요일마다 받을래요"
              value="목요일마다 받을래요"
            />
            <Picker.Item
              label="금요일마다 받을래요"
              value="금요일마다 받을래요"
            />
            <Picker.Item
              label="토요일마다 받을래요"
              value="토요일마다 받을래요"
            />
            <Picker.Item
              label="일요일마다 받을래요"
              value="일요일마다 받을래요"
            />
          </Picker>
        </View>
        <TouchableOpacity style={styles.customButton}>
          <Text style={styles.customButtonText}>주간 보고서 확인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.sectionTitle}>월간 보고서</Text>
        <TouchableOpacity style={styles.customButton}>
          <Text style={styles.customButtonText}>월간 보고서 확인</Text>
        </TouchableOpacity>
      </View>
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
  profileUID: {
    fontSize: 14,
    color: '#666',
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
});

export default SeniorDetail;
