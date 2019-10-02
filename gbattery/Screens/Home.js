import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import MapView, { Callout } from 'react-native-maps';

import { FontAwesome } from '@expo/vector-icons';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { ScrollView } from 'react-native-gesture-handler';

const { Marker } = MapView;
const { height, width } = Dimensions.get('window');

const dockLocation = [
  {
    id: 1,
    batteries: 20,
    docks: 10,
    coordinate: {
      latitude: 40.76266,
      longitude: -73.967258
    }
  },
  {
    id: 2,
    batteries: 10,
    docks: 15,
    coordinate: {
      latitude: 40.734789,
      longitude: -73.99073
    }
  },
  {
    id: 3,
    batteries: 10,
    docks: 15,
    coordinate: {
      latitude: 40.758663,
      longitude: -73.981329
    }
  }
];

class Home extends Component {
  constructor(props) {
    super(props);
    state = {
      active: null,
      batteries: null,
      docks: null,
      region: {
        latitude: 40.752257182719525,
        longitude: -73.98586864149988,
        longitudeDelta: 0.1,
        latitudeDelta: 0.01
      }
    };
  }
  async gotoCurrentLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      longitudeDelta: 0.00001,
      latitudeDelta: 0.003
    });
  }
  render() {
  return (
    <View style={styles.container}>
      <MapView
        region={region}
        style={styles.map}
        showsUserLocation={true}
        customMapStyle={mapStyle}
      >
        {docks.map(dock => (
          <Marker
            key={`marker-${dock.id}`}
            coordinate={dock.coordinate}
            onPress={() => markerClick}
          ></Marker>
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.profile}
        onPress={() => navigation.navigate('Profile')}
      >
        <FontAwesome name="user" size={35} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.hereContainer}
        onPress={() => gotoCurrentLocation()}
      >
        <FontAwesome name="location-arrow" size={30} />
      </TouchableOpacity>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        style={styles.docksDetails}
        scrollEventThrottle={16}
        snapToAlignment="center"
      >
        <TouchableWithoutFeedback
          key={`parking-${docks.id}`}
          onPress={() => this.setState({ active: docks.id })}
        >
          <View>
            {docks.map(dock => (
              <View key={`marker-${dock.id}`} style={styles.dockDetail}>
                <Text>{dock.id}</Text>
              </View>
            ))}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <TouchableOpacity style={styles.docs}>
        <Text>Docs</Text>
      </TouchableOpacity>
    </View>
  );
}

}

function HomeScreen({ navigation, docks, mapStyle }) {
  

  function markerClick() {
    return (
      <Text style={{ position: 'absolute', width: 90, height: 90 }}>Hi</Text>
    );
  }

  
HomeScreen.defaultProps = {
  docks: dockLocation
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    position: 'absolute',
    marginTop: height / 20,
    marginHorizontal: width / 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.3
  },
  map: {
    flex: 1
  },
  docs: {
    position: 'absolute',
    backgroundColor: 'white',
    marginTop: 550,
    padding: 25,
    width: 90,
    borderRadius: 40,
    marginHorizontal: 250,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.3
  },
  docksDetails: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: 100
  },
  dockDetail: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
    width: (width / 9) * 8,
    marginHorizontal: 12
  },
  hereContainer: {
    position: 'absolute',
    marginTop: height - height / 4,
    marginHorizontal: width / 20,
    borderRadius: 40,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.3
  },
  here: {
    flex: 1,
    justifyContent: 'center'
  }
});

const mapStyle = [
  [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#ebe3cd'
        }
      ]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#523735'
        }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f1e6'
        }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#c9b2a6'
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#dcd2be'
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ae9e90'
        }
      ]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dfd2ae'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dfd2ae'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#93817c'
        }
      ]
    },
    {
      featureType: 'poi.business',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#a5b076'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#447530'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f1e6'
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#fdfcf8'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f8c967'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#e9bc62'
        }
      ]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e98d58'
        }
      ]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#db8555'
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#806b63'
        }
      ]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dfd2ae'
        }
      ]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8f7d77'
        }
      ]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ebe3cd'
        }
      ]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dfd2ae'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#b9d3c2'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#92998d'
        }
      ]
    }
  ]
];
