import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GOOGLE_PLACES_API_KEY } from '@env';

const MapScreen = () => {
  const [region, setRegion] = useState(null); // 지도의 현재 지역 상태
  const [salons, setSalons] = useState([]); // 미용실 목록 상태

  // 컴포넌트가 마운트될 때 위치 권한을 요청하고 현재 위치를 가져옵니다.
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.027,
        longitudeDelta: 0.027,
      });
  
      // 사용자의 현재 위치를 기반으로 미용실을 검색
      fetchSalons(location.coords.latitude, location.coords.longitude);
    })();
  }, []);
  
  const fetchSalons = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=beauty_salon&key=${GOOGLE_PLACES_API_KEY}`
      );
      const json = await response.json();
      //console.log(json); // 콘솔에 결과 출력
      //console.log(`Your API Key is: ${GOOGLE_PLACES_API_KEY}`);
      
      setSalons(json.results); // 미용실 데이터를 상태에 저장
    } catch (error) {
      Alert.alert("Error", "Unable to fetch salons: " + error.message);
    }
  };

  // 지도와 마커를 렌더링하는 UI 부분
  return (
    <View style={styles.container}>
      {region && (
        <MapView style={styles.map} region={region}>
        {/* 사용자의 현재 위치를 표시하는 마커 */}
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          title="내 위치"
        />
        {/* 주변 미용실의 위치를 표시하는 마커 */}
        {salons.map((salon, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: salon.geometry.location.lat, longitude: salon.geometry.location.lng }}
            title={salon.name}
          />
        ))}
      </MapView>
      )}
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
});

export default MapScreen;