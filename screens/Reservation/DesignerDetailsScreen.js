import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { firestore } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const DesignerDetailsScreen = ({ route }) => {
  const { designerId } = route.params;
  const [designer, setDesigner] = useState(null);

  useEffect(() => {
    // Firestore에서 선택된 디자이너의 정보를 가져옵니다.
    const fetchDesignerDetails = async () => {
      try {
        const designerDocRef = doc(firestore, 'designers', designerId);
        const docSnap = await getDoc(designerDocRef);
        if (docSnap.exists()) {
          setDesigner(docSnap.data());
        } else {
          Alert.alert('오류', '디자이너 정보가 없습니다.');
        }
      } catch (error) {
        Alert.alert('오류', '문서를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchDesignerDetails();
  }, [designerId]);   // 디자이너 ID가 변경될 때마다 실행 

  // 선택된 디자이너의 정보가 없다면 로딩 표시
  if (!designer) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: designer.profileImageUrl }} style={styles.profileImage} />
      <Text style={styles.name}>{designer.name}</Text>
      <Text style={styles.salonName}>{designer.salonName}</Text>
      <View style={styles.servicesContainer}>
        <Text style={styles.servicesTitle}>서비스</Text>
        {designer.services ? (
          Object.entries(designer.services).map(([category, services]) => (
            <View key={category}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {services.map((service, index) => (
                <Text key={index} style={styles.serviceItem}>
                  {service.name}: {service.price}원
                </Text>
              ))}
            </View>
          ))
        ) : (
          <Text>서비스 정보가 없습니다.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  salonName: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  servicesContainer: {
    marginBottom: 20,
  },
  servicesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DesignerDetailsScreen;
