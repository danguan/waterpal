import React from 'react';
import axios from 'axios';

import { Route, withRouter } from 'react-router-dom';
import { Switch } from 'react-router';

import Loading from './Loading.jsx';
import LoginComponent from './LoginComponent.jsx';
import MapComponent from './MapComponent.jsx';
import Landing from './Landing.jsx';
import Raindrops from './Raindrops.jsx';

class App extends React.Component {
  state = {
    clicked: false,
    droplets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    position: [40.75, -73.97],
    markers: []
  };

  handleClick = (e) => {
    this.setState({
      clicked: !this.state.clicked
    });

    const {
      history: { push }
    } = this.props;
    e.preventDefault();
    setTimeout(() => push('/map'), 5000);
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
        <Loading clicked={this.state.clicked} />

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
          <Route
            path="/"
            exact
            render={() => (
              <Landing
                clicked={this.state.clicked}
                handleClick={this.handleClick}
              />
            )}
          />
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
