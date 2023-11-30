import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { storage } from '../config/firebaseConfig';
import { ref as firebaseStorageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore } from '../config/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth } from '../config/firebaseConfig';

const MyProfileScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);

  // 이미지 접근 권한
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('이미지를 업로드하려면 사진첩 권한이 필요합니다.');
          //return false
        }
        //return true
      }
    })();
  }, []);

  // Firebase Firestore에서 이미지 URL 가져오기
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (auth.currentUser) {
        const firestoreRef = doc(firestore, `users/${auth.currentUser.uid}`);
        const docSnap = await getDoc(firestoreRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if(userData.profileImageUrl) {
            setPhoto(userData.profileImageUrl);
          }
        }
      }
    };
    fetchProfileImage();
  }, []);


  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
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
    //navigation.navigate('Settings');
    navigation.navigate('DHome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            source={photo ? { uri: photo } : require('../assets/profile.png')} // Provide your default avatar image
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.name}>김철수</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => console.log('프로필 수정')}>
          <Text style={styles.editButtonText}>프로필 수정</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Image
          source={require('../assets/settings.png')}
          style={styles.settingsIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.reservationButton} onPress={() => console.log('예약 내역 확인')}>
        <Text style={styles.reservationButtonText}>예약 내역 확인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  editButton: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#E8E8E8', // A light grey background color for the button
  },
  editButtonText: {
    fontSize: 16,
    color: '#000000',
  },
  reservationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#E8E8E8', // A light grey background color for the button
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  reservationButtonText: {
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
  },
  settingsButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40, // iOS와 Android 상태바 높이가 다름
    right: 15,
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
});

export default MyProfileScreen;