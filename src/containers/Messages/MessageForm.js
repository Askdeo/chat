import React, { useState } from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import { Segment, Button, Input } from 'semantic-ui-react';
import './MessageForm.css';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import FileModal from './FileModal';

const MessageForm = (props) => {

    const [ message, setMessage ] = useState('')

    const formMessageHandler = (event) => {
        setMessage({
            [event.target.name] : event.target.value,
        })
    }

    const sendMessage = () => {
        props.onPostMessage({
            ...message,
            channelId: props.currentChannel.id
        });
    }

    const [ modal, setModal ] = useState(false)

    const modalHandler = () => {
        setModal(!modal);
    };

    const [ uploadState, setUploadState] = useState('');
    const [ uploadTast, setUploadTask ] = useState(null);

    // const uploadFile = (file, metaData) => {
    //     console.log(file, metaData);
    //     const pathToUpload = props.currentChannel.id;
    //     const filePath = `chat/public/${uuidv4}.jpg`;


    // }

    const uploadFile = (file) => {
        const formData = new FormData();
        formData.append('channelId', props.currentChannel.id);
        formData.append('image', file);
        console.log(formData);
        props.onPostMessage(formData);
    }

    return (
        <Segment className='messageForm'>
            <Input
                fluid
                name='content'
                onChange={formMessageHandler}
                style={{ marginBottom: '0.7rem'}}
                label={<Button icon={'add'} />}
                labelPosition='left'
                placeholder='write your message'
            />

            <Button.Group icon widths='2'>
                <Button
                    color='orange'
                    content='Send'
                    onClick={sendMessage}
                    labelPosition='left'
                    icon='edit'
                />
                <Button
                    color='teal'
                    content='Upload Media'
                    labelPosition='right'
                    icon='cloud upload'
                    onClick={modalHandler}
                 />
                 <FileModal
                    modal={modal}
                    closeModal={modalHandler}
                    uploadFile={uploadFile}
                   />
            </Button.Group>
        </Segment>
    )
}

const mapStateToProps = state => {
    return {
       currentChannel: state.channels.currentChannel
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        onPostMessage: (message) => dispatch(actions.createMessage(message)),
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
