import React from 'react';
import axios from 'axios';

import { Route, withRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import { Input, Button } from 'semantic-ui-react';

import Loading from './Loading.jsx'
import LoginComponent from './LoginComponent.jsx';
import MapComponent from './MapComponent.jsx';
import Header from './Header.jsx';
import Landing from './Landing.jsx';
import Raindrops from './Raindrops.jsx';

class App extends React.Component {
  state = {
    clicked: false,
    droplets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    position: [40.75, -73.97],
    markers: []
  };

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

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
        <Header />
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

        <Switch>
          <Route path="/" exact render={() => <Loading />} />
          <Route path="/login" render={() => <LoginComponent />} />
          <Route
            path="/map"
            render={() => <MapComponent markers={this.state.markers} />}
          />
        </Switch>
      </div>
    );
  }
}

const ShowTheLocationWithRouter = withRouter(App);
export default App;
