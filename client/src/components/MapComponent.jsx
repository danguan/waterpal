import React from 'react';
import axios from 'axios';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from 'semantic-ui-react';
import Geosuggest from 'react-geosuggest';
import 'leaflet/dist/leaflet.css';
import '../styles/css/geosuggest.css';

let FountainIcon = L.icon({
  iconUrl: 'http://maps.google.com/mapfiles/ms/micons/orange-dot.png'
});

export default class MapComponent extends React.Component {
  state = {
    position: [40.75, -73.97],
    zoom: 15
  };

  handleMapChange = (e, pos) => {
    let position = pos;
    if (!pos) {
      position = Object.values(e.target.getCenter());
    }
    this.setState({ position });
  };

  handleMapZoom = e => {
    this.setState({ zoom: e.target.getZoom() });
  };

  handleInput = e => {
    this.setState({ search: e.target.value });
  };

  handleSearch = () => {
    axios
      .get('/longlat', { params: { site_name: this.state.search } })
      .then(res => {
        let position = [res.data.lat, res.data.lng];
        this.setState({ position });
      });
  };

  handleSuggest = suggest => {
    if (suggest) {
      this.setState({
        position: [suggest.location.lat, suggest.location.lng],
        zoom: 19
      });
    } else {
      this.setState({
        position: [40.75, -73.97]
      });
    }
  };

  render() {
    return (
      <div style={{ position: 'relative', zIndex: '1' }}>
        <Map
          style={{ height: '100vh', width: '100vw', zIndex: '0' }}
          center={this.state.position}
          zoom={this.state.zoom}
          minZoom="12"
          maxZoom="20"
          onzoomend={this.handleMapZoom}
          onmoveend={this.handleMapChange}
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.props.markers ? (
            <MarkerClusterGroup>
              {this.props.markers.map(marker => {
                return (
                  <Marker
                    key={marker.name}
                    position={[marker.lat, marker.lng]}
                    icon={FountainIcon}
                  >
                    <Popup>
                      <a href={marker.url}>{marker.name}</a>
                      <br />
                      {marker.address}
                      <br />
                      {`${marker.fountains} Water Fountain${
                        marker.fountains === 1 ? '' : 's'
                      }`}
                    </Popup>
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
          ) : (
            <div />
          )}
        </Map>
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            top: '0',
            left: '20%',
            width: '60vw',
            height: '5vh',
            margin: '0px auto',
            backgroundColor: 'white'
          }}
        >
          <Geosuggest
            name="address"
            style={{ width: 'auto', height: '100%' }}
            autoComplete="off"
            placeholder={'Enter address to find nearby water fountains'}
            id="address"
            onSuggestSelect={this.handleSuggest}
          />
          <Button style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            Use Current Address
          </Button>
        </div>
      </div>
    );
  }
}
