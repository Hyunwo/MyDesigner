import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { storage } from '../config/firebaseConfig';
import { ref as firebaseStorageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore } from '../config/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth } from '../config/firebaseConfig';

const MyInfoScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [reservations, setReservations] = useState([]);

  // 이미지 접근 권한
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('이미지를 업로드하려면 사진첩 권한이 필요합니다.');
        }
      }
    })();
  }, []);

  // Firebase Firestore에서 이미지 URL 가져오기
  useEffect(() => {
    const fetchProfileImageAndName = async () => {
      if (auth.currentUser) {
        const firestoreRef = doc(firestore, `users/${auth.currentUser.uid}`);
        const docSnap = await getDoc(firestoreRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if(userData.profileImageUrl) {
            setPhoto(userData.profileImageUrl);
          }
          if(userData.name){
            setName(userData.name);
          }
        }
      }
    };
    fetchProfileImageAndName();
  }, []);

  // Firebase Firestore에서 사용자의 예약 내역 가져오기
  useEffect(() => {
    const fetchReservations = async () => {
      if (auth.currentUser) {
        const firestoreRef = doc(firestore, `users/${auth.currentUser.uid}`);
        const docSnap = await getDoc(firestoreRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log("Fetched reservations:", userData.reservations);
          if (userData.reservations) {
            setReservations(Object.values(userData.reservations));
          }
        }
      }
    };
    fetchReservations();
  }, []);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      // Firebase Storage에 이미지 업로드
      const uri = result.assets[0].uri;
      const blob = await (await fetch(uri)).blob();

      const imageRef = firebaseStorageRef(storage, `profile/${auth.currentUser.uid}`);
      await uploadBytes(imageRef, blob);

      // 업로드된 이미지 URL 가져오기
      const downloadURL = await getDownloadURL(imageRef);

      // Firestore에 이미지 URL 저장
      const firestoreRef = doc(firestore, `users/${auth.currentUser.uid}`);
      await setDoc(firestoreRef, { profileImageUrl: downloadURL }, { merge: true });
      
      // 상태 업데이트해서 UI에 표시
      setPhoto(downloadURL);
    }
   };

  const openSettings = () => {
    navigation.navigate('설정');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            source={photo ? { uri: photo } : require('../assets/profile.png')} // Provide your default avatar image
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
        {/* 사용자의 예약 내역 표시 */}
        <View style={styles.reservationList}>
          <Text style={styles.reservationTitle}>예약 내역:</Text>
          {reservations.map((reservation, index) => (
            <View key={index} style={styles.reservationItem}>
              <Text style={styles.reservationText}>디자이너: {reservation.designerName}</Text>
              <Text style={styles.reservationText}>미용실: {reservation.salonName}</Text>
              <Text style={styles.reservationText}>날짜: {reservation.date}</Text>
              <Text style={styles.reservationText}>시간: {reservation.time}</Text>
              <Text style={styles.reservationText}>서비스: {reservation.serviceName}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.settingsButton} onPress={openSettings}>
        <Image
          source={require('../assets/settings.png')}
          style={styles.settingsIcon}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#C4C4C4', // A placeholder color
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  settingsButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40, // iOS와 Android 상태바 높이가 다름
    right: 30,
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
  reservationList: {
    marginTop: 20, // 이름과의 간격 조정
  },
  reservationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  reservationItem: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 5,
  },
  reservationText: {
    fontSize: 16,
  },
});

export default MyInfoScreen;
