import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const DLoginScreen = ({navigation}) => {
  const [region, setRegion] = useState('');
  const [shopName, setShopName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = () => {
    // 입력 받은 데이터로 로그인 로직 구현
    // 예: 서버로 요청을 보내거나, Firebase 등의 서비스를 사용하여 인증
    authenticateUser(region, shopName, phoneNumber).then(isAuthenticated => {
        if (isAuthenticated) {
            navigation.navigate('Home');
          } else {
            Alert.alert('로그인 실패', '제공된 자격증명이 유효하지 않습니다.');
          }
        });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>디자이너 로그인</Text>
      <TextInput
        style={styles.input}
        value={region}
        onChangeText={setRegion}
        placeholder="지역"
      />
      <TextInput
        style={styles.input}
        value={shopName}
        onChangeText={setShopName}
        placeholder="샵 이름"
      />
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="전화번호"
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginTop: 10,
    padding: 10,
    fontSize: 16,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default DLoginScreen;
