import * as actionTypes from '../actions/actionTypes';

const initialState = {
    profiles: [],
    errors: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case actionTypes.GET_PROFILES_SUCCESS:
            return {
                ...state,
                profiles: [...state.profiles.concat(action.profiles)]
            }
        case actionTypes.GET_PROFILES_FAIL:
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