import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { firestore } from '../../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const UserList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'reservations'));
        const fetchedReservations = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(fetchedReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, []);

  const renderReservation = ({ item }) => (
    <View style={styles.reservationItem}>
      <Text style={styles.nameText}>고객 이름: {item.userName}</Text>
      {/* 여기에 추가적으로 예약 세부 정보를 표시할 수 있습니다 */}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reservations}
        renderItem={renderReservation}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  reservationItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  nameText: {
    fontSize: 16,
  },
  // 추가적인 스타일 정의가 필요할 수 있습니다
});

export default UserList;
