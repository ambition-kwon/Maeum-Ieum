import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Clipboard,
} from 'react-native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {caregiver} from '../../services/controller';
import {useNavigation} from '@react-navigation/native';

// 테스트 임시 데이터
const tempData = [
  {
    elderlyId: 'user332429791',
    name: '권혁원 어르신',
    age: 78,
    address: '경기도 고양시 일산동구',
    contact: '010-6846-3548',
  },
  {
    elderlyId: 'user332429792',
    name: '김영희 어르신',
    age: 82,
    address: '서울특별시 종로구',
    contact: '010-1234-5678',
  },
  {
    elderlyId: 'user332429793',
    name: '박철수 어르신',
    age: 75,
    address: '부산광역시 해운대구',
    contact: '010-9876-5432',
  },
  {
    elderlyId: 'user332429794',
    name: '이민수 어르신',
    age: 80,
    address: '대전광역시 서구',
    contact: '010-1111-2222',
  },
  {
    elderlyId: 'user332429795',
    name: '최은희 어르신',
    age: 85,
    address: '인천광역시 남동구',
    contact: '010-3333-4444',
  },
];

// 전문가의 정보가 표시되는 header 영역
const Header = ({img, name, organization, totalCareNumber}) => {
  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.circleButton}>
          <FontistoIcon name="bell" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
          <OcticonsIcon name="gear" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image source={{uri: img}} style={styles.profileImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{name} 요양사님</Text>
          <Text style={styles.centerText}>{organization}</Text>
          <Text style={styles.totalText}>
            총 관리 인원 : {totalCareNumber}명
          </Text>
        </View>
      </View>
    </View>
  );
};

// 어르신 정보 카드
const SeniorCard = ({elderlyId, name, age, address, contact, onCopy}) => {
  const copyToClipboard = () => {
    Clipboard.setString(elderlyId);
    onCopy();
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardIdContainer}>
        <Text style={styles.cardId}>uid : {elderlyId}</Text>
        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
          <FeatherIcon name="copy" size={16} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Image
          source={{uri: 'https://via.placeholder.com/150'}}
          style={styles.cardImage}
        />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardName}>
            {name}({age})
          </Text>
          <Text style={styles.cardAddress}>{address}</Text>
          <Text style={styles.cardPhone}>{contact}</Text>
        </View>
        <TouchableOpacity
          style={styles.cardBadgeContainer}
          onPress={() => {
            /* 아무 동작도 하지 않음 */
          }}>
          <Text style={styles.cardBadge}>AI 확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ExpertMainScreen = () => {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [seniorData, setSeniorData] = useState([]);
  const [img, setImg] = useState('https://via.placeholder.com/150');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [totalCareNumber, setTotalCareNumber] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    setSeniorData(tempData); // 임시 데이터 설정
    caregiver
      .info()
      .then(response => {
        setImg(response.data.data.img);
        setName(response.data.data.name);
        setOrganization(response.data.data.organization);
        setTotalCareNumber(response.data.data.totalCareNumber);
      })
      .catch(error => {
        console.log(error.response.data);
        //강제 로그아웃
        navigation.navigate('Login');
      });
  }, []);

  const handleCopy = () => {
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 2000);
  };

  const handleNavigate = () => {
    navigation.navigate('SignupNameElder');
  };

  return (
    <View style={styles.container}>
      <Header
        img={img}
        name={name}
        organization={organization}
        totalCareNumber={totalCareNumber}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {seniorData.map((senior, index) => (
          <SeniorCard
            key={index}
            uid={senior.elderlyId}
            name={senior.name}
            age={senior.age}
            address={senior.address}
            contact={senior.contact}
            onCopy={handleCopy}
          />
        ))}
      </ScrollView>
      {showCopiedMessage && (
        <View style={styles.copiedMessageContainer}>
          <Text style={styles.copiedMessageText}>복사되었습니다.</Text>
        </View>
      )}
      <TouchableOpacity style={styles.floatingButton} onPress={handleNavigate}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// style 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCB02',
  },
  scrollContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FCCB02',
    padding: 20,
    width: '100%',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoContainer: {
    marginLeft: 20,
  },
  nameText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  centerText: {
    marginTop: 5,
    color: '#000',
    fontSize: 16,
  },
  totalText: {
    color: '#000',
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginBottom: 15,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderColor: '#FCCB02',
    borderWidth: 2,
  },
  cardIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardId: {
    fontSize: 14,
    color: '#000',
  },
  copyButton: {
    backgroundColor: '#FFF',
    padding: 2,
    marginLeft: 6,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cardAddress: {
    fontSize: 14,
    color: '#000',
  },
  cardPhone: {
    fontSize: 16,
    color: '#000',
  },
  cardBadgeContainer: {
    width: 80,
    height: 56,
    backgroundColor: '#FCCB02',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBadge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  copiedMessageContainer: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  copiedMessageText: {
    color: '#FFF',
    fontSize: 14,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FCCB02',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 30,
    color: '#FFF',
  },
});

export default ExpertMainScreen;
