import React from 'react' 
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
// import './styles/css/main.css';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
export default class App extends React.Component{
  state = {}

  render(){
    const position = [40.8,-73.8];
    return(
      <div>WaterPal
        <Map style={{height:"100vh", width:"100vw"}} center={position} zoom="13">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br/> Easily customizable.
            </Popup>
          </Marker>
          <Marker position={[40.9,-72.6]}>
            <Popup>
              A pretty CSS3 popup. <br/> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    )
  }
}
