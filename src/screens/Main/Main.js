import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLine';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import OcticonsIcon from 'react-native-vector-icons/Octicons';

export default function Main() {
  const [showHelpButtons, setShowHelpButtons] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (showHelpButtons) {
        setShowHelpButtons(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [showHelpButtons]);

  return (
    <View style={styles.container}>
      <View style={styles.profileAndButtonsContainer}>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage}/>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>권혁원 어르신</Text>
            <Text style={styles.profileDetails}>정진아 요양사(큰 푸른 숲 요양원)</Text>
            <Text style={styles.profileDetails}>연락처 : 010-xxxx-xxxx</Text>
          </View>
        </View>

        {!showHelpButtons ? (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonHelp]}
              onPress={() => setShowHelpButtons(true)}
            >
              <Text style={styles.buttonText}>도와주세요!</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.helpButtonsContainer}>
            <TouchableOpacity style={[styles.button, styles.additionalButton, styles.buttonPolice]}>
              <FontAwesome6Icon name="triangle-exclamation" size={50} color="black" />
              <Text style={styles.buttonText}>경찰 신고</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.additionalButton, styles.buttonEmergency]}>
              <FontAwesome5Icon name="ambulance" size={50} color="black" />
              <Text style={styles.buttonText}>응급 구조</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.additionalButton, styles.buttonAlert]}>
              <OcticonsIcon name="bell-fill" size={50} color="black" />
              <Text style={styles.buttonText}>요양사 알림</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.additionalButton, styles.buttonCall]}>
              <FontAwesome5Icon name="phone-alt" size={50} color="black" />
              <Text style={styles.buttonText}>요양사 전화</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.micContainer}>
        <View style={styles.outerBorder}>
          <View style={styles.middleBorder}>
            <TouchableOpacity style={styles.micButton}>
              <SimpleLineIcons name="microphone" size={40} color="red" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.micText}>버튼을 눌러</Text>
        <Text style={styles.micText}>이음이와 대화해주세요!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCB02',
  },
  micContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  outerBorder: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(253, 15, 0, 0.1)',
  },
  middleBorder: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(253, 15, 0, 0.3)',
  },
  micButton: {
    backgroundColor: '#F0E5E5',
    borderRadius: 50,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Android 그림자
  },
  micText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    textAlign: 'center',
  },
  profileAndButtonsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  profileTextContainer: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  profileDetails: {
    fontSize: 16,
    color: 'black',
  },
  buttonsContainer: {
    width: '100%',
  },
  helpButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '48%',
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonHelp: {
    width: '100%',
    backgroundColor: '#FE5F2F',
    borderColor: '#FFDFD6',
    borderWidth: 5,
    elevation: 3,
  },
  additionalButton: {
    elevation: 3,
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  buttonPolice: {
    backgroundColor: '#2F75FE',
  },
  buttonEmergency: {
    backgroundColor: '#24B500',
  },
  buttonAlert: {
    backgroundColor: '#F15CC7',
  },
  buttonCall: {
    backgroundColor: '#FE5F2F',
  },
});
