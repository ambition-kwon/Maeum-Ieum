import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function RegisterNum() {
  const [searchText, setSearchText] = useState('');

  const handleNextPress = () => {
    console.log('Next icon pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.complete}></View>
        <View style={styles.progress}></View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>등록하실 어르신의</Text>
        <Text style={styles.welcomeText}>연락처를 등록해주세요</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="연락처를 입력해주세요"
            placeholderTextColor="#B0B0B0"
            keyboardType="numeric"
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
    fontSize: 20,
    fontWeight: '900',
    color: '#000',
  },
  inputContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 24,
    textAlign: 'center',
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
