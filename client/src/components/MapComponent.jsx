import React from 'react' 
import axios from 'axios'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
export default class MapComponent extends React.Component{
  state = {
    position : [40.75, -73.97],
    zoom : 15
  }

  handleMapChange = (e, pos) => {
    let position = pos
    if(!pos){
      position = Object.values(e.target.getCenter())
    }
    this.setState({position})
  }

  handleMapZoom = (e) => {
    this.setState({zoom: e.target.getZoom()})
  }

  handleInput = (e) => {
    this.setState({search: e.target.value})
  }

  handleSearch = () => {
    axios.get('/longlat', {params: {site_name: this.state.search}})
      .then(res=>{
        let position = [res.data.lat, res.data.lng]
        this.setState({position})
      })
  }

  render(){
    return(
      <div style={{position:"relative", zIndex: "1"}}>
        <Map
          style={{ height: '100vh', width: '100vw', zIndex: "0" }}
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
            this.props.markers.map(marker => {
              return (
                <Marker position={[marker.lat, marker.lng]}>
                  <Popup>
                    {marker.name}
                    <br />
                    {`${marker.fountains} Fountain${
                      marker.fountains === 1 ? '' : 's'
                    }`}
                  </Popup>
                </Marker>
              );
            })
          ) : (
            <div />
          )}
        </Map>
        <div style={{position: "absolute", display:"flex", top: "0", left:"20%", width: "60vw", height: "50px", margin: "0px auto", backgroundColor: "white"}} >
          <input style={{flexGrow: 1}} placeholder="Search here" onChange={this.handleInput}></input>
          <button onClick={this.handleSearch}>Search</button>
        </div>
      </div>
    )
  }
}