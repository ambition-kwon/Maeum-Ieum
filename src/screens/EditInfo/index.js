import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {caregiver} from '../../services/controller';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditInfo = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
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
              routes: [{name: 'Login'}],
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
      .then(response => {
        console.log(JSON.stringify(response.data.data, null, 2));
        setData(response.data.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }, []);
  const handleProfilePress = () => {
    // 프로필 이미지 클릭 시 동작(이미지 업로드 기능 추후 추가)
    console.log('프로필 이미지 클릭됨');
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

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image source={{uri: data.imgUrl}} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.profileName}>{data.name} 요양사</Text>
      </View>

      {/* Basic Information Section */}
      <View style={styles.basicInfoSection}>
        <Text style={styles.sectionTitle}>기본정보</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          <View style={styles.infoTextWithIcon}>
            <Text style={styles.infoValue}>{data.name}</Text>
            <TouchableOpacity>
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
            <TouchableOpacity>
              <FontAwesome5Icon name="pen" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>생년월일</Text>
          <View style={styles.infoTextWithIcon}>
            <Text style={styles.infoValue}>{data.birthDate}</Text>
            <TouchableOpacity>
              <FontAwesome5Icon name="pen" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>소속기관</Text>
          <View style={styles.infoTextWithIcon}>
            <Text style={styles.infoValue}>{data.organization}</Text>
            <TouchableOpacity>
              <FontAwesome5Icon name="pen" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>연락처</Text>
          <View style={styles.infoTextWithIcon}>
            <Text style={styles.infoValue}>{data.contact}</Text>
            <TouchableOpacity>
              <FontAwesome5Icon name="pen" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#FCCB00',
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 70,
          marginHorizontal: 30,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5,
        }}
        onPress={handleLogout}>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
          로그아웃
        </Text>
      </TouchableOpacity>
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
  editIcon: {
    width: 16,
    height: 16,
  },
});

export default EditInfo;
