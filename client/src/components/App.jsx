import React from 'react';
import L from 'leaflet';
import axios from 'axios';
import { Route, withRouter } from 'react-router-dom'
import { Switch } from 'react-router'
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Loading from './Loading.jsx'
import LoginComponent from './LoginComponent.jsx';
import MapComponent from './MapComponent.jsx';
import Header from './Header.jsx';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

class App extends React.Component {
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
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/" exact render={()=>( 
            <Loading/>
          )}/>
          <Route path="/login" render={()=>( 
            <LoginComponent/>
          )}/>
          <Route path="/map" render={()=>( 
            <MapComponent markers={this.state.markers}/>
          )}/>
        </Switch>
      </div>
    );
  }
}

const ShowTheLocationWithRouter = withRouter(App)
export default App
