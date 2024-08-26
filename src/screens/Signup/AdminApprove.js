import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';

export default function AdminApprove() {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current; // 초기 스케일 값
  const fadeAnim = useRef(new Animated.Value(0)).current; // 초기 투명도 값
  const [countdown, setCountdown] = useState(3); // 카운트다운 초기값

  useEffect(() => {
    // 페이드 인 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // 진동 애니메이션
    Animated.loop(
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.25, // 약간 확대
          friction: 1, // 스프링의 마찰
          tension: 50, // 스프링의 강도
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 카운트다운 타이머 설정
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          navigation.navigate('Login');
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // 뒤로가기 버튼 누를 시 로그인 페이지로 이동
    const backAction = () => {
      navigation.navigate('Login');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove();
      clearInterval(timer); // 타이머 클리어
    };
  }, [scaleAnim, fadeAnim, navigation]);

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ scale: scaleAnim }],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <Octicons name="check-circle-fill" size={100} color="#FCCB02" />
      </Animated.View>
      <Text style={styles.mainText}>관리자 승인 후 이용 가능</Text>
      <Text style={styles.subText}>관리자 승인 후 알림으로 알려드리겠습니다.</Text>
      <Text style={styles.subText}>{countdown}초 후에 자동으로 페이지가 닫힙니다</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    marginBottom: 40,
  },
  mainText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  subText: {
    fontSize: 15,
    color: '#6D6D6D',
  },
});
