import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_PLACES_API_KEY } from '@env';

const MapSelectorScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');   // 검색 쿼리 상태
  const [selectedLocation, setSelectedLocation] = useState(null);   // 선택된 위치 상태
  const [selectedSalonName, setSelectedSalonName] = useState('');
  const [loading, setLoading] = useState(false);    // 로딩 상태
  const [salons, setSalons] = useState([]); // 검색된 헤어샵 목록 상태

  // 헤어샵 검색 처리 함수
  const handleSearchSalon = async () => {
    setLoading(true);   // 로딩 시작
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&key=${GOOGLE_PLACES_API_KEY}`
      );
      const json = await response.json();
      setSalons(json.results);  // 검색 결과를 상태에 저장
    } catch (error) {
      Alert.alert('오류', '헤어샵 검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);    // 로딩 종료
    }
  };

  // 위치 확정 및 저장 처리 함수
  const confirmLocation = () => {
    if (selectedLocation) {
      navigation.navigate('DSignUp', { selectedLocation, salonName: selectedSalonName });
    } else {
      Alert.alert('위치 선택', '헤어샵의 위치를 선택해주세요.');
    }
  };

  // 헤어샵 선택 처리 함수
  const selectSalon = (salon) => {
    setSelectedLocation(salon.geometry.location); // 선택된 헤어샵의 위치 상태 업데이트
    setSelectedSalonName(salon.name);// 선택된 헤어샵의 이름 상태 업데이트
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="검색을 통해 헤어샵을 찾고 선택 후 저장을 해주세요."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="검색" onPress={handleSearchSalon} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <MapView style={styles.map}
       initialRegion={{
        latitude: 36.815220,
        longitude: 127.114396,
        latitudeDelta: 0.06,
        longitudeDelta: 0.06,
      }}>
        {salons.map((salon, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: salon.geometry.location.lat, longitude: salon.geometry.location.lng }}
            title={salon.name}
            onPress={() => selectSalon(salon)}
          />
        ))}
      </MapView>
      <Button title="저장" onPress={confirmLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  map: {
    flex: 1,
  },
});

export default MapSelectorScreen;
