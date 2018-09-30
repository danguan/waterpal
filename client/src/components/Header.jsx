import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Menu, Button } from 'semantic-ui-react';
import Geosuggest from 'react-geosuggest';

class Header extends React.Component {
  handleSuggest = suggest => {
    if (suggest) {
      this.props.handlePosition([suggest.location.lat, suggest.location.lng]);
    } else {
      this.props.handlePosition([40.75, -73.97]);
    }
  };

  handleSearch = () => {
    axios
      .get('/longlat', { params: { site_name: this.state.search } })
      .then(res => {
        let position = [res.data.lat, res.data.lng];
        this.props.handlePosition({ position });
      });
  };

  render() {
    return (
      <Menu>
        <Menu.Item>
          <Link to="/">Home</Link>
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
            onSuggestSelect={this.handleSuggest}
          />
          <Button>
            <Icon name="search" />
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Header);
