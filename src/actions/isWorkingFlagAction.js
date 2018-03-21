import * as types from './actionTypes';

export function isWorking(working){
    return {type: types.IS_WORKING, working}
}
