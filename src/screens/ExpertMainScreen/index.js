import React, { useState, useEffect } from 'react';
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
import { caregiver } from '../../services/controller';
import { useNavigation } from '@react-navigation/native';

const Header = ({ img, name, organization, totalCareNumber }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.circleButton}>
          <FontistoIcon name="bell" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.navigate('MyPageScreen')}>
          <OcticonsIcon name="gear" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image source={{ uri: img }} style={styles.profileImage} />
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

const SeniorCard = ({
  uid,
  name,
  age,
  address,
  contact,
  onCopy,
  img,
  assistantName,
  elderlyId,
  assistantId,
}) => {
  const navigation = useNavigation();

  const copyToClipboard = () => {
    Clipboard.setString(uid);
    onCopy();
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('SeniorDetailScreen', { elderlyId })}
      >
      <View style={styles.cardIdContainer}>
        <Text style={styles.cardId}>uid: {uid}</Text>
        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
          <FeatherIcon name="copy" size={16} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Image source={{ uri: img }} style={styles.cardImage} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardName}>
            {name} ({age}살)
          </Text>
          <Text style={styles.cardAddress}>{address}</Text>
          <Text style={styles.cardPhone}>{contact}</Text>
        </View>
        {assistantName ? (
          <TouchableOpacity
            style={styles.cardBadgeContainer}
            onPress={() => navigation.navigate('EditAIScreen', {
              elderlyId,
              assistantId,
            })}>
            <Text style={styles.cardBadge}>{assistantName}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.cardBadgeContainer}
            onPress={() => navigation.navigate('CreateAIScreen', { elderlyId })}>
            <Text style={styles.cardBadge}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
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
    caregiver
      .info()
      .then(response => {
        setImg(response.data.data.img);
        setName(response.data.data.name);
        setOrganization(response.data.data.organization);
        setTotalCareNumber(response.data.data.totalCareNumber);
        setSeniorData(response.data.data.elderlyInfoDto);
      })
      .catch(error => {
        console.log(error.response.data);
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
        <View style={styles.innerContainer}>
          {seniorData.length > 0 ? (
            seniorData.map((senior, index) => (
              <SeniorCard
                key={index}
                uid={senior.accessCode}
                name={senior.name}
                age={senior.age}
                address={senior.homeAddress}
                contact={senior.contact}
                onCopy={handleCopy}
                img={senior.img}
                elderlyId={senior.elderlyId}
                assistantName={senior.assistantName}
                assistantId={senior.assistantId}
              />
            ))
          ) : (
            <Text style={styles.noDataText}>
              담당 어르신을 새롭게 추가해주세요.
            </Text>
          )}
        </View>
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

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCCB02',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 20,
    width: '100%',
    minHeight: '100%',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FCCB02',
    padding: 20,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
  centeredScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    marginTop: 220, // justifyContent가 제대로 작동하지 않아 marginTop으로 대체
    textAlign: 'center',
    color: '#FCCB02',
    fontSize: 20,
    fontWeight: 'bold',
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
    shadowOffset: { width: 0, height: 4 },
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
    textAlign: 'center',
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
    shadowOffset: { width: 0, height: 4 },
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
