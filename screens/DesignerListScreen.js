import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { firestore } from '../config/firebaseConfig'; // Firestore 설정 파일
import { collection, getDocs } from 'firebase/firestore';
import * as Location from 'expo-location';

const DesignerListScreen = ({ navigation }) => {
  const [designers, setDesigners] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // 현재 위치를 가져오기
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        console.log('Current location:', location.coords); // 현재 위치 로깅
        setCurrentLocation(location.coords);
  
        // Firestore에서 디자이너 정보 가져오기
        const fetchDesigners = async () => {
          const querySnapshot = await getDocs(collection(firestore, 'designers'));
          const fetchedDesigners = [];
          querySnapshot.forEach((doc) => {
            fetchedDesigners.push({ id: doc.id, ...doc.data() });
          });
          console.log('Fetched designers:', fetchedDesigners); // 가져온 디자이너 목록 로깅
          // 사용자 위치를 기준으로 디자이너 정렬
          fetchedDesigners.sort((a, b) => {
            const distanceA = getDistance(location.coords, a.location);
            const distanceB = getDistance(location.coords, b.location);
            return distanceA - distanceB;
          });
          console.log('Sorted designers:', fetchedDesigners); // 정렬된 디자이너 목록 로깅
          setDesigners(fetchedDesigners);
        };
  
        fetchDesigners();
    })();
  }, []);

  // 사용자 위치를 기준으로 디자이너 정렬
  const sortedDesigners = designers.sort((a, b) => {
    const distanceA = getDistance(currentLocation, a.location);
    const distanceB = getDistance(currentLocation, b.location);
    return distanceA - distanceB;
  });

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
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DesignerDetails', { designerId: item.id })}>
      {item.profilePicture && <Image source={{ uri: item.profilePicture }} style={styles.image} />}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.salonName}>{item.salonName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedDesigners}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  salonName: {
    fontSize: 16,
  },
});

export default DesignerListScreen;
