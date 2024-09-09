import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function RegisterImg() {
  const [imageUri, setImageUri] = useState(null);
  const [imageData, setImageData] = useState({});
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
  } = route.params;

  const handleNextPress = () => {
    if (imageUri !== null) {
      navigation.navigate('SignupContactElder', {
        name: name,
        gender: gender,
        birthDate: birthDate,
        homeAddress: homeAddress,
        emergencyName: emergencyName,
        emergencyContact: emergencyContact,
        relationship: relationship,
        imgFile: imageData,
      });
    } else {
      Alert.alert(
        '오류',
        '프로필 사진을 선택하지 않았습니다.\n다시 한 번 확인해 주세요.',
      );
    }
  };

  const handleImagePress = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 300,
      maxHeight: 300,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {uri: response.assets[0].uri};
        setImageUri(source.uri);
        setImageData({
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: `image_${Date.now()}`,
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>등록하실 어르신의</Text>
        <Text style={styles.welcomeText}>사진을 등록해주세요</Text>
      </View>

      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleImagePress}
        activeOpacity={0.7}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.imagePlaceholder} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.plusSign}>+</Text>
          </View>
        )}
      </TouchableOpacity>

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
    textAlign: 'left',
    color: '#000',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  imagePlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#FCCB02',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusSign: {
    fontSize: 60,
    color: '#FCCB02',
    marginBottom: 5,
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
