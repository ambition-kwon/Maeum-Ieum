import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>마음이음에 오신 것을</Text>
        <Text style={styles.welcomeText}>환영합니다, 요양사님!</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/icons/person.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="아이디를 입력해주세요"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#B0B0B0"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/icons/lock.png')} style={styles.icon} />
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
      <TouchableOpacity style={styles.loginButton}>
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
    fontSize: 20,
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
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  signupText: {
    textAlign: 'center',
    color: '#959595',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
