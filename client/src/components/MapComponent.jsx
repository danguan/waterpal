import React from 'react';
import axios from 'axios';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from 'semantic-ui-react';
import Geosuggest from 'react-geosuggest';
import 'leaflet/dist/leaflet.css';
import '../styles/css/geosuggest.css';

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

  handleInput = e => {
    this.setState({ search: e.target.value });
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
        <Map
          style={{ height: '100vh', width: '100vw', zIndex: '0' }}
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
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            top: '0',
            left: '10%',
            width: '80vw',
            height: '5vh',
            margin: '0px auto'
          }}
        >
          <Geosuggest
            name="address"
            style={{ width: '100%', height: '100%' }}
            autoComplete="off"
            placeholder={'Enter address to find nearby water fountains'}
            id="address"
            onSuggestSelect={this.handleSuggest}
          />
          <Button
            primary
            style={{
              width: '20%',
              height: '95%',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
            onClick={this.setCurrAddress}
          >
            Current Address
          </Button>
        </div>
      </div>
    );
  }
}
