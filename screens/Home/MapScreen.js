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


  // 위치 권한을 요청하고 현재 위치를 가져옵니다.
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      setInitialRegionAndRegion(location.coords);
      fetchDesigners();
    })();
  }, []);

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
  

  const fetchDesigners = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'designers'));
      const fetchedDesigners = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDesigners(fetchedDesigners); // 디자이너 데이터를 상태에 저장
    } catch (error) {
      Alert.alert("Error", "Unable to fetch designers: " + error.message);
    }
  };

  const onMarkerPress = (designer) => {
    setSelectedDesigner(designer); // 선택된 디자이너 정보를 상태에 저장
  };

  const onBookPress = () => {
    if (selectedDesigner) {
      navigation.navigate('ReservationMenu', {
        designerId: selectedDesigner.id, // 디자이너 ID 전달
      });
    }
  };

  const searchInThisArea = () => {
    if (mapRef.current) {
      mapRef.current.getCamera().then(camera => {
        // 현재 지도의 뷰포트를 사용하여 새로운 지역 설정
        const newRegion = {
          latitude: camera.center.latitude,
          longitude: camera.center.longitude,
          latitudeDelta: camera.latitudeDelta,
          longitudeDelta: camera.longitudeDelta,
        };
        setRegion(newRegion); // 지도의 현재 지역 상태를 업데이트
        fetchDesignersInRegion(newRegion); // 해당 지역 내의 디자이너들을 다시 불러옴
      });
    }
  };

  const fetchDesignersInRegion = async (region) => {
    try {
      // Firestore에서 디자이너 정보를 불러오는 로직
      // 필요에 따라 지역 기반으로 디자이너 목록을 필터링하는 로직 추가
      const querySnapshot = await getDocs(collection(firestore, 'designers'));
      const fetchedDesigners = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDesigners(fetchedDesigners);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch designers: " + error.message);
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