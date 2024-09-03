import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Clipboard } from 'react-native';

// 전문가의 정보가 표시되는 header 영역
const Header = () => {
    return (
        <View style={styles.header}>
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.circleButton}>
                    <Image source={require('../../assets/icons/notice.png')} style={styles.iconImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleButton}>
                    <Image source={require('../../assets/icons/setting.png')} style={styles.iconImage} />
                </TouchableOpacity>
            </View>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }} // 실제 이미지 URL로 변경
                    style={styles.profileImage}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.nameText}>정진아 요양사님</Text>
                    <Text style={styles.centerText}>큰 푸른 숲 요양원</Text>
                    <Text style={styles.totalText}>총 관리 인원 : 00명</Text>
                </View>
            </View>
        </View>
    );
}

// 어르신 정보 카드
const SeniorCard = ({ uid, onCopy }) => {
    const copyToClipboard = () => {
        Clipboard.setString(uid);
        onCopy();
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardIdContainer}>
                <Text style={styles.cardId}>uid : {uid}</Text>
                <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                    <Image source={require('../../assets/icons/copy.png')} style={styles.iconImageSmall} />
                </TouchableOpacity>
            </View>
            <View style={styles.cardContent}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }} // 실제 어르신 이미지 URL로 변경
                    style={styles.cardImage}
                />
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardName}>권혁원 어르신(78)</Text>
                    <Text style={styles.cardAddress}>경기도 고양시 일산동구</Text>
                    <Text style={styles.cardPhone}>010-6846-3548</Text>
                </View>
                <View style={styles.cardBadgeContainer}>
                    <Text style={styles.cardBadge}>AI 확인</Text>
                </View>
            </View>
            <View style={styles.cardFooter}>
                <View style={styles.cardFooterItem}>
                    <Text style={styles.cardFooterText}>마지막 방문</Text>
                    <Text style={styles.cardFooterValue}>2일 전</Text>
                </View>
                <View style={styles.cardFooterItem}>
                    <Text style={styles.cardFooterText}>마지막 대화</Text>
                    <Text style={styles.cardFooterValue}>7시간 전</Text>
                </View>
                <View style={styles.cardFooterItem}>
                    <Text style={styles.cardFooterText}>마지막 대화</Text>
                    <Text style={styles.cardFooterValue}>7시간 전</Text>
                </View>
            </View>
        </View>
    );
}

// 전체 화면을 구성하는 컴포넌트
const ExpertMainScreen = () => {
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    const handleCopy = () => {
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000);
    };

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SeniorCard uid="user332429791" onCopy={handleCopy} />
                <SeniorCard uid="user332429792" onCopy={handleCopy} />
                <SeniorCard uid="user332429793" onCopy={handleCopy} />
            </ScrollView>
            {showCopiedMessage && (
                <View style={styles.copiedMessageContainer}>
                    <Text style={styles.copiedMessageText}>복사되었습니다.</Text>
                </View>
            )}
            <TouchableOpacity style={styles.floatingButton}>
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
        height: '100%',
        paddingTop: 20, // 스크롤 뷰의 상단 패딩 추가
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
        fontSize: 18,
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
    },
    circleButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    iconImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    iconImageSmall: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
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
        fontSize: 12,
        color: '#000',
    },
    copyButton: {
        backgroundColor: '#FFF',
        padding: 2,
        marginLeft: 6,
    },
    copyButtonText: {
        fontSize: 12,
        color: '#000',
        fontWeight: 'bold',
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
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    cardAddress: {
        fontSize: 10,
        color: '#000',
    },
    cardPhone: {
        fontSize: 10,
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
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    cardFooterItem: {
        alignItems: 'center',
    },
    cardFooterText: {
        fontSize: 12,
        color: '#000',
    },
    cardFooterValue: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#201D88',
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
