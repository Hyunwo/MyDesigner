import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const settingsOptions = [
  { key: 'account', title: '계정' },
  { key: 'notifications', title: '알림' },
  { key: 'privacy', title: '개인정보 및 보안' },
  // ... 기타 설정 옵션들
];

const SettingsScreen = ({ navigation }) => {
  const renderSettingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate(item.key)}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsOptions}
        renderItem={renderSettingItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
