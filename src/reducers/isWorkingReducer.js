import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function isWorkingReducer(state=initialState , action){
    switch (action.type) {
        case types.IS_WORKING:
            return   Object.assign({},...state , {working:action.working});
        default:
            return state;
    }
};