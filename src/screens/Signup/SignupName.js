import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';

export default function SignupName() {
  const navigation = useNavigation();
  const [realname, setRealname] = useState('');
  const route = useRoute();
  const {username, password} = route.params;
  const handleNextPress = () => {
    if (realname !== '' && realname.length >= 2) {
      navigation.navigate('SignupGender', {
        username: username,
        password: password,
        realname: realname,
      });
    } else {
      Alert.alert('오류', '이름 형식에 어긋납니다.\n다시 한 번 확인해 주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.complete}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>요양사님</Text>
        <Text style={styles.welcomeText}>성함을 입력해주세요</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="성함을 입력해주세요"
            placeholderTextColor="#B0B0B0"
            value={realname}
            onChangeText={text => setRealname(text.trim())}
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
