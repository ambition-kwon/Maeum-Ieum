import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing, ScrollView, TextInput } from 'react-native'; // TextInput 추가
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const dummyData = [
  '오늘은 담당 요양사가 방문하는 날입니다! 오늘은 담당 요양사가 방문하는 날입니다! 오늘은 담당 요양사가 방문하는 날입니다! 오늘은 담당 요양사가 방문하는 날입니다!',
];

export default function Chat() {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedGender, setSelectedGender] = useState('male'); // 기본 값은 male로 설정해뒀음
  const spinValue = useRef(new Animated.Value(0)).current;

  const handleMicPress = () => {
    setIsRecording(prevState => !prevState);
  };

  const handleSend = () => {
    console.log('보내기');
  };

  useEffect(() => {
    // 로딩 스피너의 회전 애니메이션
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500, // 회전 주기 (숫자가 낮을 수록 빠르게 돌아감)
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <View style={styles.genderIcons}>
          {/* 남성 아이콘 */}
          <TouchableOpacity onPress={() => setSelectedGender('male')}>
            <IoniconsIcon
              name="male-outline"
              size={30}
              color={selectedGender === 'male' ? '#58A6FF' : 'black'}
            />
          </TouchableOpacity>

          {/* 여성 아이콘 */}
          <TouchableOpacity onPress={() => setSelectedGender('female')}>
            <IoniconsIcon
              name="female-outline"
              size={30}
              color={selectedGender === 'female' ? '#D99BFF' : 'black'}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.previousConversationButton} onPress={() => { console.log('이전'); }}>
          <Text style={styles.previousConversationText}>이전 대화 확인하기</Text>
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollTop}
          contentContainerStyle={styles.topHalfContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.topText}>{dummyData[0]}</Text>
        </ScrollView>

        {/* 로딩 스피너 부분
        <View style={styles.spinnerContainer}>
          <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
          <Text style={styles.loadingText}>이음이가 답변을</Text>
          <Text style={styles.loadingText}>고민하는 중이에요...</Text>
        </View>
        */}

      </View>

      <View style={styles.bottomHalf}>
        <ScrollView
          style={styles.scrollBottom}
          contentContainerStyle={styles.bottomHalfContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.bottomText}>{dummyData[0]}</Text>
        </ScrollView>
      </View>

      <View style={styles.micContainer}>
        <View style={styles.outerBorder}>
          <View style={styles.middleBorder}>
            <TouchableOpacity style={styles.micButton} onPress={handleMicPress}>
              {isRecording ? (
                <IoniconsIcon name="stop-outline" size={40} color="red" />
              ) : (
                <SimpleLineIcons name="microphone" size={40} color="red" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="이음이는 어르신을 기다리고 있어요!"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <FeatherIcon name="send" size={25} color="#3369FF" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={() => { console.log('닫기'); }}>
        <FeatherIcon name="x" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  topHalf: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#FCCB02',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomHalf: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#ffffff',
  },
  scrollBottom: {
    marginTop: 75,
    marginBottom: 80,
  },
  scrollTop: {
    marginTop: 70,
    marginBottom: 80,
  },
  topHalfContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  bottomHalfContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  previousConversationButton: {
    position: 'absolute',
    top: 25,
    right: 15,
  },
  previousConversationText: {
    fontSize: 14,
    color: '#2400FF',
    fontWeight: 'bold',
  },
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: 'gray',
    borderTopColor: '#FD0000',
  },
  loadingText: {
    fontSize: 21,
    color: 'black',
    fontWeight: 'bold',
  },
  topText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  bottomText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FCCB02',
    textAlign: 'center',
  },
  micContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    elevation: 5,
  },
  genderIcons: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: '40%',
    right: '40%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  sendButton: {
    marginRight: 5,
  },
});
