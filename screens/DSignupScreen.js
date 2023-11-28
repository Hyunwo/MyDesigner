import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

import { auth } from '../config/firebaseConfig';
import { signInWithPhoneNumber } from 'firebase/auth';

const DSignupScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleSendCode = async () => {
    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber);
      setConfirmationResult(result);
    } catch (error) {
      Alert.alert("Error", "Failed to send verification code: " + error.message);
    }
  };

  const handleVerifyCode = async () => {
    if (!confirmationResult) {
      Alert.alert("Error", "Please request code first.");
      return;
    }
  
    try {
      const credential = await confirmationResult.confirm(code);
      // 인증 성공, Firestore에 사용자 정보 저장
      // 예: const firestoreRef = doc(firestore, 'designers', credential.user.uid);
      //     await setDoc(firestoreRef, { /* 사용자 정보 */ });
      Alert.alert("Success", "Phone number verified!");
    } catch (error) {
      Alert.alert("Error", "Failed to verify code: " + error.message);
    }
  };
  
  // 렌더링 코드
  return (
    <View>
      {/* 전화번호 입력 필드, 'Send Code' 버튼 */}
      <TextInput value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" />
      <Button title="Send Code" onPress={handleSendCode} />
  
      {/* 인증 코드 입력 필드, 'Verify Code' 버튼 */}
      <TextInput value={code} onChangeText={setCode} placeholder="Verification Code" />
      <Button title="Verify Code" onPress={handleVerifyCode} />
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

export default DSignupScreen;