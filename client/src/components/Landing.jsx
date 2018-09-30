import React from 'react';
import { Sticky, Transition } from 'semantic-ui-react';

import Navbar from './Navbar.jsx';

export default class Landing extends React.Component {
  state = {
    visible: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visible: true
      });
    }, 3000);
  }

  render() {
    return (
      <div>
        <div style={{ height: '100vh', marginBottom: '3%' }}>
          <img
            style={{
              height: '75vh',
              width: '75vw',
              position: 'relative',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            src="https://www.holoong.com/600x800/042001314920149957.jpg"
          />
        </div>

        <div style={{ height: '100vh' }}>
          <img
            style={{
              position: 'relative',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            src="https://www.holoong.com/600x800/042001314920149957.jpg"
          />
        </div>
      </div>
    );
  }
}
