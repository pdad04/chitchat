import React, { Component } from 'react';
import { Modal, Button, Input } from 'react-materialize'

class RoomList extends Component {
    constructor(props){
        super(props)
        this.state = {
            rooms: []
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount(){
        this.roomsRef.on('child_added', snapshot =>{
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat(room)});
        });
    }

    createRoom(){
        const text = document.getElementById('createRoom');
        if(text.value){
            this.roomsRef.push({ name: text.value});
            text.value = ''
        }
    }

    render(){
        return(
            <section>
                <Modal  
                    header='Create new room'
                    open={false}
                    trigger={<Button className='blue' waves='light'>Create Room</Button>}
                >
                    <Input id='createRoom'label='Room' />
                    <Button 
                        waves='light'
                        onClick={() => this.createRoom()}
                        className='blue'
                    >
                        Submit
                    </Button>
                </Modal>
                <section>
                    {this.state.rooms.map((room,index) => 
                        <li key={index}>{room.name}</li>
                    )}
                </section>
            </section>
        );
    }
}

export default RoomList;