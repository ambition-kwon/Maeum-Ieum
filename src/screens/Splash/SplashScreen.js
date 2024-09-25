import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const fetchToken = async () => {
      return await AsyncStorage.getItem('token');
    };
    fetchToken().then(token => {
      const timer = setTimeout(() => {
        if (token !== null) {
          navigation.reset({
            index: 0,
            routes: [{name: 'ExpertMainScreen'}],
          });
        } else {
          navigation.replace('CodeLogin');
        }
      }, 2000);
      return () => clearTimeout(timer);
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/icons/logo.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>마음이음</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#FCCB02',
    fontWeight: 'bold',
  },
});
