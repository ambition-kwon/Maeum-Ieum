import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const EditInfo = () => {
  const handleProfilePress = () => {
    // 프로필 이미지 클릭 시 동작(이미지 업로드 기능 추후 추가)
    console.log('프로필 이미지 클릭됨');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 정보</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }} // 실제 이미지 URL로 변경
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>정진아 요양사</Text>
      </View>

      {/* Basic Information Section */}
      <View style={styles.basicInfoSection}>
        <Text style={styles.sectionTitle}>기본정보</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          <Text style={styles.infoValue}>정진아</Text>
          <TouchableOpacity>
            <Image source={require('../../assets/icons/edit.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>성별</Text>
          <Text style={styles.infoValue}>여</Text>
          <TouchableOpacity>
            <Image source={require('../../assets/icons/edit.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>생년월일</Text>
          <Text style={styles.infoValue}>1997년 4월 26일</Text>
          <TouchableOpacity>
            <Image source={require('../../assets/icons/edit.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>주거지</Text>
          <Text style={styles.infoValue}>제주시 제주대학로 113, 404호</Text>
          <TouchableOpacity>
            <Image source={require('../../assets/icons/edit.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>소속기관</Text>
          <Text style={styles.infoValue}>큰 푸른 숲 요양원</Text>
          <TouchableOpacity>
            <Image source={require('../../assets/icons/edit.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>연락처</Text>
          <Text style={styles.infoValue}>010-6844-3536</Text>
          <TouchableOpacity>
            <Image source={require('../../assets/icons/edit.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
  infoValue: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  editIcon: {
    width: 16,
    height: 16,
  },
});

export default EditInfo;
