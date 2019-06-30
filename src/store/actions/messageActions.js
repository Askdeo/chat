import * as actionTypes from './actionTypes';
import axios from 'axios';





export const createMessageSuccess = (message) => {
    console.log(message);
    return{
        type: actionTypes.CREATE_MESSAGE_SUCCESS,
        message: message.data
    };
};

export const createMessageFail = (error) => {
    return {
        type: actionTypes.CREATE_MESSAGE_FAIL,
        error: error
    };
};



export const createMessage = (message) => {
    return dispatch => {
        axios.post('http://localhost:5000/message', message)
        .then(response => {
            dispatch(createMessageSuccess(response));
        })
        
        .catch(error => {
            console.log(error);
            dispatch(createMessageFail(error));
        });
    };
};



export const getMessagesSuccess = (messages) => {
    return{
        type: actionTypes.GET_MESSAGES_SUCCESS,
        messages: messages.data
    };
};

export const getMessagesFail = (error) => {
    return {
        type: actionTypes.GET_MESSAGES_FAIL,
        error: error
    };
};

export const getMessages = () => {
    return dispatch => {
        axios.get('http://localhost:5000/messages')
            .then(messages => {
                dispatch(getMessagesSuccess(messages))
            })
            .catch(error => {
                console.log(error);
                dispatch(getMessagesFail(error))
            })
    }
};
