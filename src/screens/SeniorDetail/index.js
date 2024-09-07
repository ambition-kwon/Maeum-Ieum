import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SeniorDetail = () => {
  const [selectedDay, setSelectedDay] = useState('수요일마다 받을래요');
  const [isEditing, setIsEditing] = useState(false);
  // 이것저것 테스트 해볼려고 추가한 임시 데이터라서 나중에 api 명세서 나오면 수정해야 함
  const [profileData, setProfileData] = useState({
    name: '권혁원',
    gender: '남',
    birthDate: '1997년 4월 26일',
    address: '제주시 제주대학로 113, 404호',
    organization: '큰 푸른 숲 요양원',
    contact: '010-6844-3536',
    specialNotes: '당뇨',
    emergencyContactName: '권순수',
    emergencyContactPhone: '010-9907-9969',
    emergencyContactRelation: '손녀',
    aiAssistantName: '권혁원 어르신 인공지능 어시스턴트',
  });

  const toggleEditing = () => {
    setIsEditing(!isEditing);
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

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>어르신 상세정보</Text>

        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profileImageButton}
            onPress={handleProfilePress}
            disabled={!isEditing} // 수정 모드가 아닐 때 비활성화
          >
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }} // 실제 이미지 URL로 교체
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>권혁원 어르신</Text>
          <Text style={styles.profileUID}>uid: user3324981</Text>
        </View>
      </View>

      <View style={styles.basicInfoSection}>
        <View style={styles.infoHeader}>
          <Text style={styles.sectionTitle}>기본정보</Text>
          <TouchableOpacity onPress={toggleEditing}>
            <Text style={styles.editButtonText}>{isEditing ? '저장하기' : '수정하기'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.name}
              onChangeText={(text) => handleChange('name', text)}
            />
          ) : (
            <Text style={styles.infoValue}>{profileData.name}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>성별</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.gender}
              onChangeText={(text) => handleChange('gender', text)}
            />
          ) : (
            <Text style={styles.infoValue}>{profileData.gender}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>생년월일</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.birthDate}
              onChangeText={(text) => handleChange('birthDate', text)}
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
              value={profileData.address}
              onChangeText={(text) => handleChange('address', text)}
            />
          ) : (
            <Text style={styles.infoValue}>{profileData.address}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>소속기관</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.organization}
              onChangeText={(text) => handleChange('organization', text)}
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
              onChangeText={(text) => handleChange('contact', text)}
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
              value={profileData.specialNotes}
              onChangeText={(text) => handleChange('specialNotes', text)}
            />
          ) : (
            <Text style={styles.infoValue}>{profileData.specialNotes}</Text>
          )}
        </View>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.sectionTitle}>주간 보고서</Text>
        <View style={styles.customPickerContainer}>
          <Picker
            selectedValue={selectedDay}
            style={styles.customPicker}
            onValueChange={(itemValue) => setSelectedDay(itemValue)}
            enabled={isEditing} // 수정 모드일 때만 선택 가능
          >
            <Picker.Item label="월요일마다 받을래요" value="월요일마다 받을래요" />
            <Picker.Item label="화요일마다 받을래요" value="화요일마다 받을래요" />
            <Picker.Item label="수요일마다 받을래요" value="수요일마다 받을래요" />
            <Picker.Item label="목요일마다 받을래요" value="목요일마다 받을래요" />
            <Picker.Item label="금요일마다 받을래요" value="금요일마다 받을래요" />
            <Picker.Item label="토요일마다 받을래요" value="토요일마다 받을래요" />
            <Picker.Item label="일요일마다 받을래요" value="일요일마다 받을래요" />
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
