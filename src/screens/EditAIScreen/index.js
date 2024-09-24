import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {caregiver} from '../../services/controller';

const EditAIScreen = () => {
  // 변수 선언
  const [aiName, setAiName] = useState('');
  const [requiredRule, setRequiredRule] = useState('');
  const [topic, setTopic] = useState('');
  const [forbiddenWords, setForbiddenWords] = useState('');
  const [responseType, setResponseType] = useState('');
  const [personality, setPersonality] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const {elderlyId, assistantId} = route.params;

  // 수정하기 버튼을 눌렀을 때 실행되는 함수
  const handleEdit = async () => {
    try {
      const data = {
        name: aiName,
        mandatoryRule: requiredRule,
        conversationTopic: topic,
        responseType: responseType,
        personality: personality,
        forbiddenTopic: forbiddenWords,
      };
      await caregiver.editAI(elderlyId, assistantId, data);
      navigation.reset({
        index: 0,
        routes: [{name: 'ExpertMainScreen'}],
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // 삭제하기 버튼을 눌렀을 때 실행되는 함수
  const handleDelete = async () => {
    Alert.alert('주의', '정말로 삭제 하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('삭제 취소'),
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: async () => {
          try {
            await caregiver.deleteAI(elderlyId, assistantId);
            navigation.reset({
              index: 0,
              routes: [{name: 'ExpertMainScreen'}],
            });
          } catch (error) {
            console.log(error.response.data);
          }
        },
      },
    ]);
  };

  // 규칙 자동 완성 버튼을 눌렀을 때 실행되는 함수
  const handleAutocomplete = async () => {
    try {
      const response = await caregiver.ruleGenerate(elderlyId, requiredRule);
      setRequiredRule(response.data.data.mandatoryRule);
    } catch (error) {
      console.log(JSON.stringify(error.response.data, null, 2));
    }
  };

  // 뒤로 가기 함수
  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    // AI 정보 받아오는 함수
    const fetchAIData = async (elderlyId, assistantId) => {
      try {
        const response = await caregiver.infoAI(elderlyId, assistantId);
        setAiName(response.data.data.name);
        setRequiredRule(response.data.data.mandatoryRule);
        setTopic(response.data.data.conversationTopic);
        setForbiddenWords(response.data.data.forbiddenTopic);
        setResponseType(response.data.data.responseType);
        setPersonality(response.data.data.personality);
        console.log(JSON.stringify(response.data.data, null, 2));
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchAIData(elderlyId, assistantId);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>AI Assistant 수정</Text>
        </View>

        <Text style={styles.label}>AI 이름</Text>
        <TextInput
          style={styles.input}
          placeholder="내용을 입력해주세요"
          placeholderTextColor="#c4c4c4"
          value={aiName}
          onChangeText={setAiName}
        />

        <Text style={styles.label}>AI 규칙 설정(필수)</Text>
        <Text style={styles.subLabel}>
          어르신이 사용하실 AI를 요양사님께서 여러 사항을 직접 설정하실 수
          있습니다.
        </Text>
        <TextInput
          style={styles.essentialInput}
          placeholder="내용을 입력해주세요"
          placeholderTextColor="#c4c4c4"
          value={requiredRule}
          onChangeText={setRequiredRule}
          multiline={true}
          numberOfLines={4}
        />
        <TouchableOpacity
          style={styles.autocompleteButton}
          onPress={handleAutocomplete}>
          <Text style={styles.buttonText}>규칙 자동 완성</Text>
        </TouchableOpacity>

        <Text style={styles.label}>AI 규칙 설정(선택)</Text>

        <Text style={styles.subLabel}>1. 대화주제</Text>
        <TextInput
          style={styles.input}
          placeholder="내용을 입력해주세요"
          placeholderTextColor="#c4c4c4"
          value={topic}
          onChangeText={setTopic}
        />

        <Text style={styles.subLabel}>2. 금기어 및 금기주제</Text>
        <TextInput
          style={styles.input}
          placeholder="내용을 입력해주세요"
          placeholderTextColor="#c4c4c4"
          value={forbiddenWords}
          onChangeText={setForbiddenWords}
        />

        <Text style={styles.subLabel}>3. 응답방식</Text>
        <TextInput
          style={styles.input}
          placeholder="내용을 입력해주세요"
          placeholderTextColor="#c4c4c4"
          value={responseType}
          onChangeText={setResponseType}
        />

        <Text style={styles.subLabel}>4. 성격</Text>
        <TextInput
          style={styles.input}
          placeholder="내용을 입력해주세요"
          placeholderTextColor="#c4c4c4"
          value={personality}
          onChangeText={setPersonality}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.delButtonText}>삭제하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>수정하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  backButtonText: {
    fontSize: 26,
    color: '#000',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 40,
    color: '#000',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  subLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingLeft: 10,
    paddingRight: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#000',
  },
  essentialInput: {
    borderWidth: 1,
    borderColor: '#000',
    paddingLeft: 10,
    paddingRight: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  deleteButton: {
    height: 50,
    width: '48%', // 버튼의 너비를 절반으로 설정
    backgroundColor: '#fff', // 삭제 버튼 색상
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FCCB02',
    borderRadius: 10,
  },
  editButton: {
    height: 50,
    width: '48%', // 버튼의 너비를 절반으로 설정
    backgroundColor: '#FCCB02',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  autocompleteButton: {
    height: 50,
    backgroundColor: '#FCCB02',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  delButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FCCB02',
  },
});

export default EditAIScreen;
