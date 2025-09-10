import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {elderly} from '../../services/controller';

export default function ChatRecord() {
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const {elderlyId} = route.params;
  const [chatData, setChatData] = useState([]);

  const renderItem = (item, index) => (
    // isSent가 true이면 흰색 말풍선, false이면 노란 말풍선
    <View
      key={index}
      style={[
        styles.messageContainer,
        item.role === 'USER' ? styles.sent : styles.received,
      ]}>
      <Text style={styles.messageText}>{item.content}</Text>
      {/* 메시지 시간, isSent가 true (사용자가 전송한 메시지)일 경우 sentTime 스타일 적용 */}
      <Text style={[styles.messageTime, item.isSent && styles.sentTime]}>
        {item.timeStamp}
      </Text>
    </View>
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await elderly.getBeforeChat(elderlyId, 0, 999);
        const reversedChatData = response.data.data.chat.reverse();
        setChatData(reversedChatData);

        setTimeout(() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({animated: true});
          }
        }, 100);

      } catch (error) {
        Alert.alert(
          '오류',
          '서버 오류로 인해 이음이와의 대화 기록을 볼 수 없어요.',
        );
        console.log(JSON.stringify(error.response.data, null, 2));
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>대화 기록</Text>
        {/* 메시지 배열 렌더링 */}
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}>
        {chatData.map(item => renderItem(item))}
      </ScrollView>

      {/* 뒤로가기 버튼 */}
      <TouchableOpacity onPress={handleBackPress}>
        <Text style={styles.backButton}>이전 화면으로</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211B00',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    maxWidth: '90%',
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#FCCB02',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 20,
  },
  messageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  messageTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#393939',
    marginTop: 5,
  },
  sentTime: {
    textAlign: 'right',
  },
  backButton: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 10,
    marginTop: 10,
  },
});
