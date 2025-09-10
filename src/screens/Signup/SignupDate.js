import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import DatePicker from 'react-native-date-picker';
import { useNavigation, useRoute } from "@react-navigation/native";
import IoniconsIcons from 'react-native-vector-icons/Ionicons';

export default function SignupDate() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { username, password, realname, selectedGender } = route.params;

  const handleConfirm = (date) => {
    setDatePickerVisibility(false);
    setSelectedDate(date);
    // YYYY-MM-DD 형식 준수 (Backend 요청사항)
    const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setFormattedDate(formatted);
  };

  const handleNextPress = () => {
    if(formattedDate !== ''){
    navigation.navigate('SignupOrg',{
      username: username,
      password: password,
      realname: realname,
      selectedGender: selectedGender,
      formattedDate: formattedDate
    });
    }
    else{
      Alert.alert('오류', '생년월일이 선택되지 않았습니다.\n다시 한 번 확인해 주세요.');
    }
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
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>요양사님</Text>
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
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
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
