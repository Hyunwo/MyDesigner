import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const settingsOptions = [
  { key: 'account', title: '계정' },
  { key: 'notifications', title: '알림' },
  { key: 'privacy', title: '개인정보 및 보안' },
  { key: 'logout', title: '로그아웃' },
  { key: 'secession', title: '회원탈퇴' },
  // ... 기타 설정 옵션들
];

const SettingsScreen = ({ navigation }) => {
  const handleSettingsOption = (key) => {
    switch (key) {
      case 'logout':
        // 로그아웃 처리 로직 구현. 예: 인증 토큰을 삭제하거나 상태를 업데이트합니다.
        Alert.alert(
          '로그아웃',
          '정말로 로그아웃 하시겠습니까?',
          [
            { text: '취소', style: 'cancel'},
            { text: '로그아웃', onPress: () => navigation.navigate('Main')},
          ],
          { cancelable: false},
        );
        break;
      case 'secession':
        Alert.alert(
          '회원탈퇴',
          '정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
          [
            { text: '취소', style: 'cancel' },
            { text: '탈퇴', onPress: () => handleUserSecession() },
          ],
          { cancelable: false},
        );
      // 다른 키에 대한 처리 로직 추가
      default:
        // 기본적으로 설정 항목의 key와 동일한 이름의 화면으로 네비게이션합니다.
        navigation.navigate(key);
        break;
    }
  };

  const handleUserSecession = () => {
    // 여기 회원탈퇴 로직 구현
    // 예를 들어, Firebase auth에서 사용자를 삭제하거나, 서버에 탈퇴 요청을 보냅니다.
    
    // 로그인 정보 삭제 및 탈퇴 처리 후 메인 화면으로 네비게이션
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main'}],
    });
  };

  const renderSettingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate(item.key)}
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
