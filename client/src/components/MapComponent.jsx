import React from 'react';

import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/css/geosuggest.css';

import Header from './Header.jsx';

let FountainIcon = L.icon({
  iconUrl: 'http://maps.google.com/mapfiles/ms/micons/orange-dot.png'
});

export default class MapComponent extends React.Component {
  state = {
    position: [40.75, -73.97],
    zoom: 15
  };

  handleMapChange = (e, pos) => {
    let position = pos;
    if (!pos) {
      position = Object.values(e.target.getCenter());
    }
    this.setState({ position });
  };

  handleMapZoom = e => {
    this.setState({ zoom: e.target.getZoom() });
  };

  handleInput = e => {
    this.setState({ search: e.target.value });
  };

  handlePosition = pos => {
    this.setState({ position: pos });
  };

  render() {
    return (
      <div style={{ position: 'relative', zIndex: '1' }}>
        <Header handlePosition={this.handlePosition} />
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
          minZoom="12"
          maxZoom="20"
          onzoomend={this.handleMapZoom}
          onmoveend={this.handleMapChange}
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.props.markers ? (
            <MarkerClusterGroup>
              {this.props.markers.map(marker => {
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
