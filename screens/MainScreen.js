import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>MyDesigner</Text>
      <TouchableOpacity
        style={[styles.button, styles.firstButton]}
        onPress={() => navigation.navigate('Who')}
      >
        <Text style={styles.buttonText}>WhoScreen</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    marginBottom: 30,
  },
  button: {
    height: 50,
    width: '60%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  firstButton: {
    marginTop: 0,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 18,
  },
});

export default MainScreen