import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firestore } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const ReservationMenuScreen = ({ route, navigation }) => {
  const [services, setServices] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('커트');
  const { designerId } = route.params;

  useEffect(() => {
    const fetchServices = async () => {
      const docRef = doc(firestore, 'designers', designerId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setServices(data.services || {}); // Firestore에서 서비스 데이터를 가져와서 상태에 저장
      }
    };

    fetchServices();
  }, [designerId]);

  const categories = ['커트', '펌', '염색', '클리닉'];

  const handleServiceSelect = (service, index) => {
    navigation.navigate('ServiceInfo', {
      designerId: designerId,
      selectedCategory: selectedCategory,
      serviceIndex: index
    });
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

      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>{selectedCategory}</Text>
        {services[selectedCategory]?.map((service, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={() => handleServiceSelect(service, index)}>
            <Text style={styles.menuItemText}>{service.name}</Text>
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