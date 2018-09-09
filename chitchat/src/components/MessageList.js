import React, { Component } from 'react'
import Moment from 'react-moment'
import './Message.css'

class MessageList extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages:[],
            test: ''
        }
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.createMessage = this.createMessage.bind(this); 
    }


    componentDidMount(){
        this.messagesRef.on('child_added', snapshot =>{
            const messages = snapshot.val();
            messages.key = snapshot.key;
            if(snapshot.val().roomId === this.props.roomId){
                this.setState({ messages: this.state.messages.concat(snapshot.val())});
            }
        });

    }

    componentDidUpdate(prevProps){
        if(prevProps.roomId !== this.props.roomId){
            const messages = [];
            this.messagesRef.on('child_added', snapshot =>{
            messages.push(snapshot.val());
            if(snapshot.val().roomId === this.props.roomId){
                this.setState({ messages: messages.filter(message => message.roomId === this.props.roomId)});
            }
        });
        }

        const messages = document.getElementsByClassName('message-data');
        if(messages.length !== 0){
            const last = messages[messages.length - 1];
            last.scrollIntoView();
        }
    }


    componentWillReceiveProps(nextProps){
        if(this.props.roomId !== nextProps.roomId){
            this.setState({messages: []});
        } 
    }

    createMessage(e){
        e.preventDefault();
        const message = document.getElementById('message-text');
        if(this.props.user){
            this.messagesRef.push({
                content: message.value,
                username: this.props.user.displayName,
                roomId: this.props.roomId,
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
            });
            message.value = '';
        }
    }

    render(){
        return(
            <section id='message-view'>
                <div id="message-list">
                    {this.state.messages.map((room,index) => 
                        <div className='message-data' key={index}>
                            <div id='message-content'>
                                <p className='message-user'>{room.username} <span id='timestamp'><Moment format='dddd MMM DD, YYYY @ h:mm a'>{room.sentAt}</Moment></span></p>
                                <p>{room.content}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div id="message-input">
                    <form onSubmit={this.createMessage}>
                        <input id='message-text' type='text' name='message' placeholder='Message' autoComplete='off' />
                        <input type="submit" />
                    </form>
                </div>
            </section>
        );
    }
}

export default MessageList;