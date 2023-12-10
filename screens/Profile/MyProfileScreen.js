// 디자이너 프로필
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { storage } from '../../config/firebaseConfig';
import { ref as firebaseStorageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore } from '../../config/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth } from '../../config/firebaseConfig';
import ServiceScreen from './ServiceScreen';

const MyProfileScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');

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
        const firestoreRef = doc(firestore, `designers/${auth.currentUser.uid}`);
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

      const imageRef = firebaseStorageRef(storage, `DesignerProfile/${auth.currentUser.uid}`);
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);   // 업로드된 이미지 URL 가져오기
      const firestoreRef = doc(firestore, `designers/${auth.currentUser.uid}`);   // Firestore에 이미지 URL 저장
      await setDoc(firestoreRef, { profileImageUrl: downloadURL }, { merge: true });
      setPhoto(downloadURL);
    }
   };

   const openSettings = () => {
    navigation.navigate('설정');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            source={photo ? { uri: photo } : require('../../assets/profile.png')} // 기본 이미지
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
      </View>
      <ServiceScreen onServicesUpdated={(services) => {}} />
      <TouchableOpacity style={styles.settingsButton} onPress={openSettings}>
        <Image
          source={require('../../assets/settings.png')}
          style={styles.settingsIcon}
        />
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
    backgroundColor: '#C4C4C4',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
  settingsButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40, // iOS와 Android 상태바 높이가 다름
    right: 30,
  },
});

export default MyProfileScreen;