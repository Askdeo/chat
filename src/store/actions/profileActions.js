import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getProfilesSuccess = (profiles) => {
    return{
        type: actionTypes.GET_PROFILES_SUCCESS,
        profiles: profiles.data
    };
};

export const getProfilesFail = (error) => {
    return {
        type: actionTypes.GET_PROFILES_FAIL,
        error: error
    };
};

export const getProfiles = () => {
    return dispatch => {
        axios.get('http://localhost:5000/profiles')
            .then(profiles => {
                dispatch(getProfilesSuccess(profiles))
            })
            .catch(error => {
                console.log(error);
                dispatch(getProfilesFail(error))
            })
    }
};
