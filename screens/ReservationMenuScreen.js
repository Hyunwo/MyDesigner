import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';

const ReservationMenuScreen = ({ route, navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('커트');

    // 서비스 카테고리
  const categories = ['커트', '펌', '염색', '클리닉'];
    const { designerId } = route.params; // designerId를 route.params에서 추출
  // 예시를 위해 정적으로 서비스 목록을 정의합니다.
  // 실제 앱에서는 서버에서 데이터를 가져오거나 상태 관리를 통해 동적으로 목록을 구성해야 합니다.
  const services = [
    { id: '1', title: '학생 커트(0세~19세)', price: '17,000원', onPress: () => {} },
    { id: '2', title: '남성 커트', price: '19,000원', onPress: () => {} },
    { id: '3', title: '여성 커트', price: '20,000원', onPress: () => {} },
    // 추가 서비스 아이템들...
  ];

  const handleServicePress = (service) => {
    navigation.navigate('Studentcut');
    // 예약 화면으로 네비게이션하거나 서비스 관련 액션을 실행합니다.
    // navigation.navigate('ReservationScreen', { serviceId: service.id });
    Alert.alert('Service Selected', `You selected ${service.title}`);
  };

  return (
    <ScrollView style={styles.container}>
        {/* 서비스 카테고리 */}
      <View style={styles.categoriesRow}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* ... 프로필 이미지, 이름, 타이틀, 설명 ... */}
      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>{selectedCategory}</Text>
        {services.map((service) => (
          <TouchableOpacity key={service.id} style={styles.menuItem} onPress={() => handleServicePress(service)}>
            <Text style={styles.menuItemText}>{service.title}</Text>
            <View style={styles.menuItemRight}>
              <Text style={styles.menuItemPrice}>{service.price}</Text>
              <Ionicons name="chevron-forward-outline" size={24} color="#007bff" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
        marginTop: 32,
      },
      name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 16,
        textAlign: 'center',
      },
      title: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 4,
      },
      salon: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 4,
      },
      description: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 4,
        marginBottom: 16,
      },
      interactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 16,
      },
      interactionButton: {
        alignItems: 'center',
      },
      interactionText: {
        fontSize: 16,
      },
      categoriesRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 16,
      },
      categoryButton: {
        padding: 8,
        marginHorizontal: 4,
        backgroundColor: '#e1e1e1',
        borderRadius: 20,
      },
      selectedCategory: {
        backgroundColor: '#007bff',
      },
      categoryText: {
        color: 'black',
        fontSize: 16,
      },
      menuSection: {
        paddingHorizontal: 32,
        paddingTop: 16,
      },
      menuTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 16,
      },
      menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
      },
      menuItemText: {
        fontSize: 18,
      },
      menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      menuItemPrice: {
        fontSize: 18,
        color: '#007bff',
      },
});

export default ReservationMenuScreen;
