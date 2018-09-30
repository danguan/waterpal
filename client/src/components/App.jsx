import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// import './styles/css/main.css';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

let FountainIcon = L.icon({
  iconUrl: 'http://maps.google.com/mapfiles/ms/micons/orange-dot.png'
})
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Loading from './Loading.jsx'

export default class App extends React.Component {
  state = {
    markers: []
  };

  componentDidMount() {
    axios
      .get('/fountain')
      .then(({ data }) => {
        this.setState({
          markers: data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const position = [40.8, -73.8];
    return (
      <div>
        WaterPal
        <Loading/>
        <Map
          style={{ height: '100vh', width: '100vw' }}
          center={position}
          zoom="13"
          maxZoom="18"
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
                      {`${marker.fountains} Fountain${
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
