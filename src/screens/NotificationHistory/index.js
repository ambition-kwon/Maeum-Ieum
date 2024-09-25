import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {caregiver} from '../../services/controller';

// 헤더 컴포넌트
const Header = () => {
  const navigation = useNavigation();
  const handlePressBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <Text style={styles.backButton} onPress={handlePressBack}>
          {'<'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>긴급 알림</Text>
      <View style={styles.headerIcons}>
        <Text>{'      '}</Text>
      </View>
    </View>
  );
};

// 알림 카드 컴포넌트
const NotificationCard = ({
  name,
  description,
  location,
  phone,
  time,
  date,
  imgUrl,
}) => {
  return (
    <View style={styles.notificationCard}>
      <Image
        source={{uri: imgUrl || 'https://via.placeholder.com/50'}} // 실제 이미지 URL로 변경
        style={styles.notificationImage}
      />
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationTitle}>{name}</Text>
        <Text style={styles.notificationDescription}>{description}</Text>
        <Text style={styles.notificationDescription}>{location}</Text>
        <Text style={styles.notificationDescription}>{phone}</Text>
      </View>
      <View style={styles.notificationDetailsContainer}>
        <Text style={styles.notificationDetails}>{date}</Text>
        <Text style={styles.notificationDetails}>{time}</Text>
      </View>
    </View>
  );
};

// 알림 화면 컴포넌트
const NotificationHistory = () => {
  const [emergencyData, setEmergencyData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await caregiver.infoEmergency(0, 999);
        setEmergencyData(response.data.data.emergencyRequests);
        console.log(JSON.stringify(response.data.data, null, 2));
      } catch (error) {
        console.log(JSON.stringify(error.response.data, null, 2));
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {emergencyData.map((item, index) => (
          <NotificationCard
            key={index}
            name={item.message.split('으로부터')[0]}
            description={item.message}
            location={item.homeAddress}
            phone={item.contact}
            date={item.createdDate}
            imgUrl={item.imgUrl}
          />
        ))}
      </ScrollView>
    </View>
  );
};

// style 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    fontSize: 34,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  circleButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA07A',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#000',
  },
  notificationDetailsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  notificationDetails: {
    fontSize: 12,
    color: '#888',
  },
});

export default NotificationHistory;
