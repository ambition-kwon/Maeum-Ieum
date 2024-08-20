import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AdminApprove() {
  const navigation = useNavigation();
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

    const backAction = () => {
      navigation.navigate('Login');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [scaleAnim, fadeAnim, navigation]);

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ scale: scaleAnim }],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image source={require('../../assets/icons/check.png')} style={styles.image} />
      </Animated.View>
      <Text style={styles.mainText}>관리자 승인 후 이용 가능</Text>
      <Text style={styles.subText}>관리자 승인 후 알림으로 알려드리겠습니다.</Text>
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
  imageContainer: {
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
