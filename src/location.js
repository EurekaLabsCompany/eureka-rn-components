import React, { Component} from 'react';
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const Endereco = ({logradouro, numero, bairro}) => (
  <View style={{padding: 10}}>
    <Text style={{fontWeight: 'bold'}}>Endereço</Text>
    <Text>{logradouro}, {numero}. {bairro}.</Text>
  </View>
);

export default class MapaTeatro extends Component {
  static PropTypes = {
    navigator: PropTypes.object.isRequired,
    dados: PropTypes.object
  }
  render() {
    const { navigator, dados} = this.props;

    return (
      <View>
        <View style ={styles.container}>
          <MapView
            style={styles.map}
            region={{
              latitude: dados.latitude,
              longitude: dados.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            <MapView.Marker
              coordinate={{latitude: dados.latitude, longitude: dados.longitude}}
              title={dados.nome}
            />
          </MapView>
        </View>
        <Endereco {...dados} />
      </View>
    );
  }
}
