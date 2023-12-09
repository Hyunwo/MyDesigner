import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { firestore, auth } from '../../config/firebaseConfig';
import { collection, getDoc, doc } from 'firebase/firestore';

const DHomeScreen = ({navigation}) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // 현재 로그인한 디자이너의 ID를 사용하여 Firestore에서 문서 조회
        const designerId = auth.currentUser.uid; // 로그인한 디자이너의 ID를 얻어야 함
        const designerDocRef = doc(firestore, `designers/${designerId}`);
        const designerDocSnap = await getDoc(designerDocRef);
  
        if (designerDocSnap.exists()) {
          // 디자이너의 예약 정보만을 추출
          const designerData = designerDocSnap.data();
          if (designerData.reservations) {
            setReservations(designerData.reservations);
          }
        } else {
          console.log("No reservations found for the designer");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
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