import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>MyDesigner</Text>

      <Image
        source={require('../assets/s.png')}
        style={styles.logo}
      />

      <TouchableOpacity
        style={[styles.button, styles.firstButton]}
        onPress={() => navigation.navigate('Who')}
      >
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    marginBottom: 30, // 헤더와 버튼 사이 간격 조정
  },
  logo: {
    width: 100, // 원하는 크기로 조정
    height: 100, // 원하는 크기로 조정
    resizeMode: 'contain', // 이미지가 컨테이너에 맞도록 조정
    marginBottom: 20, // 헤더와 이미지 사이 간격 조정
  },
  button: {
    height: 50,
    width: '60%', // 버튼 길이 조정
    backgroundColor: 'skyblue',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // 버튼 간 간격 조정
  },
  firstButton: {
    marginTop: 0, // 첫 번째 버튼의 상단 마진을 없애기
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
});

export default MainScreen
