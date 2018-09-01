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
    }


    componentDidMount(){
        this.messagesRef.on('child_added', snapshot =>{
            const messages = snapshot.val();
            messages.key = snapshot.key;
            if(snapshot.val().roomId === this.props.roomId){
                this.setState({ messages: this.state.messages.concat(snapshot.val())});
            }
        });
    //    this.messagesRef.orderByChild("roomId").equalTo(this.props.roomId).on("child_added", snapshot =>{
    //         const messages = snapshot.val();
    //         console.log(snapshot.val);
    //         this.setState({messages: this.state.messages.concat(messages)});
    //    })

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

    render(){
        return(
            <section>
                {this.state.messages.map((room,index) => 
                    <li key={index}>{room.content}</li>
                )}
            </section>
        );
    }
}

export default MessageList;