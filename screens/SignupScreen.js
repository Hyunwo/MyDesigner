import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState(''); // 이메일과 비밀번호를 위한 상태 변수
  const [password, setPassword] = useState('');

  const handleEmailChange = (text) => { // 이메일 입력 변경 처리 함수
    setEmail(text);
  };

  const handlePasswordChange = (text) => { // 비밀번호 입력 변경 처리 함수
    setPassword(text);
  };
  
  // 회원가입 처리 함수
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword( // Firebase Auth를 사용한 회원가입 시도
          auth,
          email,
          password
      );
      console.log(user);
      Alert.alert('회원가입 성공!', `환영합니다, ${email}!`,); // 회원가입 성공 후 Alert 표시 및 로그인 화면으로 이동
      navigation.navigate('Login');
    } catch (error) { // 회원가입 실패 시 오류 메시지 표시
        console.log(error.message);
        Alert.alert('비밀번호는 6자리 이상 입력해주세요!');
    }
  };

  // UI 렌더링 부분
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <Button title="회원가입" onPress={register} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default SignupScreen;
