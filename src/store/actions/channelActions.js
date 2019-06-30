import * as actionTypes from './actionTypes';
import axios from 'axios';





export const createChannelSuccess = (channel) => {
    console.log(channel);
    return{
        type: actionTypes.CREATE_CHANNEL_SUCCESS,
        channel: channel.data
    };
};

export const createChannelFail = (error) => {
    return {
        type: actionTypes.CREATE_CHANNEL_FAIL,
        error: error
    };
};



export const createChannel = (channel) => {
    return dispatch => {
        axios.post('http://localhost:5000/channel', channel)
        .then(response => {
            dispatch(createChannelSuccess(response));
        })
        
        .catch(error => {
            console.log(error);
            dispatch(createChannelFail(error));
        });
    };
};



export const getChannelsSuccess = (channels) => {
    return{
        type: actionTypes.GET_CHANNELS_SUCCESS,
        channels: channels.data
    };
};

export const getChannelsFail = (error) => {
    return {
        type: actionTypes.GET_CHANNELS_FAIL,
        error: error
    };
};

export const getChannels = () => {
    return dispatch => {
        axios.get('http://localhost:5000/channels')
            .then(channels => {
                dispatch(getChannelsSuccess(channels))
            })
            .catch(error => {
                dispatch(getChannelsFail(error))
            })
    }
};

export const setCurrentChannel = (channel) => {
    return {
        type: actionTypes.SET_CURRENT_CHANNEL,
        currentChannel: channel
    }

}