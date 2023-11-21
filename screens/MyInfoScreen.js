import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const MyInfoScreen = () => {
  const [photo, setPhoto] = useState(null);

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setPhoto(response.uri);
      }
    });
  };

  // 설정 버튼 클릭 이벤트 핸들러
  const onSettingsPress = () => {
    console.log('설정 버튼 클릭됨');
    navigation.navigate('Settings');
  };

  // 프로필 수정 버튼 클릭 이벤트 핸들러
  const onEditProfilePress = () => {
    console.log('프로필 수정하기');
    // 여기에 프로필 수정 로직을 구현하세요.
  };

  // 연락 내역 버튼 클릭 이벤트 핸들러
  const onContactHistoryPress = () => {
    console.log('예약 내역 보기');
    navigation.navigate('ReservationList');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/profile.png")} // 프로필 이미지 파일 경로를 입력하세요
          style={styles.profilePic}
        />
        <Text style={styles.userName}>김철수</Text>
        <TouchableOpacity onPress={onEditProfilePress}>
          <Text style={styles.editProfile}>프로필 수정</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.button} onPress={onContactHistoryPress}>
          <Text style={styles.buttonText}>예약 내역</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.settingsButton} onPress={onSettingsPress}>
        <Image
          source={require('../assets/settings.png')}
          style={styles.settingsIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight, // 상태바 높이에 맞춰서 Padding을 추가합니다.
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eaeaea',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editProfile: {
    fontSize: 16,
    color: '#2e64e5',
    marginTop: 5,
  },
  infoContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#eaeaea',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
  settingsButton: {
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 10, // 상태바 높이에 맞춰서 위치를 조정합니다.
    right: 10,
    padding: 10,
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
});

export default MyInfoScreen;
