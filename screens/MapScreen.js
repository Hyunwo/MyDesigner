import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GOOGLE_PLACES_API_KEY } from '@env';

const MapScreen = () => {
  const [initialRegion, setInitialRegion] = useState(null); // 초기 위치 상태
  const [region, setRegion] = useState(null); // 지도의 현재 지역 상태
  const [salons, setSalons] = useState([]); // 미용실 목록 상태
  const mapRef = useRef(null); // 지도의 ref를 생성

  // 위치 권한을 요청하고 현재 위치를 가져옵니다.
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.027,
        longitudeDelta: 0.027,
      };
      setInitialRegion(newRegion); // 초기 위치를 설정
      setRegion(newRegion); // 지도의 현재 지역 상태를 설정

      // 초기 위치를 기반으로 미용실을 검색
      fetchSalons(newRegion.latitude, newRegion.longitude);
    })();
  }, []);

  const fetchSalons = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=beauty_salon&key=${GOOGLE_PLACES_API_KEY}`
      );
      const json = await response.json();
      setSalons(json.results); // 미용실 데이터를 상태에 저장
    } catch (error) {
      Alert.alert("Error", "Unable to fetch salons: " + error.message);
    }
  };

  const searchInThisArea = () => {
    if (mapRef.current) {
      mapRef.current.getCamera().then(camera => {
        const newRegion = {
          latitude: camera.center.latitude,
          longitude: camera.center.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
        };
        setRegion(newRegion); // 지도의 현재 지역 상태를 업데이트하지만 초기 현위치는 변경하지 않음
        fetchSalons(newRegion.latitude, newRegion.longitude);
      });
    }
  };

  // 현재 위치로 지도를 이동시키는 함수
  const goToInitialLocation = () => {
    mapRef.current.animateToRegion(initialRegion, 1000); // 1000ms 동안 애니메이션을 수행하며 초기 위치로 이동
  };

  // 지도와 마커를 렌더링하는 UI 부분
  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView ref={mapRef} style={styles.map} region={region} >
          {/* 초기 위치를 표시하는 마커 */}
          <Marker
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
            title="내 위치"
            pinColor="#0075FF"
          />
          {/* 주변 미용실의 위치를 표시하는 마커 */}
          {salons.map((salon, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: salon.geometry.location.lat,
                longitude: salon.geometry.location.lng,
              }}
              title={salon.name}
            />
          ))}
        </MapView>
      )}
      {/* 현재 위치로 돌아가는 버튼 */}
      <TouchableOpacity style={styles.myLocationButton} onPress={goToInitialLocation}>
        <Image
          source={require('../assets/maplocation.png')}
          style={styles.myLocationIcon}
        />
      </TouchableOpacity>
      <View style={styles.searchAreaButtonContainer}>
        <TouchableOpacity style={styles.searchAreaButton} onPress={searchInThisArea}>
          <Text>이 지역 재검색</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject, // 지도를 전체 화면으로 채움
  },
  searchAreaButtonContainer: {
    position: 'absolute',
    top: '7%',
    alignSelf: 'center',
  },
  searchAreaButton: {
    position: 'absolute',
    bottom: '10%',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  myLocationButton: {
    position: 'absolute',
    bottom: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  myLocationIcon: { // 아이콘 크기 조정
    width: 30,
    height: 30,
  },

});

export default MapScreen;