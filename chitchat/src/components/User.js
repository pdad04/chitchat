import React, { Component } from 'react';

class User extends Component{
    
    constructor(props){
        super(props);   
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
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
    }

    signOut(e){
        e.preventDefault();
        this.props.firebase.auth().signOut();
    }
    render(){
        return(
            <section>
                <h5>{this.props.user ? this.props.user.displayName : 'Guest'}</h5>
                <a href='' onClick={this.signIn}>Sign In</a>
                <a href='' onClick={this.signOut}>Sign Out</a>
            </section>
        )
    }
}

export default User