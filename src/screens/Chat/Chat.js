import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing, ScrollView } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const dummyData = [
  '오늘은 담당 요양사가 방문하는 날입니다! 오늘은 담당 요양사가 방문하는 날입니다! 오늘은 담당 요양사가 방문하는 날입니다!',
];

export default function Chat() {
  const [isRecording, setIsRecording] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;

  const handleMicPress = () => {
    setIsRecording(prevState => !prevState);
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
        <TouchableOpacity style={styles.previousConversationButton}>
          <Text style={styles.previousConversationText}>이전 대화 확인하기</Text>
        </TouchableOpacity>
        <ScrollView style={styles.scrollTop} contentContainerStyle={styles.topHalfContent}>
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
        <ScrollView style={styles.scrollBottom} contentContainerStyle={styles.bottomHalfContent}>
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

      <TouchableOpacity style={styles.endButton}>
        <Text style={styles.endButtonText}>대화 끝내기</Text>
      </TouchableOpacity>

      <Image
        source={require('../../assets/icons/aiicon.png')}
        style={styles.profileImageTopLeft}
      />
      <Image
        source={require('../../assets/icons/aiicon.png')}
        style={styles.profileImageBottomRight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 95,
  },
  scrollTop: {
    marginTop: 90,
    marginBottom: 80,
  },
  topHalfContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  bottomHalfContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  previousConversationButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 3,
  },
  previousConversationText: {
    fontSize: 16,
    color: 'black',
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
  endButton: {
    position: 'absolute',
    bottom: 20,
    left: '30%',
    right: '30%',
    backgroundColor: '#FCCB02',
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endButtonText: {
    color: 'black',
    fontSize: 21,
    fontWeight: 'bold',
  },
  profileImageBottomRight: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    width: 65,
    height: 65,
    borderRadius: 100,
  },
  profileImageTopLeft: {
    position: 'absolute',
    top: 20,
    left: 10,
    width: 65,
    height: 65,
    borderRadius: 100,
  },
});
