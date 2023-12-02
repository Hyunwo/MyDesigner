import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, firestore } from '../config/firebaseConfig'

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');
  const [region, setRegion] = useState('');

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
      Alert.alert("Error", "비밃번호를 입력해주세요.");
      return;
    }
    if (!gender) {
      Alert.alert("Error", "성별을 입력해주세요.");
      return;
    }
    if (!phone) {
      Alert.alert("Error", "휴대폰번호를 입력해주세요.");
      return;
    }
    if (!region) {
      Alert.alert("Error", "근무지역을 입력해주세요.");
      return;
    }
    if (!shopName) {
      Alert.alert("Error", "샵이름을 입력해주세요.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        if (userCredentials && userCredentials.user) {
          const user = userCredentials.user;
          return setDoc(doc(firestore, 'designers', user.uid), {
            name,
            email,
            gender,
            phone,
            region,
            shopName,
          });
        } else {
          throw new Error('User credentials are not available');
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView>
        <View style={styles.innerContainer}>
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
            <TextInput
              style={styles.input}
              placeholder="성별"
              value={gender}
              onChangeText={setGender}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="연락처('-'없이 입력해주세요.)"
              value={phone}
              onChangeText={setPhone}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="근무지역"
              value={region}
              onChangeText={setRegion}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="샵이름"
              value={shopName}
              onChangeText={setShopName}
              autoCapitalize="none"
            />
            <Button title="회원가입" onPress={handleSignup} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
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
