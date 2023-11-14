import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const LoginScreen = ({navigation}) => {
  const [loginEmail, setLoginEmail] = useState(""); // 로그인 이메일과 비밀번호를 위한 상태 변수 선언
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({}); // 현재 로그인한 사용자 정보를 저장하기 위한 상태 변수

  // 컴포넌트가 마운트될 때, Firebase 인증 상태 변경 감지 리스너 설정
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigation.navigate('Home'); // 사용자가 로그인한 상태인 경우, HomeScreen으로 이동
      }
    });
    return unsubscribe; // 컴포넌트 언마운트 시 실행될 함수
  }, [navigation]);

  // 로그인 처리 함수
  const login = async () => {
    try {
      // Firebase Auth를 사용한 이메일/비밀번호 인증 시도
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      navigation.navigate('Home'); // 로그인 성공 시, Home 화면으로 이동
    } catch (error) {
      console.log(error.message); // 로그인 실패 시, 오류 메시지 출력
      Alert.alert("이메일 또는 비밀번호를 확인해 주세요.")
    }
  };

  // UI 렌더링 부분
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="아이디를 입력해 주세요"
        keyboardType="email-address"
        onChangeText={(text) => {
          setLoginEmail(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력해 주세요"
        secureTextEntry
        onChangeText={(text) => {
          setLoginPassword(text);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('SignUp')}>
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

export default LoginScreen;
