import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {caregiver} from '../../services/controller';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleSubmit = async () => {
    try {
      const response = await caregiver.login(username, password);
      await AsyncStorage.setItem('token', response.headers.getAuthorization());
      navigation.reset({
        index: 0,
        routes: [{name: 'ExpertMainScreen'}],
      });
    } catch (error) {
      Alert.alert('오류', '로그인이 실패하였습니다.\n계정을 재 확인해 주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>마음이음에 오신 것을</Text>
        <Text style={styles.welcomeText}>환영합니다, 요양사님!</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="person-outline" size={28} color="#959595" />
          <TextInput
            style={styles.input}
            placeholder="아이디를 입력해주세요"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#B0B0B0"
          />
        </View>
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={28}
            color="#959595"
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#B0B0B0"
          />
        </View>
      </View>
      <View style={styles.forgotContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('CodeLogin')}>
          <Text style={styles.forgotText}>혹시, 요양사가 아니신가요?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>아이디 | 비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>회원가입</Text>
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
  titleContainer: {
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 28,
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
    fontSize: 20,
    color: '#000',
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotText: {
    color: '#888',
  },
  linkText: {
    color: '#B4B4B4',
  },
  loginButton: {
    backgroundColor: '#FCCB02',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  signupText: {
    textAlign: 'center',
    color: '#959595',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
