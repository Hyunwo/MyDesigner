import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../config/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';

const DLoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(""); // 로그인 이메일과 비밀번호를 위한 상태 변수 선언
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 입력 검증
    if (!email.includes('@')) {
      Alert.alert('Error', '올바른 이메일 주소를 입력해주세요!')
      return
    }

    if (password.length < 6) {
      Alert.alert('Error', '비밀번호는 6자 이상입니다.')
      return
    }

    // Firebase Authentication으로 로그인
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigation.navigate('DHome')
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-login-credentials' || error.code ==='auth/user-not-found') {
        Alert.alert('Error', '이메일과 비밀번호를 다시 확인해주세요!')
      } else{
        Alert.alert('Error', error.message)
      }
    })
  }

  // UI 렌더링 부분
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="아이디를 입력해 주세요"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력해 주세요"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F6F6F6',
    borderWidth: 0,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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
