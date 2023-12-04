import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Picker } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, firestore } from '../config/firebaseConfig'

const regions = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

const DSignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
  const [shopName, setShopName] = useState('');

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, name, email, password, gender, phone, region, shopName)
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
      <Picker
        selectedValue={region}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}
      >
        {regions.map((regionItem, index) => (
          <Picker.Item key={index} label={regionItem} value={regionItem} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="샵 이름"
        value={shopName}
        onChangeText={setShopName}
      />
      <Button title="회원가입" onPress={handleSignup} />
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
});

export default DSignupScreen;
