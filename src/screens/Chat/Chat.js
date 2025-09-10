import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Easing,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {elderly} from '../../services/controller';
import {useNavigation, useRoute} from '@react-navigation/native';
import Voice from '@react-native-voice/voice';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';

export default function Chat() {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedGender, setSelectedGender] = useState('MALE');
  const spinValue = useRef(new Animated.Value(0)).current;
  const [requestText, setRequestText] = useState('');
  const [viewRequestText, setViewRequestText] = useState('');
  const [responseText, setResponseText] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const {threadId, openAiAssistantId, elderlyId} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const playAudio = async audioData => {
    const filePath = `${RNFS.DocumentDirectoryPath}/audio.mp3`;
    try {
      await RNFS.writeFile(filePath, audioData, 'base64');
      const sound = new Sound(filePath, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('Failed to load sound', error);
          return;
        }
        sound.play(success => {
          if (success) {
            console.log('Successfully finished playing');
            RNFS.unlink(filePath)
              .then(() => {
                console.log('File deleted:', filePath);
              })
              .catch(error => {
                console.log('Error deleting file:', error);
              });
          } else {
            console.log('Playback failed due to audio decoding errors');
          }
        });
      });
    } catch (error) {
      console.error('Error writing audio file:', error);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleTextSend = async () => {
    try {
      setIsLoading(true);
      const data = {
        content: requestText,
        openAiAssistantId: openAiAssistantId,
        threadId: threadId,
      };
      Keyboard.dismiss();
      setRequestText('');
      setResponseText('');
      setViewRequestText(requestText);
      const response = await elderly.getNonStreamText(elderlyId, data);
      setResponseText(response.data.data.answer);
      setIsLoading(false);
    } catch (error) {
      Alert.alert(
        '오류',
        '서버 오류로 인해 이음이와 대화가 이루어지지 않았어요.',
      );
      console.log(JSON.stringify(error.response.data, null, 2));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleSpeechResults = result => {
      onSpeechResults(result, selectedGender);
    };

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = handleSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [selectedGender]);

  const onSpeechStart = () => {
    setRequestText('');
    setViewRequestText('');
    setResponseText('');
    setIsRecording(true);
    setIsListening(true);
    setIsLoading(true);
    Keyboard.dismiss();
  };

  const onSpeechResults = async (result, currentGender) => {
    setViewRequestText(result.value[0]);
    setIsListening(false);
    setIsRecording(false);
    setIsLoading(false);
    try {
      const response = await elderly.getVoice(elderlyId, {
        content: result.value[0],
        openAiAssistantId: openAiAssistantId,
        threadId: threadId,
        gender: currentGender,
      });
      setResponseText(response.data.data.content);
      await playAudio(response.data.data.answer);
    } catch (error) {
      Alert.alert(
        '오류',
        '서버 오류로 인해 이음이와 대화가 이루어지지 않았어요.',
      );
      console.log(JSON.stringify(error.response.data, null, 2));
    }
  };

  const onSpeechError = error => {
    console.error(error);
    setIsListening(false);
    setIsRecording(false);
    setIsLoading(false);
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start('ko-KR');
    } catch (error) {
      setIsRecording(false);
      console.error(error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 로딩 스피너의 회전 애니메이션
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500, // 회전 주기 (숫자가 낮을 수록 빠르게 돌아감)
        easing: Easing.linear,
        useNativeDriver: true,
      }),
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
          <TouchableOpacity onPress={() => setSelectedGender('MALE')}>
            <IoniconsIcon
              name="male-outline"
              size={30}
              color={selectedGender === 'MALE' ? '#58A6FF' : 'black'}
            />
          </TouchableOpacity>

          {/* 여성 아이콘 */}
          <TouchableOpacity onPress={() => setSelectedGender('FEMALE')}>
            <IoniconsIcon
              name="female-outline"
              size={30}
              color={selectedGender === 'FEMALE' ? '#D99BFF' : 'black'}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.previousConversationButton}
          onPress={() => {
            navigation.navigate('SeniorChatRecordScreen', {
              elderlyId: elderlyId,
            });
          }}>
          <Text style={styles.previousConversationText}>
            이전 대화 확인하기
          </Text>
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollTop}
          contentContainerStyle={styles.topHalfContent}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.topText}>{responseText}</Text>
        </ScrollView>

        {isLoading && (
          <View style={styles.spinnerContainer}>
            <Animated.View
              style={[styles.spinner, {transform: [{rotate: spin}]}]}
            />
            <Text
              style={
                styles.loadingText
              }>{`이음이가 답변을\n고민하는 중이에요😄`}</Text>
            <Text style={styles.loadingText}></Text>
          </View>
        )}
      </View>

      <View style={styles.bottomHalf}>
        <ScrollView
          style={styles.scrollBottom}
          contentContainerStyle={styles.bottomHalfContent}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.bottomText}>{viewRequestText}</Text>
        </ScrollView>
      </View>

      <View style={styles.micContainer}>
        <View style={styles.outerBorder}>
          <View style={styles.middleBorder}>
            <TouchableOpacity
              style={styles.micButton}
              onPress={isListening ? stopListening : startListening}>
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
          keyboardType={'default'}
          value={requestText}
          onChangeText={setRequestText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleTextSend}>
          <FeatherIcon name="send" size={25} color="#3369FF" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={handleBackPress}>
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
    marginBottom: 50,
    textAlign: 'center',
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
