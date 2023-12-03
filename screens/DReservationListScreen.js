import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

// 예약 데이터 예시
const reservations = [
  {
    id: '1',
    date: '2023년 12월 9일 (토) 17:00',
    customerName: '김재현',
    salonName: '천안점 미용실',
    service: '커트',
    thumbnail: '', // 예약 서비스 이미지 경로
  },
  // ... 더 많은 예약 데이터
];

const DReservationListScreen = () => {
  const renderReservationItem = ({ item }) => (
    <View style={styles.reservationItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.reservationInfo}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.nameText}>{item.customerName} / {item.salonName}</Text>
        <Text style={styles.serviceText}>{item.service}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={reservations}
      renderItem={renderReservationItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  reservationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  reservationInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 14,
  },
  serviceText: {
    fontSize: 12,
    color: 'gray',
  },
});

export default DReservationListScreen;
