import * as actionTypes from '../actions/actionTypes';

const initialState = {
    messages: [],
    errors: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: [...state.messages.concat(action.message)]
            }
        case actionTypes.CREATE_MESSAGE_FAIL:
            return {
                ...state,
                errors: action.error
            }
        case actionTypes.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: [...state.messages.concat(action.messages)]
            }
        case actionTypes.GET_MESSAGES_FAIL:
            return {
                ...state,
                errors: action.error
            }

        default:
            return {
                ...state
            }
    }
}

export default reducer;