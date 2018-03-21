import * as types from './actionTypes';

export function startWork(time){
    return {type: types.START_WORK, time}
}
export function endWork(time){
    return {type: types.END_WORK, time}
}