import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { firestore } from '../../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import * as Location from 'expo-location';

const HomeScreen = ({ navigation }) => {
  const [designers, setDesigners] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    (async () => {
      // 위치 권한 요청
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      // 현재 위치 얻기
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      fetchDesigners(location.coords);
    })();
  }, []);

  const fetchDesigners = async (coords) => {
    // Firestore에서 디자이너 정보 가져오기
    const querySnapshot = await getDocs(collection(firestore, 'designers'));
    const fetchedDesigners = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      distance: getDistance(coords, doc.data().location), // 거리 추가
    }));

    // 사용자 위치를 기준으로 디자이너 정렬
    fetchedDesigners.sort((a, b) => a.distance - b.distance);
    setDesigners(fetchedDesigners);
  };

  // 두 위치 사이의 거리 계산
  function getDistance(location1, location2) {
    if (!location1 || !location2) return Infinity;
    const radlat1 = Math.PI * location1.latitude / 180;
    const radlat2 = Math.PI * location2.latitude / 180;
    const theta = location1.longitude - location2.longitude;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist * 1.609344; // 킬로미터 단위
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('ReservationMenu', { designerId: item.id })}>
      <View style={styles.textContainer}>
        <Text style={styles.listItemText}>{item.name}</Text>
        <Text style={styles.salonName}>{item.salonName}</Text>
      </View>
      {item.profileImageUrl && (
        <Image
          source={{ uri: item.profileImageUrl }}
          style={styles.profileImage}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyDesigner</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Search')}>
          <Image source={require("../../assets/hairstyle.png")} style={styles.imagebutton} />
          <Text style={styles.text}>디자이너 및 검색</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}  onPress={() => navigation.navigate('Map')}>
          <Image source={require("../../assets/location.png")} style={styles.imagebutton} />
          <Text style={styles.text}>내 근처 디자이너 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyInfo')}>
          <Image source={require("../../assets/my_info.png")} style={styles.imagebutton} />
          <Text style={styles.text}>내정보</Text>
        </TouchableOpacity>
      </View>
      
     {/* 디자이너 리스트를 보여주는 부분 */}
     <FlatList
        data={designers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginVertical: 10,
    marginTop: 45,
    marginLeft: 8,
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
  },
  text: {
    marginTop: 5,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 18,
  }, 
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default HomeScreen;