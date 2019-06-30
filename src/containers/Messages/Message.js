import React, { useState, useEffect } from 'react';
import { Comment, Image } from 'semantic-ui-react';
import  './Message.css';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

const Message = (props) => {
    const [profiles, setProfiles] = useState(props.profiles)
    const [ message , setMessage ] = useState(props.message)

       
       let profile =  profiles.find(profile => {
            return profile.id === message.profileId
        })
    

    useEffect(() => {
        console.log(profile)
    }, [props.profiles])

    const isImage = (message) => {
        return message.hasOwnProperty('imageUrl') && message.content === null;
    }
    console.log(isImage(props.message));
    return (
        <Comment >
            <Comment.Avatar src='http://localhost:5000/images/dummy-avatar-300x300.jpg' />
            <Comment.Content >
                <Comment.Author as='a'>{profile ? profile.username : null}</Comment.Author>
                <Comment.Metadata>{props.message.createdAt}</Comment.Metadata>
                {isImage(props.message) ? <Image src={'http://localhost:5000/' + message.imageUrl} className={'message__image'} /> :
                <Comment.Text>{props.message.content}</Comment.Text>
                }
            </Comment.Content>
        </Comment>
    )
}

const mapStateToProps = state => {
    return {
        profiles: state.profiles.profiles
    }
  }

//   const mapDispatchToProps = dispatch => {
//     return {

//     }
//   }
  
  
  export default connect(mapStateToProps, null)(Message);