import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {elderly} from '../../services/controller';

export default function RegisterNote() {
  const [healthInfo, setHealthInfo] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const {
    name,
    gender,
    birthDate,
    homeAddress,
    emergencyName,
    emergencyContact,
    relationship,
    imgFile,
    contact,
  } = route.params;
  const handleNextPress = async () => {
    if (healthInfo !== '' && healthInfo.length > 0) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('gender', gender);
      formData.append('birthDate', birthDate);
      formData.append('homeAddress', homeAddress);
      formData.append('emergencyName', emergencyName);
      formData.append('emergencyContact', emergencyContact);
      formData.append('relationship', relationship);
      formData.append('contact', contact);
      formData.append('img', imgFile);
      formData.append('healthInfo', healthInfo);
      try {
        await elderly.signup(formData);
        navigation.navigate('SignupCompleteElder');
      } catch (error) {
        Alert.alert(
          '오류',
          '서버 오류로 인해 어르신 추가가 이루어지지 않았습니다.',
        );
        console.log(JSON.stringify(error.response.data, null, 2));
      }
    } else {
      Alert.alert(
        '오류',
        '어르신에 대한 특이사항이 입력되지 않았습니다.\n다시 한 번 확인해 주세요.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>등록하실 어르신의</Text>
        <Text style={styles.welcomeText}>특이사항을 입력해주세요</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="질병 또는 기타 메모 사항을 입력해주세요"
            placeholderTextColor="#B0B0B0"
            value={healthInfo}
            onChangeText={setHealthInfo}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.nextIconContainer}
        onPress={handleNextPress}
        activeOpacity={0.7}>
        <IoniconsIcons name="arrow-forward-circle" size={50} color="#FCCB02" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 10,
    left: 5,
    right: 5,
  },
  progress: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#E8E8E8',
  },
  complete: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#FCCB02',
  },
  titleContainer: {
    marginBottom: 60,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 5,
    textAlign: 'left',
    color: '#000',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 18,
  },
  nextIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
