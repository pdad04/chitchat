import React, { Component } from 'react';
import './User.css'

class User extends Component{
    
    constructor(props){
        super(props);   
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.state = {
            signedIn: false
        }
    }

    componentDidMount(){
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }

    signIn(e){
        e.preventDefault();
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider);
        this.setState({signedIn: true})
    }

    signOut(e){
        e.preventDefault();
        this.props.firebase.auth().signOut();
        this.setState({signedIn: false})
    }
    render(){
        return(
            <section id='user-data'>
                <h5>{this.props.user ? this.props.user.displayName : 'Guest'}</h5>
                <a href='' onClick={this.state.signedIn ? this.signOut: this.signIn}>{this.state.signedIn ? 'Sign Out' : 'Sign In'}</a>
            </section>
        )
    }
}

export default User