import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Picker, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, firestore } from '../config/firebaseConfig'

const DSignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneAuth, setPhoneAuth] = useState('');
  const [region, setRegion] = useState('');
  const [shopName, setShopName] = useState('');

  const handleSignup = () => {
    createUserWithEmailAndPassword(name, gender, phone, phoneAuth, region, shopName)
    .then((userCredentials) => {
      if (userCredentials && userCredentials.user){
        // Firebase에 사용자 정보 저장
        const user = userCredentials.user;
        return setDoc(doc(firestore, 'users', user.uid), {
          email: email,
        })
      } else {
        throw new Error('userCredentials are not available')
      }
    })
    .then(() => {
      Alert.alert('회원가입이 완료되었습니다!');
      navigation.navigate('DLogin')
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
      />
      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
      >
        <Picker.Item label="남성" value="male" />
        <Picker.Item label="여성" value="female" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="전화번호"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="전화번호 인증"
        value={phoneAuth}
        onChangeText={setPhoneAuth}
      />
      <TextInput
        style={styles.input}
        placeholder="지역 선택"
        value={region}
        onChangeText={setRegion}
      />
      <TextInput
        style={styles.input}
        placeholder="샵 이름"
        value={shopName}
        onChangeText={setShopName}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default DSignupScreen;