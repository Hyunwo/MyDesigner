import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyDesigner</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={require("../assets/hairstyle.png")} style={styles.imagebutton} />
          <Text style={styles.text}>디자이너 및 검색</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={require("../assets/location.png")} style={styles.imagebutton} />
          <Text style={styles.text}>내 근처 디자이너 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={require("../assets/event.png")} style={styles.imagebutton} />
          <Text style={styles.text}>이벤트</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyInfo')}>
        <Text style={styles.buttonText}>내정보</Text>
      </TouchableOpacity>
    </View>
    // 추가적으로 하단 탭 바 네비게이션을 표시하는 컴포넌트가 필요할 것입니다.
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  menuItem: {
    alignItems: 'center',
  },
  imagebutton: {
    width: 60,
    height: 60,
    // 이미지의 스타일링은 필요에 맞게 조정
  },
  text: {
    marginTop: 5,
  },
  button: {
    height: 50,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default HomeScreen;
