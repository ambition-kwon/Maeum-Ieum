import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SeniorDetail = () => {
  const [selectedDay, setSelectedDay] = useState('수요일마다 받을래요');

  const handleProfilePress = () => {
    console.log('프로필 이미지 클릭됨');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>어르신 상세정보</Text>

        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.profileImageButton} onPress={handleProfilePress}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }} // Replace with the actual image URL
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
          <TouchableOpacity>
            <Text style={styles.saveButtonText}>저장하기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          <Text style={styles.infoValue}>권혁원</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>성별</Text>
          <Text style={styles.infoValue}>남</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>생년월일</Text>
          <Text style={styles.infoValue}>1997년 4월 26일</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>주거지</Text>
          <Text style={styles.infoValue}>제주시 제주대학로 113, 404호</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>소속기관</Text>
          <Text style={styles.infoValue}>큰 푸른 숲 요양원</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>연락처</Text>
          <Text style={styles.infoValue}>010-6844-3536</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>특이사항</Text>
          <Text style={styles.infoValue}>당뇨</Text>
        </View>
      </View>

      <View style={styles.emergencyContactSection}>
        <Text style={styles.sectionTitle}>긴급연락처</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          <Text style={styles.infoValue}>권순수</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>연락처</Text>
          <Text style={styles.infoValue}>010-9907-9969</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>관계</Text>
          <Text style={styles.infoValue}>손녀</Text>
        </View>
      </View>

      <View style={styles.aiAssistantSection}>
        <Text style={styles.sectionTitle}>AI Assistant</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          <Text style={styles.infoValue}>권혁원 어르신 인공지능 어시스턴트</Text>
        </View>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.sectionTitle}>주간 보고서</Text>
        <View style={styles.customPickerContainer}>
          <Picker
            selectedValue={selectedDay}
            style={styles.customPicker}
            onValueChange={(itemValue) => setSelectedDay(itemValue)}
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
        <View style={styles.customInputContainer}>
          <Text style={styles.customInput}>2024.07.07(수)</Text>
        </View>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.sectionTitle}>월간 보고서</Text>
        <View style={styles.customInputContainer}>
          <Text style={styles.customInput}>2024.06</Text>
        </View>
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
  saveButtonText: {
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
  emergencyContactSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  aiAssistantSection: {
    marginTop: 20,
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
  customInputContainer: {
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
  },
  customInput: {
    color: '#000',
    fontSize: 16,
  },
});

export default SeniorDetail;
