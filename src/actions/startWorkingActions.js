import * as types from './actionTypes';
import StoreApi from '../api/mockTimerApi';

export function startWorking(timer){
    return { type: types.START_WORKING_SUCCESS, timer}
}
export function isWorking(working){
    return {type: types.IS_WORKING, working}
}
export function loadTimerSuccess(timer){
    return {type: types.LOAD_ALL_TIMER, timer};
}
export function savedTimerSuccess(timer){
    return {type: types.SAVED_SELECTED_TIMER, timer};
}

export function loadTimer(){
    return function(dispatch){
        StoreApi.getAllDate().then(data =>{
            dispatch(loadTimerSuccess(data));
        }).catch(err =>{
            throw(err);
        })
    }
}

export function saveTimer(flag, time){
    return function(dispatch){
        StoreApi.saveTime(flag , time).then(data =>{
            dispatch(savedTimerSuccess(data));
        }).catch(err => {
            throw(err);
        })
    }
}

export function startWork(time){
    return {type: types.START_WORK, time}
}
export function endWork(time){
    return {type: types.END_WORK, time}
}