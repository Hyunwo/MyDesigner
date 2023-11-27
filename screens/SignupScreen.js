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
      navigation.navigate('Login')
    })
    .catch(error => Alert.alert('Error', error.message))
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
