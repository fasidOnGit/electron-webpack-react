import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function startReducer(state=initialState , action){
    switch (action.type) {
        case types.START_WORKING_SUCCESS:
            return   {...state , ...{timer:action.timer}};
        
        case types.IS_WORKING:
            return {...state, ...{working: action.working}};
        case types.LOAD_ALL_TIMER || types.SAVED_SELECTED_TIMER:
            return {...state, ...{start:action.timer.start, end:action.timer.end}};
        case types.START_WORK:
            return {...state ,...{start:action.time}};
        
        case types.END_WORK:
            return {...state ,...{end:action.time}};
        default:
            return state;
    }
};