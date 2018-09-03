import React, { Component } from 'react'

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
    }


    componentWillReceiveProps(nextProps){
        if(this.props.roomId !== nextProps.roomId){
            this.setState({messages: []});
        } 
    }

    createMessage(e){
        e.preventDefault();
        const message = document.getElementById('message');
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
            <section>
                <div id="message-list">
                    {this.state.messages.map((room,index) => 
                        <li key={index}>{room.content}</li>
                    )}
                </div>
                <div id="message-input">
                    <form onSubmit={this.createMessage}>
                        <input id='message' type='text' name='message'  />
                        <input type="submit" />
                    </form>
                </div>
            </section>
        );
    }
}

export default MessageList;