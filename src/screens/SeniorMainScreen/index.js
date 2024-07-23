import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// 전문가의 정보가 표시되는 header 영역
const Header = () => {
    return (
        <View style={styles.header}>
            <Image
                source={{uri: 'https://via.placeholder.com/150'}} // 실제 이미지 URL로 변경
                style={styles.profileImage}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.nameText}>정진아 요양사(큰 푸른 숲 요양원)</Text>
                <Text style={styles.contactText}>연락처: 010-xxxx-xxxx</Text>
            </View>
        </View>
    );
}

// 어르신의 각종 정보가 표시되는 영역
const SeniorInfo = () => {
    return (
        <View style={styles.seniorInfo}>
            <View style={styles.recordInfo}>
                <View style={styles.visitInfo}>
                    <Text style={styles.visitInfoText}>다음 방문까지</Text>
                    <Text style={styles.visitInfoValue}>10일</Text>
                </View>
                <Image
                    source={{uri: 'https://via.placeholder.com/150'}} // 실제 어르신 이미지 URL로 변경
                    style={styles.seniorImage}
                />
                <View style={styles.lastTalkInfo}>
                    <Text style={styles.lastTalkInfoText}>마지막 대화</Text>
                    <Text style={styles.lastTalkInfoValue}>7시간 전</Text>
                </View>
            </View>

            <View style={styles.detailInfo}>
                <Text style={styles.seniorName}>권혁원 어르신</Text>
                <Text style={styles.seniorBirth}>1949년 4월 26일(만 78세)</Text>
            </View>
        </View>
    );
}

// 하단의 흰색 배경 영역
const HalfContainer = ({ children }) => {
    return (
        <View style={styles.halfContainer}>
            {children}
        </View>
    );

}

// 하단의 액션 버튼
const ActionButton = ({ color, text, icon }) => {
    return (
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: color }]}>
            <Text style={styles.actionButtonText}>{icon} {text}</Text>
        </TouchableOpacity>
    );
}

// 전체 화면을 구성하는 컴포넌트
const SeniorMainScreen = () => {
    return (
        <View style={styles.container}>
            <Header />
            <SeniorInfo />
            <HalfContainer>
                <ActionButton color="#FCCB02" text="저랑, 얘기하실래요?" icon="🗣️" />
                <ActionButton color="#FCCB02" text="저랑, 문자하실래요?" icon="💬" />
                <ActionButton color="#FE5F2F" text="도와주세요!" icon="📞" />
                <Text style={styles.footerText}>이제 그만 사용하고 싶어요</Text>
            </HalfContainer>
        </View>
    );
};

// style 정의
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCCB02',
        alignItems: 'center',
    },
    header: {
        marginLeft: 30,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FCCB02',
        padding: 10,
        width: '100%',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    infoContainer: {
        marginLeft: 10,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contactText: {
        fontSize: 14,
    },
    recordInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    seniorInfo: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '30%',
    },
    visitInfo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    visitInfoText: {
        color: '#000',
        fontSize: 14,
    },
    visitInfoValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FCCB02',
    },
    seniorImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    lastTalkInfo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    lastTalkInfoText: {
        color: '#000',
        fontSize: 14,
    },
    lastTalkInfoValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#201D88',
    },
    seniorName: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    seniorBirth: {
        fontSize: 14,
        color: '#000',
    },
    actionButton: {
        width: '86%',
        height: '24%',
        padding: 15,
        marginVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    detailInfo : {
        flexDirection: 'column',
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
    },
    halfContainer: {
        height: '60%',
        width: '100%',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        position: 'absolute',
        bottom: 0,
    },
    footerText: {
        fontSize: 12,
        color: '#555',
        marginVertical: 10,
    },
});

export default SeniorMainScreen;
