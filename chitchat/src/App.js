import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div>
        <RoomList 
          firebase={firebase} 
        />
      </div>
    );
  }
}

export default App;
