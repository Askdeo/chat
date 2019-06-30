import * as actionTypes from '../actions/actionTypes';

const initialState = {
    channels: [],
    currentChannel: '',
    errors: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_CHANNEL_SUCCESS:
            return {
                ...state,
                channels: [...state.channels.concat(action.channel)]
            }
        case actionTypes.CREATE_CHANNEL_FAIL:
            return {
                ...state,
                errors: action.error
            }
        case actionTypes.GET_CHANNELS_SUCCESS:
            return {
                ...state,
                channels: [...state.channels.concat(action.channels)],
                currentChannel: action.channels[0]
            }
        case actionTypes.GET_CHANNELS_FAIL:
            return {
                ...state,
                errors: action.error
            }
        case actionTypes.SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.currentChannel
            }
            
        default:
            return {
                ...state
            }
    }
}

export default reducer;