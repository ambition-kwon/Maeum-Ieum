import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// 헤더 컴포넌트
const Header = () => {
    return (
        <View style={styles.header}>
            <TouchableOpacity>
                <Text style={styles.backButton}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>긴급 알림</Text>
            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.headerIcon}>
                    <Text style={styles.circleButtonText}>N</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIcon}>
                    <Text style={styles.circleButtonText}>S</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// 알림 카드 컴포넌트
const NotificationCard = ({ name, description, location, phone, time, date }) => {
    return (
        <View style={styles.notificationCard}>
            <Image
                source={{ uri: 'https://via.placeholder.com/50' }} // 실제 이미지 URL로 변경
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
}

// 알림 화면 컴포넌트
const NotificationHistoryScreen = () => {
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <NotificationCard
                    name="권혁원 어르신"
                    description="으로부터 긴급알림이 왔습니다."
                    location="제주특별자치도 제주시 제주대학교 113, 404호"
                    phone="010-xxxx-xxxx"
                    date="13:10"
                />
                <NotificationCard
                    name="유예진 어르신"
                    description="으로부터 긴급알림이 왔습니다."
                    location="제주특별자치도 제주시 제주대학교 113, 404호"
                    phone="010-xxxx-xxxx"
                    date="1일 전"
                />
            </ScrollView>
        </View>
    );
}

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
        marginLeft: 15,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
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

export default NotificationHistoryScreen;
