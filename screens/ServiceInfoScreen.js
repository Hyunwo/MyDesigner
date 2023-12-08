// StudentCutScreen -> ServiceInfoScreen
// ServiceInfoScreen 컴포넌트: 디자이너의 서비스 정보를 보여주는 화면
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firestore } from '../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const ServiceInfoScreen = ({ route, navigation }) => {
  // 서비스 상세 정보를 담을 상태
  const [serviceDetails, setServiceDetails] = useState({
    serviceName: '',
    price: '',
    salonName: '',
    designerName: '',
    designerProfileUrl: '',
  });

  // 좋아요 수를 담을 상태
  const [likes, setLikes] = useState(0);

  // 파라미터로 전달된 디자이너 ID와 서비스 인덱스
  const { designerId, selectedCategory, serviceIndex } = route.params;

  // 컴포넌트가 마운트될 때 Firestore에서 서비스 정보를 가져옴
  useEffect(() => {
    const getServiceDetails = async () => {
      try {
        const designerDocRef = doc(firestore, `designers/${designerId}`);
        const designerDocSnap = await getDoc(designerDocRef);

        if (designerDocSnap.exists()) {
          const designerData = designerDocSnap.data();
          const servicesArray = designerData.services[selectedCategory];
          if (servicesArray && serviceIndex < servicesArray.length) {
            const selectedService = servicesArray[serviceIndex];
            if (selectedService) {
              // 서비스 정보를 상태에 저장
              setServiceDetails({
                serviceName: selectedService.name,
                price: selectedService.price,
                salonName: designerData.salonName,
                designerName: designerData.name,
                designerProfileUrl: designerData.profileImageUrl,
              });
            }
          }
        }
      } catch (error) {
        console.error("서비스 정보를 가져오는 중 오류 발생:", error);
      }
    };
    
    getServiceDetails();
  }, [designerId, selectedCategory, serviceIndex]);

  // 예약 버튼 클릭 핸들러
  const onBookingPress = () => {
    // 예약 화면으로 파라미터 전달
    navigation.navigate('DateReservation', {
      designerProfileUrl: serviceDetails.designerProfileUrl,
      designerName: serviceDetails.designerName,
      selectedCategory: selectedCategory,
      serviceIndex: serviceIndex,
      serviceName: serviceDetails.serviceName,
      servicePrice: serviceDetails.price,
      salonName: serviceDetails.salonName,
      designerId: designerId,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* 좋아요 및 공유 아이콘 */}
      <View style={styles.header}>
        <Ionicons name="heart-outline" size={24} color="black" onPress={() => setLikes(prevLikes => prevLikes + 1)} />
        <Text style={styles.likes}>{likes}</Text>
        <Ionicons name="share-social-outline" size={24} color="black" />
      </View>

      {/* 서비스 정보 */}
      <Text style={styles.serviceTitle}>{serviceDetails.serviceName}</Text>
      <Text style={styles.price}>{serviceDetails.price}</Text>
      <Text style={styles.salonName}>@{serviceDetails.salonName}</Text>

      {/* 예약 버튼 */}
      <TouchableOpacity style={styles.bookingButton} onPress={onBookingPress}>
        <Text style={styles.bookingButtonText}>예약하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  likes: {
    fontSize: 16,
  },
  serviceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  price: {
    fontSize: 22,
    color: '#007bff',
    textAlign: 'center',
    marginVertical: 8,
  },
  salonName: {
    textAlign: 'center',
    fontSize: 16,
    color: 'grey',
    marginBottom: 16,
  },
  details: {
    paddingHorizontal: 16,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    color: 'grey',
    marginTop: 8,
  },
  bookingButton: {
    backgroundColor: '#007bff',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  bookingButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ServiceInfoScreen;