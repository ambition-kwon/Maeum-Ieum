import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

export default function RegisterComplete() {
  const [countdown, setCountdown] = useState(3); // 초기 카운트다운 값
  const scaleAnim = useRef(new Animated.Value(1)).current; // 초기 스케일 값
  const fadeAnim = useRef(new Animated.Value(0)).current; // 초기 투명도 값

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
  }, [scaleAnim, fadeAnim]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // 카운트다운이 0이 되었을 때 페이지 이동 코드 넣을 것
    }
  }, [countdown]);

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ scale: scaleAnim }],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <Octicons name="check-circle-fill" size={100} color="#FCCB02" />
      </Animated.View>
      <Text style={styles.mainText}>등록이 완료되었습니다</Text>
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
  image: {
    width: 100,
    height: 100,
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
