import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const DesignerProfileScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(null);
  const [salonName, setSalonName] = useState('');
  
  // 위치 정보를 받아오기 위한 useEffect
  useEffect(() => {
    if (route.params?.selectedLocation) {
      setLocation(route.params.selectedLocation);
    }
    if (route.params?.salonName) {
      setSalonName(route.params.salonName);
    }
  }, [route.params]);

  const handleSaveProfile = async () => {

    if (!name || !email || !password || !gender || !phone || !salonName) {
      Alert.alert('오류', '모든 필드를 채워주세요.');
      return;
    }

    try {
      // Firebase Authentication을 사용하여 사용자를 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Firestore에 디자이너 프로필 저장
      const designerDocRef = doc(firestore, 'designers', user.uid);
      await setDoc(designerDocRef, {
        name,
        email,
        gender,
        phone,
        location,
        salonName
      });
      Alert.alert('회원가입 완료', '프로필이 성공적으로 저장되었습니다.');
      navigation.goBack();
    } catch (error) {
      console.error('프로필 저장 오류:', error);
      Alert.alert('오류', '프로필 저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
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
        placeholder="성별(남, 여)"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="휴대폰 번호('-'제외)"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="지도에서 헤어샵을 찾아주세요."
        value={salonName}
        editable={false}
      />
      <Button title="지도에서 선택" onPress={() => navigation.navigate('MapSelector', { setLocation, setSalonName })} />
      <View style={{ marginVertical: 10 }} />
      <Button title="저장" onPress={handleSaveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  
});

export default DesignerProfileScreen;
