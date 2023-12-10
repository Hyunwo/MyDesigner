import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { firestore } from '../../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const MapScreen = ({navigation}) => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [region, setRegion] = useState(null);
  const [designers, setDesigners] = useState([]);
  const mapRef = useRef(null);

  // 두 지점 사이의 거리를 계산하는 함수
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      0.5 - Math.cos(dLat)/2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      (1 - Math.cos(dLon)) / 2;
  
    return R * 2 * Math.asin(Math.sqrt(a));
  }

  // 위치 권한 요청 및 현재 위치 설정
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('위치 접근에 실패했습니다.');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      setInitialRegionAndRegion(location.coords);
      fetchDesigners();
    })();
  }, []);

  // 초기 지역과 지도 지역 설정 함수
  const setInitialRegionAndRegion = (coords) => {
    const newRegion = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.027,
      longitudeDelta: 0.027,
    };
    setInitialRegion(newRegion);
    setRegion(newRegion);
  };
  
  // Firestore에서 디자이너 목록 가져오기
  const fetchDesigners = async () => {
    if (!initialRegion) return;

    try {
      const querySnapshot = await getDocs(collection(firestore, 'designers'));
      const fetchedDesigners = [];
      querySnapshot.forEach((doc) => {
        const designer = { id: doc.id, ...doc.data() };
        const distance = getDistance(
          initialRegion.latitude,
          initialRegion.longitude,
          designer.location.lat,
          designer.location.lng
        );
        if (distance <= 5) {  // 5km
          fetchedDesigners.push(designer);
        }
      });
      setDesigners(fetchedDesigners);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch designers: " + error.message);
    }
  };
  
  // useEffect 안에서 호출
  useEffect(() => {
    if (initialRegion) {
      fetchDesigners();
    }
  }, [initialRegion]);

  // 마커 클릭 시 선택된 디자이너 설정
  const onMarkerPress = (designer) => {
    setSelectedDesigner(designer); // 선택된 디자이너 정보를 상태에 저장
  };

  // 예약 버튼 클릭 처리
  const onBookPress = () => {
    if (selectedDesigner) {
      navigation.navigate('ReservationMenu', {
        designerId: selectedDesigner.id, // 디자이너 ID 전달
      });
    }
  };

  // 지도의 현재 지역 기반으로 디자이너 재검색
  const fetchDesignersInRegion = async (newRegion) => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'designers'));
      const fetchedDesigners = [];
      querySnapshot.forEach((doc) => {
        const designer = { id: doc.id, ...doc.data() };
        const distance = getDistance(
          newRegion.latitude,
          newRegion.longitude,
          designer.location.lat,
          designer.location.lng
        );
        if (distance <= 5) { // 5km 범위로 필터링
          fetchedDesigners.push(designer);
        }
      });
      setDesigners(fetchedDesigners);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch designers: " + error.message);
    }
  };

  // 현재 위치로 지도를 이동시키는 함수
  const goToInitialLocation = () => {
    mapRef.current.animateToRegion(initialRegion, 1000); // 1000ms 동안 애니메이션을 수행하며 초기 위치로 이동
  };

  // 이 지역 재검색 버튼 클릭 시 실행되는 함수
  const searchInThisArea = () => {
    if (mapRef.current && region) {
      mapRef.current.getCamera().then(camera => {
        const newRegion = {
          latitude: camera.center.latitude,
          longitude: camera.center.longitude,
          latitudeDelta: camera.latitudeDelta,
          longitudeDelta: camera.longitudeDelta,
        };
        setRegion(newRegion);
        fetchDesignersInRegion(newRegion);
      });
    }
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
          {/* 디자이너들의 위치를 표시하는 마커 */}
          {designers.map((designer, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: designer.location.lat,
                longitude: designer.location.lng,
              }}
              title={`${designer.name} - ${designer.salonName}`}
              onPress={() => onMarkerPress(designer)}
            />
          ))}
        </MapView>
      )}
      {/* 현재 위치로 돌아가는 버튼 */}
      <TouchableOpacity style={styles.myLocationButton} onPress={goToInitialLocation}>
        <Image
          source={require('../../assets/maplocation.png')}
          style={styles.myLocationIcon}
        />
      </TouchableOpacity>
      <View style={styles.searchAreaButtonContainer}>
        <TouchableOpacity style={styles.searchAreaButton} onPress={searchInThisArea}>
          <Text>이 지역 재검색</Text>
        </TouchableOpacity>
      </View>
      {selectedDesigner && (
        <TouchableOpacity style={styles.bookButton} onPress={onBookPress}>
          <Text style={styles.bookButtonText}>예약하기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

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
  bookButton: {
    position: 'absolute',
    bottom: '10%',
    left: '55%', // 버튼 위치 조정
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
  },
  bookButtonText: {
    color: 'white',
  },
});

export default MapScreen;