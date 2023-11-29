import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const DLoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = () => {
    // 입력 받은 데이터로 로그인 로직 구현
    // 예: 서버로 요청을 보내거나, Firebase 등의 서비스를 사용하여 인증
    authenticateUser(phoneNumber).then(isAuthenticated => {
        if (isAuthenticated) {
            navigation.navigate('DHome');
          } else {
            Alert.alert('오류', '유효한 전화번호를 입력하세요.');
          }
        });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="전화번호"
        keyboardType="phone-pad"
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('DSignUp')}>
        <Text>MyDesigner가 처음이시라면, 회원가입이 필요해요.</Text>
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
    backgroundColor: 'white',
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
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
  footerButton: {
    marginTop: 20,
    color: 'gray',
  },
});

export default DLoginScreen;
