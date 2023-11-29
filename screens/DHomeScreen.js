import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

const DHomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyDesigner</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('')}
        >
          <Image source={require("../assets/hairstyle.png")} style={styles.imagebutton} />
          <Text style={styles.text}>고객 리스트</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('')}
        >
          <Image source={require("../assets/location.png")} style={styles.imagebutton} />
          <Text style={styles.text}>예약 내역 확인</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('MyInfo')}
        >
          <Image source={require("../assets/info.png")} style={styles.imagebutton} />
          <Text style={styles.text}>내 프로필</Text>
        </TouchableOpacity>
      </View>
    </View>
    // 추가적으로 하단 탭 바 네비게이션을 표시하는 컴포넌트가 필요할 것.
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
});

export default DHomeScreen;
