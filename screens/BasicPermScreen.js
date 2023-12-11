import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BasicPermScreen = () => {
  // Assuming we have a state to track the number of likes
  const [likes, setLikes] = useState(0);

  const onLikePress = () => {
    // This would be your like handling logic, for now it's just incrementing a counter
    setLikes(likes + 1);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Like and share icons */}
        <Ionicons name="heart-outline" size={24} color="black" onPress={onLikePress} />
        <Text style={styles.likes}>{likes}</Text>
        <Ionicons name="share-social-outline" size={24} color="black" />
      </View>
      
      <Text style={styles.serviceTitle}>베이직 펌</Text>
      <Text style={styles.price}>89,000</Text>
      <Text style={styles.salonName}>@어울리다 배방점</Text>
      
      {/* Service Details */}
      <View style={styles.details}>
        <Text style={styles.detailTitle}>정보</Text>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={20} color="black" />
          <Text style={styles.detailText}>1시간 30분 소요</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="information-circle-outline" size={20} color="black" />
          <Text style={styles.detailText}>부가정보</Text>
        </View>
        {/* ... More details here ... */}
        <Text style={styles.description}>
          가장 중요하고 기본이 되는 커트를 고객님과 정확한 상담을 통해 만족스러운 디자인으로 도와드리겠습니다.
          {'\n'}*단발기장이상 샴푸 +3,000원(선택)
        </Text>
      </View>

      {/* Booking Button */}
      <TouchableOpacity style={styles.bookingButton} onPress={() => navigation.navigate('')}>
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

export default BasicPermScreen;