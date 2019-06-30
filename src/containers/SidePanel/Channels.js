import React, { useState, useEffect } from 'react'
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';


const Channels = (props) => {

    useEffect(() => {
        props.onGetChannels()
    }, []);

    const [ channels, setChannels] = useState(props.channels);
    const [ modal, setModal ] = useState(false);
    const [ form, setForm ] = useState({
        channelName: "",
        channelDetails: ""
    })

    const inputChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }
    const formSubmitHandler = (event) => {
        event.preventDefault();
        console.log(form);
        props.onSubmitChannel(form);
        setModal(false);

    }

    let allChannels = null;
    if(props.channels.length >= 0 ) {
       allChannels = (props.channels.map(channel => {
            return (
                <Menu.Item
                    key={channel.id}
                    onClick={() => {setCurrentChannel(channel)}}
                    name={channel.name}
                    active={props.currentChannel.id === channel.id}
                    style={{ opacity: 0.7}}
                >
                <p style={{ cursor: 'pointer' }}># {channel.name}</p>
                </Menu.Item>
            )
        }))
    }

    const setCurrentChannel = (channel) => {
        props.onSetCurrentChannel(channel);
    }

    return (
        <>
            <Menu.Menu style={{ paddingBotom: '2rem' }}>
                <Menu.Item>
                    <span>
                        <Icon name='exchange' /> CHANNELS
                    </span> {" "}
                    ({props.channels.length}) <Icon onClick={() => { setModal(true)}} name='add' style={{ cursor:'pointer'}} />
                </Menu.Item>
                {allChannels}
            </Menu.Menu>
             {/* Channels */}


             {/* Add Channel Modal */}

             <Modal basic open={modal} onClose={() => { setModal(false)}}>
                <Modal.Header>Add a Channel</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={formSubmitHandler}>
                        <Form.Field>
                            <Input
                                fluid
                                label='Name of Channel'
                                name='channelName'
                                onChange={inputChangeHandler}
                             />
                        </Form.Field>

                        <Form.Field>
                            <Input
                                fluid
                                label='About the Channel'
                                name='channelDetails'
                                onChange={inputChangeHandler}
                             />
                        </Form.Field>
                    </Form> 
                </Modal.Content>

                <Modal.Actions>
                    <Button color='green' inverted onClick={formSubmitHandler}>
                        <Icon name='checkmark' /> Add
                    </Button>
                    <Button color='red' inverted onClick={() => { setModal(false)}}>
                        <Icon name='remove' /> Cancel
                    </Button>
                </Modal.Actions>
             </Modal>
        </>        
    )
}

const mapStateToProps = state => {
    return {
        channels : state.channels.channels,
        currentChannel: state.channels.currentChannel
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        onSubmitChannel: (channel) => dispatch(actions.createChannel(channel)),
        onGetChannels: () => dispatch(actions.getChannels()),
        onSetCurrentChannel : (channel) => dispatch(actions.setCurrentChannel(channel))
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Channels);