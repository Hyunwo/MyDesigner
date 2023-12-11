import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';

const ConfirmedScreen = () => {
  // 예시 데이터입니다. 실제 앱에서는 이 데이터를 서버나 상태 관리 라이브러리에서 가져와야 합니다.
  const reservationDetails = {
    customerName: '김재현',
    designerName: '은지',
    salonName: '어울리다 배방점',
    date: '2023년 12월 24일',
    time: '오후 3시',
    service: '커트'
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>예약이 확정되었습니다!</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>이름: {reservationDetails.customerName}</Text>
        <Text style={styles.infoText}>디자이너: {reservationDetails.designerName}</Text>
        <Text style={styles.infoText}>샵 이름: {reservationDetails.salonName}</Text>
        <Text style={styles.infoText}>예약 날짜: {reservationDetails.date}</Text>
        <Text style={styles.infoText}>시간: {reservationDetails.time}</Text>
        <Text style={styles.infoText}>서비스: {reservationDetails.service}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => console.log('확인 버튼이 눌렸습니다.')}>
        <Text style={styles.buttonText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'skyblue', // 버튼 배경색
    paddingVertical: 10, // 버튼 내부 상하 패딩
    paddingHorizontal: 20, // 버튼 내부 좌우 패딩
    borderRadius: 5, // 버튼 모서리 둥글기
    shadowOpacity: 1, // 그림자 투명도
    shadowRadius: 3, // 그림자 반경
    elevation: 6, // 안드로이드용 그림자 깊이
  },
  buttonText: {
    color: 'black', // 텍스트 색상
    fontSize: 18, // 텍스트 크기
    fontWeight: '600', // 텍스트 두께
    textAlign: 'center', // 텍스트 가운데 정렬
  },
});

export default ConfirmedScreen;