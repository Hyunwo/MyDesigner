import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { firestore } from '../../config/firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth } from '../../config/firebaseConfig';

const UserList = () => {
  const [userReservationsCount, setUserReservationsCount] = useState([]);

  useEffect(() => {
    // 로그인한 디자이너의 ID를 확인합니다.
    const designerId = auth.currentUser ? auth.currentUser.uid : null;
    if (!designerId) {
      console.log('디자이너가 로그인하지 않았습니다.');
      return;
    }

    // 로그인한 디자이너의 문서에 대한 실시간 리스너를 설정합니다.
    const designerDocRef = doc(firestore, `designers/${designerId}`);
    const unsubscribe = onSnapshot(designerDocRef, (doc) => {
      if (doc.exists()) {
        // 'reservations' 필드에서 예약 목록을 가져옵니다.
        const fetchedReservations = doc.data().reservations || [];
        const reservationsCount = new Map();

        fetchedReservations.forEach(reservation => {
          reservationsCount.set(
            reservation.userName,
            (reservationsCount.get(reservation.userName) || 0) + 1
          );
        });

        setUserReservationsCount(Array.from(reservationsCount).map(([name, count]) => ({ name, count })));
      } else {
        console.log('해당 디자이너의 예약 정보가 없습니다.');
      }
    });

    // 컴포넌트가 언마운트될 때 리스너를 해제합니다.
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.reservationInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.count}>예약 횟수: {item.count}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={userReservationsCount}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
  },
  reservationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 16,
    color: 'grey',
  },
});

export default UserList;
