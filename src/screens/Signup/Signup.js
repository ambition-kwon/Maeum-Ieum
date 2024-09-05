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
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {checkUsername} from '../../services/axiosInstance';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    //인증 후 유저네임 바꾸면 인증여부까지 초기화 하도록 로직 구현
    setIsVerified(false);
  }, [username]);
  const handleCheckUsername = async () => {
    if (username !== '') {
      try {
        const {data} = await checkUsername(username);
        if (data.duplicated === false) {
          setIsVerified(true);
          Alert.alert('확인완료', '사용 가능한 아이디입니다.');
        } else {
          setIsVerified(false);
          Alert.alert(
            '오류',
            '중복된 아이디입니다.\n다른 아이디를 입력해주세요.',
          );
        }
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      Alert.alert(
        '오류',
        '아이디가 입력되지 않았습니다.\n다시 한 번 확인해 주세요.',
      );
    }
  };

  const handleNextPress = () => {
    if (password !== '' && password === checkPassword && isVerified) {
      navigation.navigate('SignupName', {
        username: username,
        password: password,
      });
    } else if (password !== checkPassword && isVerified) {
      Alert.alert(
        '오류',
        '비밀번호가 일치하지 않습니다.\n다시 한 번 확인해 주세요.',
      );
    } else if (password === checkPassword && !isVerified) {
      Alert.alert('오류', '아이디 중복확인을 진행해주세요.');
    } else {
      Alert.alert('오류', '입력 내용을 다시 한 번 확인해 주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progress} />
        <View style={styles.progress} />
        <View style={styles.progress} />
        <View style={styles.progress} />
        <View style={styles.progress} />
        <View style={styles.progress} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>사용하실 아이디와</Text>
        <Text style={styles.welcomeText}>비밀번호를 입력해주세요</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="person-outline" size={28} color="#959595" />
          <TextInput
            style={styles.input}
            placeholder="아이디를 입력해주세요"
            value={username}
            onChangeText={text => setUsername(text.replace(/\s/g, ''))}
            placeholderTextColor="#B0B0B0"
          />
          {isVerified && (
            <FontAwesome
              name="check"
              size={20}
              color="#40CC56"
              style={styles.checkIconOutside}
            />
          )}
          <TouchableOpacity
            style={styles.duplication}
            onPress={handleCheckUsername}
            activeOpacity={0.7}>
            <Text style={styles.duplicationText}>중복확인</Text>
          </TouchableOpacity>
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
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={28}
            color="#959595"
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 재 입력해주세요"
            secureTextEntry
            value={checkPassword}
            onChangeText={setCheckPassword}
            placeholderTextColor="#B0B0B0"
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
    fontSize: 20,
  },
  checkIconOutside: {
    marginRight: 5,
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
});
