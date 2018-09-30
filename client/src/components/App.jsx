import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// import './styles/css/main.css';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Loading from './Loading.jsx'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

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
    console.log(this.state);
    const position = [40.8, -73.8];
    return (
      <div>
        WaterPal
        <Loading/>
        <Map
          style={{ height: '100vh', width: '100vw' }}
          center={position}
          zoom="13"
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.markers ? (
            this.state.markers.map(marker => {
              return (
                <Marker position={[marker.lat, marker.lng]}>
                  <Popup>
                    {marker.name}
                    <br />
                    {`${marker.fountains} Fountain${
                      marker.fountains === 1 ? '' : 's'
                    }`}
                  </Popup>
                </Marker>
              );
            })
          ) : (
            <div />
          )}
        </Map>
      </div>
    );
  }
}
