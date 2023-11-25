import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const MyInfoScreen = () => {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            source={photo ? { uri: photo } : require('../assets/profile.png')} // Provide your default avatar image
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.name}>김재현</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => console.log('프로필 수정')}>
          <Text style={styles.editButtonText}>프로필 수정</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.reservationButton} onPress={() => console.log('예약 내역')}>
        <Text style={styles.reservationButtonText}>예약 내역</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#C4C4C4', // A placeholder color
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  editButton: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#E8E8E8', // A light grey background color for the button
  },
  editButtonText: {
    fontSize: 16,
    color: '#000000',
  },
  reservationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#E8E8E8', // A light grey background color for the button
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  reservationButtonText: {
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
  },
});

export default MyInfoScreen;
