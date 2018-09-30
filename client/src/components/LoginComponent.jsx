import React from 'react' 
import axios from 'axios'
export default class LoginComponent extends React.Component{
  state={
    username: "",
    password: ""
  }

  handlePassword(password){
    this.setState({password})
  }

  handleUsername(username){
    this.setState(username)
  }

  handleSubmit(){
    if(this.state.username.length===0){
      alert("Username cannot be empty")
    }else if(this.state.password.length===0){
      alert("Password cannot be empty")
    }else{
      axios.post('/user', {username:this.state.username, password:this.state.password})
      .then(res=>console.log(res.data))
    }
  }

  handleLogin(){

  }

  render(){
    return(
      <div>
        <input placeholder="Enter username" onChange={(e)=>this.handleUsername(e.target.value)}></input>
        <input placeholder="Enter password" onChange={(e)=>this.handlePassword(e.target.value)}></input>
        <button onClick={this.handleSubmit}>Sign Up</button>
      </div>
    )
  }
}