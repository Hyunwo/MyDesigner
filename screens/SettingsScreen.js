import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';

import { auth } from '../config/firebaseConfig';
import { signOut } from 'firebase/auth';
import { firestore } from '../config/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';

const settingsOptions = [
  { key: 'account', title: '계정' },
  { key: 'notifications', title: '알림' },
  { key: 'privacy', title: '개인정보 및 보안' },
  { key: 'logout', title: '로그아웃' },
  { key: 'secession', title: '회원탈퇴' },
];

const SettingsScreen = ({ navigation }) => {
  // 로그아웃 처리
  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '로그아웃', onPress: () => {
          signOut(auth).then(() => {
            navigation.navigate('MyDesisgner');
          }).catch(error => {
            Alert.alert('Error', error.message);
          });
        }},
      ],
      { cancelable: false },
    );
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      '회원탈퇴',
      '정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
      [
        { text: '취소', style: 'cancel' },
        { text: '탈퇴', onPress: async () => {
          const userRef = doc(firestore, 'users', auth.currentUser.uid);
          await auth.currentUser.delete(); // 사용자 먼저 삭제
          await deleteDoc(userRef); // 그 다음 Firestore 문서 삭제
          navigation.navigate('MyDesisgner');
        }},
      ],
      { cancelable: false },
    );
  };

  const handleSettingsOption = (key) => {
    switch (key) {
      case 'logout':
        handleLogout();
        break;
      case 'secession':
        handleDeleteAccount();
        break;
      default:
        navigation.navigate(key);
        break;
    }
  };
    
  const renderSettingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleSettingsOption(item.key)}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsOptions}
        renderItem={renderSettingItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 18,
  },
});

export default SettingsScreen;