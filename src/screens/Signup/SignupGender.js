import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignupGender() {
  const [selectedGender, setSelectedGender] = useState(null);
  const navigation = useNavigation();

  const handleGenderPress = (gender) => {
    setSelectedGender(gender);
  };

  const handleNextPress = () => {
    console.log('Next icon pressed');
    navigation.navigate('SignupDate');
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>요양사님</Text>
        <Text style={styles.welcomeText}>성별을 선택해주세요</Text>
      </View>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderOption,
            selectedGender === 'male' && styles.selectedMale,
          ]}
          onPress={() => handleGenderPress('male')}
        >
          <Image source={require('../../assets/icons/male.png')} style={styles.genderIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderOption,
            selectedGender === 'female' && styles.selectedFemale,
          ]}
          onPress={() => handleGenderPress('female')}
        >
          <Image source={require('../../assets/icons/female.png')} style={styles.genderIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.nextIconContainer} onPress={handleNextPress} activeOpacity={0.7}>
        <Image source={require('../../assets/icons/next.png')} style={styles.nextIcon} />
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
    fontSize: 20,
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
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'transparent',
  },
  selectedMale: {
    borderColor: '#58A6FF',
  },
  selectedFemale: {
    borderColor: '#D99BFF',
  },
  genderIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
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
