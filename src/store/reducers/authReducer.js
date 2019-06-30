import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    user: null,
    errors: null,
    token: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                user: action.user,
                loading: false
            }
        case actionTypes.LOGIN_SUCCESS:
        return {
            ...state,
            token: action.token,
            isAuthenticated: true,
            loading: false
        }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null
            }
        case actionTypes.AUTH_FAIL:
        return {
            ...state,
            errors: action.error,
            isAuthenticated: false,
            loading: false
        }

        default:
            return {
                ...state
            }
    }
}

export default reducer;