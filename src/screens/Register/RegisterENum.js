import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';

export default function RegisterENum() {
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
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
        <View style={styles.progress}></View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>등록하실 어르신의</Text>
        <Text style={styles.welcomeText}>긴급연락처를 입력해주세요</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력해주세요"
            placeholderTextColor="#B0B0B0"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="전화번호를 입력해주세요"
            placeholderTextColor="#B0B0B0"
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="어르신과의 관계를 입력해주세요"
            placeholderTextColor="#B0B0B0"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.nextIconContainer} onPress={handleNextPress} activeOpacity={0.7}>
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
});
