import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function RegisterGender() {
  const [selectedGender, setSelectedGender] = useState(null);
  const navigation = useNavigation();
  const handleGenderPress = gender => {
    setSelectedGender(gender);
  };
  const handleNextPress = () => {
    if (selectedGender !== null) {
      navigation.navigate('SignupDateElder');
    } else {
      Alert.alert(
        '오류',
        '성별이 선택되지 않았습니다.\n다시 한 번 확인해 주세요.',
      );
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
        <View style={styles.progress}></View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>등록하실 어르신의</Text>
        <Text style={styles.welcomeText}>성별을 선택해주세요</Text>
      </View>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderOption,
            styles.maleOption,
            selectedGender === 'male' && styles.selectedMale,
          ]}
          onPress={() => handleGenderPress('male')}>
          <IoniconsIcons name="male" size={100} color="#58A6FF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderOption,
            styles.femaleOption,
            selectedGender === 'female' && styles.selectedFemale,
          ]}
          onPress={() => handleGenderPress('female')}>
          <IoniconsIcons name="female" size={100} color="#D99BFF" />
        </TouchableOpacity>
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
    textAlign: 'left',
    color: '#000',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  genderOption: {
    margin: 30,
    borderWidth: 4,
    borderRadius: 100,
    borderColor: 'transparent',
    padding: 10,
  },
  maleOption: {
    backgroundColor: '#EAF2FA',
  },
  femaleOption: {
    backgroundColor: '#F7F0FA',
  },
  selectedMale: {
    borderColor: '#87CEEB',
  },
  selectedFemale: {
    borderColor: '#D99BFF',
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
