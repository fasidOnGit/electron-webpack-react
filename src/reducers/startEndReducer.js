import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function startEndReducer(state=initialState , action){
    switch (action.type) {
        case types.START_WORK:
        console.log(action)
            return   Object.assign({},...state , {start:action.time});
        
        case types.END_WORK:
            return [...state , Object.assign({}, {end:action.time})];
        default:
            return state;
    }
};