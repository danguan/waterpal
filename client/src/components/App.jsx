import React from 'react';
import axios from 'axios';
import { Route, withRouter } from 'react-router-dom'
import { Switch } from 'react-router'

import Loading from './Loading.jsx'
import LoginComponent from './LoginComponent.jsx';
import MapComponent from './MapComponent.jsx';
import Header from './Header.jsx';


class App extends React.Component {
  state = {
    position: [40.75, -73.97],
    markers: []
  };

  handleMapChange = e => {
    this.setState({ position: Object.values(e.target.getCenter()) });
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
