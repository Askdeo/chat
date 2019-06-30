import React, { useEffect, useState } from 'react'
import './Messages.css';
import { Segment, Comment } from 'semantic-ui-react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import Message from './Message';





const Messages = (props) => {

    const [reduxMessages, setMessages] = useState(props.messages)
    const getMessagesHandler = () => {
        props.onGetMessages()
    }

    useEffect(() => {
        getMessagesHandler()
    }, [reduxMessages]);

    let messages;

    if(props.messages) {
        messages = (
            props.messages.map(message => {
                if(message.channelId === props.currentChannel.id) {
                    return ( 
                        <Message
                          key={message.id}
                          message={message}
                         />  
                      )
                }
            })
        )
    }
    return (
        <>
            <MessagesHeader />
            <Segment>
                <Comment.Group className='messages'>
                    {messages}
                </Comment.Group>
            </Segment>
            <MessageForm />
        </>
    )
}

const mapStateToProps = state => {
    return {
        messages : state.messages.messages,
        currentChannel: state.channels.currentChannel
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        onGetMessages: () => dispatch(actions.getMessages()),
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Messages);