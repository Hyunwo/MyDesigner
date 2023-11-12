import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const designers = [
  // 더미 데이터
  { id: '1', name: '김XX', tag: '상세한 설명 또는 태그 #1', isLiked: true },
  { id: '2', name: '이YY', tag: '상세한 설명 또는 태그 #2', isLiked: false },
  { id: '3', name: '박ZZ', tag: '상세한 설명 또는 태그 #3', isLiked: true },
  // ... 추가 데이터
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(designers); // 처음에는 모든 디자이너를 표시

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setResults(designers); // 검색어가 비어있을 때는 모든 디자이너를 표시
    } else {
      const filteredDesigners = designers.filter((designer) =>
        designer.name.includes(text) // 검색어와 이름이 일치하는지 검사
      );
      setResults(filteredDesigners); // 검색 결과를 상태로 설정
    }
  };

  const renderDesigner = ({ item }) => (
    <View style={styles.designerCard}>
      <Icon name="person-circle-outline" size={40} color="#000" style={styles.designerIcon} />
      <View style={styles.designerInfo}>
        <Text style={styles.designerName}>{item.name}</Text>
        <Text style={styles.designerTag}>{item.tag}</Text>
      </View>
      <TouchableOpacity onPress={() => alert('Liked!')}>
        <Icon name={item.isLiked ? "heart" : "heart-outline"} size={25} color={item.isLiked ? "red" : "black"} />
      </TouchableOpacity>
    </View>
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
});

export default SearchScreen;
