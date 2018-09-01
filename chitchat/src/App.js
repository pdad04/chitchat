import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
      activeRoomName: 'Room1',
      activeRoomId: '1'
    }
    this.roomsRef = firebase.database().ref('rooms');
    this.getActiveRoom = this.getActiveRoom.bind(this);
  }

  getActiveRoom(e){
    e.preventDefault();
     this.setState({activeRoomName: e.target.innerText, activeRoomId:e.target.attributes.id.value});
  }

  render() {
    return (
      <div>
        <h1>{this.state.activeRoomName}</h1>
        <RoomList  
          firebase={firebase}  
          room={(e) => this.getActiveRoom}
          />
        <MessageList 
          firebase={firebase} 
          roomId={this.state.activeRoomId} 
        />
      </div>
    );
  }
}

export default App;
