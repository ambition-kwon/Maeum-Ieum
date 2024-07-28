import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function RegisterDate() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');

  const handleConfirm = (date) => {
    setDatePickerVisibility(false);
    setSelectedDate(date);
    const formatted = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
    setFormattedDate(formatted);
  };

  const handleNextPress = () => {
    console.log('Next icon pressed');
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
        <View style={styles.progress}></View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>등록하실 어르신의</Text>
        <Text style={styles.welcomeText}>생년월일을 입력해주세요</Text>
      </View>

      <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.dateDisplay}>
        <Text style={styles.dateText}>{formattedDate || '생년월일 선택'}</Text>
      </TouchableOpacity>

      {isDatePickerVisible && (
        <DatePicker
          modal
          open={isDatePickerVisible}
          date={selectedDate}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
          minimumDate={new Date(1900, 0, 1)}
          maximumDate={new Date()}
          locale="ko"
          title="날짜 선택"
          confirmText="확인"
          cancelText="취소"
        />
      )}

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
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'left',
    color: '#000',
  },
  dateDisplay: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5F5F5F',
  },
  dateVisible: {
    alignItems: 'center',
    justifyContent: 'center',
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
