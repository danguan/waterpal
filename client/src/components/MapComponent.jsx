import React from 'react';

import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/css/geosuggest.css';
import axios from 'axios';

import Header from './Header.jsx';

let FountainIcon = L.icon({
  iconUrl: 'http://maps.google.com/mapfiles/ms/micons/green-dot.png'
});

export default class MapComponent extends React.Component {
  state = {
    position: [40.75, -73.97],
    zoom: 16,
    markers: []
  };

  componentDidMount() {
    axios
      .get('/nearby', {
        params: { lat: 40.75, lng: -73.97 }
      })
      .then(res => {
        this.setState({
          markers: res.data
        });
      });
  }

  handleMapChange = (e, position) => {
    if (!position) {
      position = Object.values(e.target.getCenter());
    }
    this.handleSuggest({
      location: {
        lat: position[0],
        lng: position[1]
      }
    });
  };

  handleMapZoom = e => {
    this.setState({ zoom: e.target.getZoom() });
  };

  handleSuggest = suggest => {
    if (suggest) {
      axios
        .get('/nearby', {
          params: { lat: suggest.location.lat, lng: suggest.location.lng }
        })
        .then(res => {
          this.setState({
            markers: res.data,
            position: [suggest.location.lat, suggest.location.lng]
          });
        });
    }
  };

  setCurrAddress = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      var crd = pos.coords;
      this.handleSuggest({
        location: {
          lat: crd.latitude,
          lng: crd.longitude
        }
      });
    });
  };

  render() {
    return (
      <div style={{ position: 'relative', zIndex: '1' }}>
        <Header
          handleSuggest={this.handleSuggest}
          setCurrAddress={this.setCurrAddress}
          resetClick={this.props.resetClick}
        />
        <Map
          style={{
            position: 'fixed',
            height: '94vh',
            width: '100vw',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          center={this.state.position}
          zoom={this.state.zoom}
          minZoom="15"
          maxZoom="19"
          onzoomend={this.handleMapZoom}
          onmoveend={this.handleMapChange}
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.markers ? (
            <MarkerClusterGroup>
              {this.state.markers.map(marker => {
                return (
                  <Marker
                    key={marker.name}
                    position={[marker.lat, marker.lng]}
                    icon={FountainIcon}
                  >
                    <Popup>
                      <a href={marker.url}>{marker.name}</a>
                      <br />
                      {marker.address}
                      <br />
                      {`${marker.fountains} Water Fountain${
                        marker.fountains === 1 ? '' : 's'
                      }`}
                    </Popup>
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
          ) : (
            <div />
          )}
        </Map>
      </div>
    );
  }
}
