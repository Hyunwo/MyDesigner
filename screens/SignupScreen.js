import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignUp = () => {
    // 여기서 이메일과 비밀번호 검증 로직을 추가할 수 있습니다.
    // 예를 들어, 이메일 형식이 맞는지, 비밀번호가 충분히 강력한지 등을 검사할 수 있습니다.

    // 이 예제에서는 간단히 콘솔에 출력만 합니다.
    console.log(`Email: ${email}, Password: ${password}`);
    
    // 실제 애플리케이션에서는 여기서 회원가입 요청을 백엔드 API로 보냅니다.
    // 예:
    // axios.post('/signup', { email, password })
    //   .then(response => {
    //     // 회원가입 성공 처리
    //   })
    //   .catch(error => {
    //     // 오류 처리
    //   });

    // 임시로 회원가입 성공 알림을 띄웁니다.
    Alert.alert('회원가입 성공!', `환영합니다, ${email}!`);
  };

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
      <Button title="회원가입" onPress={handleSignUp} />
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
