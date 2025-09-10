import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { dummyData } from './NursingHomeData';

export default function SignupOrg() {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showList, setShowList] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { username, password, realname, selectedGender, formattedDate } =
    route.params;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleNextPress = () => {
    if (searchText !== '' && showList === false) {
      navigation.navigate('SignupImg', {
        username: username,
        password: password,
        realname: realname,
        selectedGender: selectedGender,
        formattedDate: formattedDate,
        organization: searchText,
      });
    } else {
      Alert.alert(
        '오류',
        '소속기관을 선택하지 않았습니다.\n다시 한 번 확인해 주세요.',
      );
    }
  };

  // 한글 초성 추출 함수
  const getInitialSound = (str) => {
    const cho = [
      'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
    ];
    const result = [];

    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i) - 44032;

      if (code > -1 && code < 11172) {
        const choIndex = Math.floor(code / 588);
        result.push(cho[choIndex]);
      } else {
        result.push(str[i]);
      }
    }
    return result.join('');
  };

  const handleSearch = (text) => {
    setSearchText(text);

    if (text === '') {
      setShowList(false);
      setFilteredData([]);
    } else {
      const filtered = dummyData.filter((item) => {
        const initialSound = getInitialSound(item.name); // 기관명에 대한 초성 추출
        const searchInitialSound = getInitialSound(text); // 입력된 텍스트의 초성 추출

        // 문자열의 첫 글자나 초성이 입력된 텍스트와 정확히 일치하는지 확인
        return (
          item.name.startsWith(text) || // 기본 검색: 기관명이 입력된 텍스트로 시작하는지 확인
          initialSound.startsWith(searchInitialSound) // 초성 검색: 초성이 입력된 텍스트로 시작하는지 확인
        );
      });

      setFilteredData(filtered);
      setShowList(filtered.length > 0); // 검색 결과가 있을 때만 showList를 true로 설정
    }
  };


  const handleItemPress = (item) => {
    setSearchText(item.name);
    setShowList(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <View style={styles.complete}></View>
          <View style={styles.complete}></View>
          <View style={styles.complete}></View>
          <View style={styles.complete}></View>
          <View style={styles.progress}></View>
          <View style={styles.progress}></View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.welcomeText}>요양사님</Text>
          <Text style={styles.welcomeText}>소속기관을 검색해주세요</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder="기관명을 입력하세요"
              value={searchText}
              onChangeText={handleSearch}
              onFocus={() => setShowList(true)}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => handleSearch(searchText)}>
              <SimpleLineIcons name="magnifier" size={20} color="#58A6FF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 검색 결과가 있을 때만 FlatList를 렌더링 */}
        {showList && filteredData.length > 0 && (
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleItemPress(item)}
                style={styles.listItem}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.itemText}>운영시간: {item.hours}</Text>
                <Text style={styles.itemText}>도로명: {item.address}</Text>
                <Text style={styles.itemText}>지번: {item.lot}</Text>
              </TouchableOpacity>
            )}
            style={styles.listContainer}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
          />
        )}

        {!keyboardVisible && (
          <TouchableOpacity
            style={styles.nextIconContainer}
            onPress={handleNextPress}
            activeOpacity={0.7}>
            <IoniconsIcons
              name="arrow-forward-circle"
              size={50}
              color="#FCCB02"
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 10,
    left: 5,
    right: 5,
  },
  progress: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#E8E8E8',
  },
  complete: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#FCCB02',
  },
  titleContainer: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'left',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 20,
  },
  searchButton: {
    marginLeft: 10,
    marginRight: 10,
  },
  searchIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  listContainer: {
    maxHeight: 250,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFF',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  nameText: {
    fontSize: 20,
    color: 'black',
  },
  itemText: {
    fontSize: 16,
  },
  nextIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
