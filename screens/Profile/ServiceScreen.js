// ServiceScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { auth } from '../../config/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebaseConfig';

const ServiceScreen = ({ onServicesUpdated }) => {
  const [services, setServices] = useState({
    커트: [],
    펌: [],
    염색: [],
    클리닉: []
  });

  useEffect(() => {
    // 서비스 정보를 Firestore에서 불러오는 함수
    const fetchServices = async () => {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const docRef = doc(firestore, 'designers', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().services) {
          setServices(docSnap.data().services);
        }
      }
    };
    fetchServices();
  }, []);

  // 새로운 서비스 항목을 추가하는 함수
  const addServiceItem = (category) => {
    setServices({
      ...services,
      [category]: [...services[category], { name: '', price: '' }]
    });
  };

  // 숫자를 콤마 포맷으로 변환하는 함수
  const formatNumber = (number) => {
    const num = parseInt(number, 10);   // 숫자가 1000 이상일 때만 콤마를 추가
    if (num >= 1000) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');    // 숫자를 문자열로 변환하고, 세 자리마다 콤마를 추가
    }
    return number; // 1000 미만일 경우 그대로 반환
  };

  const updateServiceItem = (category, index, field, value) => {
    const formattedValue = field === 'price' ? formatNumber(value.replace(/,/g, '')) : value;   // 가격을 업데이트하는 경우, 콤마를 제거한 후 숫자로 변환
  
    const updatedServices = [...services[category]];
    updatedServices[index] = { ...updatedServices[index], [field]: formattedValue };
    setServices({ ...services, [category]: updatedServices });
  };

  // Firestore에 서비스 정보를 저장하는 함수
  const saveServicesToFirebase = async () => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const designerDocRef = doc(firestore, 'designers', uid);
      try {
        await setDoc(designerDocRef, { services: services }, { merge: true });
        Alert.alert("성공", "프로필 정보가 업데이트 되었습니다.");
      } catch (error) {
        console.error("서비스 정보 저장 오류:", error);
        Alert.alert("오류", "프로필 정보 저장 중 오류가 발생했습니다.");
      }
    } else {
      Alert.alert("오류", "디자이너 정보를 가져올 수 없습니다.");
    }
  };
  

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {Object.entries(services).map(([category, items]) => (
        <View key={category}>
          <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.serviceItem}>
              <TextInput
                style={styles.input}
                placeholder="서비스 이름"
                value={item.name}
                onChangeText={(text) => updateServiceItem(category, index, 'name', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="가격"
                value={item.price}
                onChangeText={(text) => updateServiceItem(category, index, 'price', text)}
              />
            </View>
          ))}
          <Button title={`+ ${category.toUpperCase()} 추가`} onPress={() => addServiceItem(category)} />
        </View>
      ))}
      <Button title="프로필 저장" onPress={saveServicesToFirebase} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 10,
    alignItems: 'flex-start',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginRight: 10,
    padding: 10,
  },
});

export default ServiceScreen;
