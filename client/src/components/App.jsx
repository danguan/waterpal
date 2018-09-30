import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Route, BrowserRouter } from 'react-router-dom';
import { Input, Button } from 'semantic-ui-react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import Landing from './Landing.jsx';
import Raindrops from './Raindrops.jsx';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export default class App extends React.Component {
  state = {
    clicked: false,
    droplets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  };

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  render() {
    // const position = [40.8,-73.8];
    return (
      <div>
        <Input
          className={this.state.clicked ? 'move' : ''}
          labelPosition="right"
          type="text"
          placeholder="Address"
          style={{
            position: 'fixed',
            top: '-3%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Button basic>$</Button>
          <input />
          <Button basic>.00</Button>
        </Input>

        <Landing
          clicked={this.state.clicked}
          handleClick={this.handleClick.bind(this)}
        />

        {this.state.droplets.map(ind => {
          const speed = Math.floor(Math.random() * 8) + 's';
          const fromLeft = Math.floor(Math.random() * 96) + '%';

          return (
            <div
              key={ind}
              className={this.state.clicked ? 'out' : ''}
              style={{
                animationDuration: speed,
                position: 'fixed',
                top: '-13%',
                left: fromLeft,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Raindrops />
            </div>
          );
        })}

        {/* <Map style={{height:"100vh", width:"100vw"}} center={position} zoom="13">
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
        </Map> */}
      </div>
    );
  }
}
