import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import { GOOGLE_PLACES_API_KEY } from '@env';

const HomeScreen = ({ navigation }) => {
  const [salons, setSalons] = useState([]); // 매장 리스트 상태

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
      fetchNearbySalons(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchNearbySalons = async (latitude, longitude) => {
    try{
      // Google Places API를 사용하여 주변 매장 정보 검색
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=beauty_salon&key=${GOOGLE_PLACES_API_KEY}`
      );
      const json = await response.json();

      const salonsWithPhotos = json.results.map(salon => {
        const photoReference = salon.photos && salon.photos.length > 0 ? salon.photos[0].photo_reference : null;
        const photoUrl = photoReference 
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`
          : null;

        return { ...salon, photoReference, photoUrl };
      });
      setSalons(salonsWithPhotos);
    } catch (error) {
      console.error("Error fetching nearby salons:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Details', { salon: item })}>
      {item.photoUrl && <Image source={{ uri: item.photoUrl }} style={styles.salonImage} />}
      <Text style={styles.listItemText}>{item.name}</Text>
      <Text>{item.vicinity}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyDesigner</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={require("../assets/hairstyle.png")} style={styles.imagebutton} />
          <Text style={styles.text}>디자이너 및 검색</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}  onPress={() => navigation.navigate('Map')}>
          <Image source={require("../assets/location.png")} style={styles.imagebutton} />
          <Text style={styles.text}>내 근처 디자이너 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ReservationMenu')}>
          <Image source={require("../assets/event.png")} style={styles.imagebutton} />
          <Text style={styles.text}>이벤트</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('DesignerList')}>
          <Image source={require("../assets/event.png")} style={styles.imagebutton} />
          <Text style={styles.text}>디자이너</Text>
        </TouchableOpacity>
      </View>
      
     {/* 매장 리스트를 보여주는 부분 */}
     <FlatList
        data={salons}
        keyExtractor={(item) => item.place_id}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyInfo')}>
        <Text style={styles.buttonText}>내정보</Text>
      </TouchableOpacity>
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
  },
  // searchInput: {
  //   height: 40,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   padding: 10,
  //   marginVertical: 10,
  // },
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
  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  listItemText: {
    fontSize: 18,
  },
  salonImage: {
    width: '100%',
    height: 200,
  },
});

export default HomeScreen;