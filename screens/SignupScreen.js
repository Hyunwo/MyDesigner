import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, firestore } from '../config/firebaseConfig'

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState(''); // 이메일과 비밀번호,이름을 위한 상태 변수
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = () => {
    // 입력 유효성 검사
    if (!name) {
      Alert.alert("Error", "이름을 입력해 주세요.");
      return;
    }
    if (!email) {
      Alert.alert("Error", "이메일을 입력해주세요.");
      return;
    }
    if (!password) {
      Alert.alert("Error", "비밀번호를 입력해주세요.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      if (userCredentials && userCredentials.user){
        // Firebase에 사용자 정보 저장
        const user = userCredentials.user;
        return setDoc(doc(firestore, 'users', user.uid), {
          email: email,
          name: name,
        })
      } else {
        throw new Error('userCredentials are not available')
      }
    })
    .then(() => {
      Alert.alert('회원가입이 완료되었습니다!');
      navigation.navigate('로그인')
    })
    .catch(error => {
      let errorMessage;
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = "이미 사용 중인 이메일입니다.";
            break;
          case 'auth/invalid-email':
            errorMessage = "올바르지 않은 이메일 형식입니다.";
            break;
          case 'auth/operation-not-allowed':
            errorMessage = "이메일 및 비밀번호로 로그인이 비활성화되어 있습니다.";
            break;
          case 'auth/weak-password':
            errorMessage = "비밀번호는 6자리 이상으로 입력해 주세요.";
            break;
          default:
            errorMessage = "회원가입 중 오류가 발생했습니다. 다시 시도해주세요";
      }
      Alert.alert('Error', errorMessage)
    })
    
  }

  // UI 렌더링 부분
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="회원가입" onPress={handleSignup} />
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
