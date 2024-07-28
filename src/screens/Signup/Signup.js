import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Singup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleNextPress = () => {
    console.log('Next icon pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>사용하실 아이디와</Text>
        <Text style={styles.welcomeText}>비밀번호를 입력해주세요</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Image source={require('./src/assets/icons/person.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="아이디를 입력해주세요"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#B0B0B0"
          />
          <TouchableOpacity style={styles.duplication}>
            <Text style={styles.duplicationText}>중복확인</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <Image source={require('./src/assets/icons/lock.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#B0B0B0"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Image source={require('./src/assets/icons/lock.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 재 입력해주세요"
            secureTextEntry
            placeholderTextColor="#B0B0B0"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.nextIconContainer} onPress={handleNextPress} activeOpacity={0.7}>
        <Image source={require('./src/assets/icons/next.png')} style={styles.nextIcon} />
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
  progress:{
    flex: 1,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#E8E8E8',
  },
  titleContainer: {
    marginBottom: 60,
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
  duplication: {
    backgroundColor: '#FCCB02',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
  duplicationText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
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
  nextIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
