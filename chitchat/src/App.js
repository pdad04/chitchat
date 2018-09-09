import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBBE-QREcBXFpMbaUjxFV1IcxlG33YnvGY",
  authDomain: "chitchat-87d11.firebaseapp.com",
  databaseURL: "https://chitchat-87d11.firebaseio.com",
  projectId: "chitchat-87d11",
  storageBucket: "chitchat-87d11.appspot.com",
  messagingSenderId: "489599194815"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeRoomName: 'Main Room',
      activeRoomId: '1',
      user: null
    }
    this.roomsRef = firebase.database().ref('rooms');
    this.getActiveRoom = this.getActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  getActiveRoom(e){
    e.preventDefault();
     this.setState({activeRoomName: e.target.innerText, activeRoomId:e.target.attributes.id.value});
  }

  setUser(user){
    this.setState({user: user})
  }

  render() {
    return (
      <section className='wrapper'>
        <aside id='navigation'>
          <header id='user-header'>
            <h3 id='app-name'>Chit Chat</h3>
            <User 
              firebase={firebase}
              setUser={(user) => this.setUser(user)}
              user={this.state.user} 
            />
          </header>
          <RoomList  
            firebase={firebase}  
            room={(e) => this.getActiveRoom}
            />
        </aside>
        <section id='content'>
          <div id='meassage-header'>
            <h5>{this.state.activeRoomName}</h5>
          </div>
          <MessageList 
            firebase={firebase} 
            roomId={this.state.activeRoomId} 
            user={this.state.user}
          />
        </section>
      </section>
    );
  }
}

export default App;
