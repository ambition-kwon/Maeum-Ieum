import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';

export default function RegisterHome() {
  const [address, setAddress] = useState('');
  const [showPostcode, setShowPostcode] = useState(false);

  const handleNextPress = () => {
    console.log('Next icon pressed');
  };

  const handleAddressSelect = (data) => {
    setAddress(data.address);
    setShowPostcode(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>등록하실 어르신의</Text>
        <Text style={styles.welcomeText}>주거지를 입력해주세요</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="주소를 검색해주세요"
            placeholderTextColor="#B0B0B0"
            value={address}
            editable={false}
          />
          <TouchableOpacity style={styles.searchButton} onPress={() => setShowPostcode(true)}>
            <Image source={require('./src/assets/icons/search.png')} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="상세 주소를 입력해주세요"
            placeholderTextColor="#B0B0B0"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.nextIconContainer} onPress={handleNextPress} activeOpacity={0.7}>
        <Image source={require('./src/assets/icons/next.png')} style={styles.nextIcon} />
      </TouchableOpacity>

      {/* 주소 검색 모달 */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showPostcode}
        onRequestClose={() => setShowPostcode(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowPostcode(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Postcode
                  style={{ flex: 1 }}
                  jsOptions={{ animation: true }}
                  onSelected={handleAddressSelect}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    position: 'relative',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  searchButton: {
    position: 'absolute',
    right: 10,
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
  searchIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
