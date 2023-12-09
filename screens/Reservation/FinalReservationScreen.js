import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';

const FinalReservationScreen = ({ route, navigation }) => {
  // 상태는 사용하지 않고, route.params에서 직접 데이터를 가져옵니다.
  const [reservationInfo, setReservationInfo] = useState({
    designerName: '',
    serviceName: '',
    servicePrice: '',
    salonName: '',
    selectedDate: '',
    selectedTime: '',
    designerProfileUrl: '',
  });

  useEffect(() => {
    // route.params로부터 받은 모든 예약 정보를 상태로 설정
    if (route.params) {
      setReservationInfo({
        designerName: route.params.designerName,
        serviceName: route.params.serviceName,
        servicePrice: route.params.servicePrice,
        salonName: route.params.salonName,
        selectedDate: route.params.selectedDate,
        selectedTime: route.params.selectedTime,
        designerProfileUrl: route.params.designerProfileUrl,
      });
    }
  }, [route.params]);

  const handleConfirmPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: reservationInfo.designerProfileUrl }} style={styles.profileImage}/>
      <Text style={styles.confirmationTitle}>예약이 확정되었습니다!</Text>
      <View style={styles.reservationDetails}>
        <Text style={styles.detailLabel}>디자이너: {reservationInfo.designerName}</Text>
        <Text style={styles.detailLabel}>헤어샵: {reservationInfo.salonName}</Text>
        <Text style={styles.detailLabel}>서비스: {reservationInfo.serviceName}</Text>
        <Text style={styles.detailLabel}>가격: {reservationInfo.servicePrice}</Text>
        <Text style={styles.detailLabel}>예약 날짜: {reservationInfo.selectedDate}</Text>
        <Text style={styles.detailLabel}>예약 시간: {reservationInfo.selectedTime}</Text>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPress}>
        <Text style={styles.confirmButtonText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
  },
  reservationDetails: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  detailLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
});

export default FinalReservationScreen;
