import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>MyDesigner</Text>

      <TouchableOpacity
        style={[styles.button, styles.firstButton]}
        onPress={() => navigation.navigate('Who')}
      >
        <Text style={styles.buttonText}>WhoScreen</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>고객</Text>
      </TouchableOpacity> */}
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
  button: {
    height: 50,
    width: '60%', // 버튼 길이 조정
    backgroundColor: 'white',
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
    color: '#007AFF',
    fontSize: 18,
  },
});

export default MainScreen