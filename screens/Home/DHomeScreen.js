import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { firestore, auth } from '../../config/firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';

const DHomeScreen = ({navigation}) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // 로그인한 디자이너의 ID를 확인
    const designerId = auth.currentUser?.uid;
    if (!designerId) {
      console.log('로그인한 디자이너가 없습니다.');
      return;
    }
  
    // 로그인한 디자이너의 예약 정보를 실시간으로 가져오기 위한 리스너 설정
    const designerDocRef = doc(firestore, `designers/${designerId}`);
    const unsubscribe = onSnapshot(designerDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {   // 예약 정보가 존재하면 상태에 설정
        const designerData = docSnapshot.data();
        setReservations(designerData.reservations || []);
      }
    }, (error) => {
      console.error("Error fetching reservations:", error);
    });
    // 컴포넌트가 언마운트될 때 리스너를 해제
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyDesigner</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('UserList')}>
          <Image source={require("../../assets/hairstyle.png")} style={styles.imagebutton} />
          <Text style={styles.text}>고객 리스트</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyProfile')} >
          <Image source={require("../../assets/info.png")} style={styles.imagebutton} />
          <Text style={styles.text}>내 프로필</Text>
        </TouchableOpacity>
      </View>
      {/* 예약 내역을 표시하는 부분 */}
      <ScrollView>
        {reservations.map((reservation, index) => (
          <View key={index} style={styles.reservationItem}>
            <Text>이름: {reservation.userName}</Text>
            <Text>날짜: {reservation.date}</Text>
            <Text>시간: {reservation.time}</Text>
            <Text>서비스: {reservation.serviceName}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginVertical: 10,
    marginTop: 45,
    marginLeft: 8,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  menuItem: {
    alignItems: 'center',
  },
  imagebutton: {
    width: 60,
    height: 60,
    // 이미지의 스타일링은 필요에 맞게 조정
  },
  text: {
    marginTop: 5,
  },
  reservationItem:{
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default DHomeScreen;