import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const WhoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.header}>디자이너인지 고객인지 선택해주세요!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DLogin')}>
        <Text style={styles.text}>디자이너</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>고객</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 22,
    marginBottom: 30, // 헤더와 버튼 사이 간격 조정
  },
  button: {
    width: '60%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  text: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WhoScreen;