import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-maps';

const MapScreen = () => {
 
  return(
  <View style={styles.screen}>
  	  <MapView
        style={styles.map}
        initialRegion={{
                latitude: 36.798971,
                longitude: 127.074852,
                latitudeDelta: 0.018,
                longitudeDelta: 0.018,
              }}
        provider={PROVIDER_GOOGLE}
      > 
        <Marker
          coordinate={{
            latitude: 36.798971,
            longitude: 127.074852,
          }}
          pinColor="#2D63E2"
          title="하이"
          description="테스트"
        />
      </MapView>
  </View>
  )
  
}

const styles = StyleSheet.create({
	screen:{
      flex:1
    },
  	map:{
	  width: "100%",
  	  height : "100%"
	}
})

export default MapScreen