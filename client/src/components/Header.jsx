import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Menu, Button } from 'semantic-ui-react';
import Geosuggest from 'react-geosuggest';

class Header extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item>
          <Link to="/">
            <span onClick={this.props.resetClick}>WaterPal</span>
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link to="/map">Map</Link>
        </Menu.Item>

        <Menu.Item position="right" style={{ width: '50%' }}>
          <Geosuggest
            name="address"
            style={{ width: 'auto', height: '100%' }}
            autoComplete="off"
            placeholder={'Enter address to find nearby water fountains'}
            id="address"
            onSuggestSelect={this.props.handleSuggest}
          />
          <Button primary icon onClick={this.props.setCurrAddress}>
            <Icon name="map marker alternate" />
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Header);
