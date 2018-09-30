import React from 'react';
import { Link, withRouter } from 'react-router-dom'

class Header extends React.Component{

  render(){
    return(
      <div style={{display:"flex"}}>
        <Link to='/'> Home </Link>
        <Link to='/map'> Map </Link>
        <Link to='/login'> Login </Link>
      </div>
    )
  }
}

export default withRouter(Header);