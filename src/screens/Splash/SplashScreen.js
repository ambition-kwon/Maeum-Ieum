import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('./src/assets/icons/logo.png')} style={styles.image} />
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
