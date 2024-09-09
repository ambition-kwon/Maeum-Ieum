import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {caregiver} from '../../services/controller';

export default function SignupNum() {
  const isValidPhoneNumber = phoneNumber => {
    const phoneNumberPattern =
      /^(01[016789]-\d{3,4}-\d{4}|0[2-9]{1}\d{1}-\d{3,4}-\d{4})$/;
    return phoneNumberPattern.test(phoneNumber);
  };
  const navigation = useNavigation();
  const route = useRoute();
  const {
    username,
    password,
    realname,
    selectedGender,
    formattedDate,
    organization,
    imageData,
  } = route.params;
  const [contact, setContact] = useState('');

  const handleNextPress = async () => {
    const formData = new FormData();
    if (isValidPhoneNumber(contact)) {
      formData.append('username', username);
      formData.append('password', password);
      formData.append('contact', contact);
      formData.append('gender', selectedGender.toUpperCase());
      formData.append('birthDate', formattedDate);
      formData.append('organization', organization);
      formData.append('name', realname);
      formData.append('img', imageData);
      try {
        const response = await caregiver.signup(formData);
        console.log(response.data);
        navigation.navigate('AdminApprove');
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('오류', '유효한 전화번호 형식이 아닙니다.');
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
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>요양사님</Text>
        <Text style={styles.welcomeText}>연락처를 등록해주세요</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="연락처를 입력해주세요"
            placeholderTextColor="#B0B0B0"
            keyboardType="numeric"
            value={contact}
            onChangeText={setContact}
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
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
  },
  inputContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 24,
    textAlign: 'center',
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
