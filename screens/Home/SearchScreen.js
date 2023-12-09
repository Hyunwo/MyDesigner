import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { firestore } from '../../config/firebaseConfig'; // Firestore 구성을 임포트
import { collection, getDocs } from 'firebase/firestore';

const SearchScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [designers, setDesigners] = useState([]); // Firestore에서 가져온 디자이너 목록
  const [results, setResults] = useState([]); // 검색 결과

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'designers'));
        const fetchedDesigners = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDesigners(fetchedDesigners);
        setResults(fetchedDesigners); // 초기 검색 결과는 모든 디자이너
      } catch (error) {
        console.error("Error fetching designers:", error);
      }
    };
    fetchDesigners();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredDesigners = designers.filter((designer) =>
      designer.name.toLowerCase().includes(text.toLowerCase()) // 대소문자 구분 없이 검색
    );
    setResults(filteredDesigners); // 검색 결과를 상태로 설정
  };

  const renderDesigner = ({ item }) => (
    <TouchableOpacity style={styles.designerCard} onPress={() => navigation.navigate('ReservationMenu', { designerId: item.id })}>
      <Image
        source={{ uri: item.profileImageUrl }}
        style={styles.designerImage}
        resizeMode="cover"
      />
      <View style={styles.designerInfo}>
        <Text style={styles.designerName}>{item.name}</Text>
      </View>
      <Icon name={item.isLiked ? "heart" : "heart-outline"} size={25} color={item.isLiked ? "red" : "black"} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Icon name="search-outline" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="디자이너 검색"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={results}
        renderItem={renderDesigner}
        keyExtractor={(item) => item.id}
        style={styles.resultsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  resultsContainer: {
    marginTop: 10,
  },
  designerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  designerIcon: {
    marginRight: 10,
  },
  designerInfo: {
    flex: 1,
  },
  designerName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  designerTag: {
    color: 'grey',
  },
  designerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default SearchScreen;