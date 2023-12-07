// StudentCutScreen -> ServiceInfoScreen
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
              setServiceDetails({
                serviceName: selectedService.name,
                price: selectedService.price,
                salonName: designerData.salonName,
              });
            } else {
              console.log(`${selectedCategory} 카테고리의 서비스 정보를 찾을 수 없습니다. index: ${serviceIndex}`);
            }
          } else {
            console.log(`${selectedCategory} 서비스 배열이 비어있습니다.`);
          }
        } else {
          console.log(`디자이너 문서를 찾을 수 없습니다. ID: ${designerId}`);
        }
      } catch (error) {
        console.error("서비스 정보를 가져오는 중 오류 발생:", error);
      }
    };
    
    getServiceDetails();
  }, [designerId, selectedCategory, serviceIndex]);

  // 좋아요 버튼 이벤트 핸들러
  const onLikePress = () => {
    setLikes(prevLikes => prevLikes + 1); // 좋아요 수 증가
  };

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 부분: 좋아요 및 공유 아이콘 */}
      <View style={styles.header}>
        <Ionicons name="heart-outline" size={24} color="black" onPress={onLikePress} />
        <Text style={styles.likes}>{likes}</Text>
        <Ionicons name="share-social-outline" size={24} color="black" />
      </View>
      
      {/* 서비스 이름, 가격, 미용실 이름 표시 */}
      <Text style={styles.serviceTitle}>{serviceDetails.serviceName}</Text>
      <Text style={styles.price}>{serviceDetails.price}</Text>
      <Text style={styles.salonName}>@{serviceDetails.salonName}</Text>
      
      {/* 서비스 상세 정보 섹션 */}
      <View style={styles.details}>
        {/* 서비스 상세 정보를 렌더링 하는 부분 */}
      </View>

      {/* 예약 버튼 */}
      <TouchableOpacity style={styles.bookingButton} onPress={() => navigation.navigate('DateReservation')}>
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
    color: '#E91E63',
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
    backgroundColor: 'red',
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