import React, {useState} from 'react';
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

const CreateAIScreen = () => {
  // 변수 선언
  const [aiName, setAiName] = useState('');
  const [requiredRule, setRequiredRule] = useState('');
  const [topic, setTopic] = useState('');
  const [forbiddenWords, setForbiddenWords] = useState('');
  const [responseType, setResponseType] = useState('');
  const [personality, setPersonality] = useState('');
  const route = useRoute();
  const {elderlyId} = route.params;
  const navigation = useNavigation();

  // 생성하기 버튼을 눌렀을 때 실행되는 함수
  const handleCreate = async () => {
    try {
      await caregiver.createAI(elderlyId, {
        name: aiName,
        mandatoryRule: requiredRule,
        conversationTopic: topic,
        responseType: responseType,
        personality: personality,
        forbiddenTopic: forbiddenWords,
      });
      Alert.alert('알림', 'AI가 정상적으로 생성되었습니다.');
      navigation.reset({
        index: 0,
        routes: [{name: 'ExpertMainScreen'}],
      });
    } catch (error) {
      Alert.alert('오류', '서버 오류로 인해 AI가 생성되지 않았습니다.');
      console.log(error.response.data);
    }
  };

  // 규칙 자동 완성 버튼을 눌렀을 때 실행되는 함수
  const handleAutocomplete = async () => {
    try {
      const response = await caregiver.ruleGenerate(elderlyId, requiredRule);
      console.log(JSON.stringify(response.data.data.mandatoryRule));
      setRequiredRule(response.data.data.mandatoryRule);
    } catch (error) {
      Alert.alert(
        '오류',
        '서버 오류로 인해 자동적으로 규칙이 완성되지 않았습니다.',
      );
      console.log(error.response.data);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>AI Assistant 생성</Text>
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

        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.buttonText}>생성하기</Text>
        </TouchableOpacity>
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
  createButton: {
    height: 50,
    backgroundColor: '#FCCB02',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
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
});

export default CreateAIScreen;
