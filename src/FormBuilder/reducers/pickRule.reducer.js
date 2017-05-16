'use strict'

import { setValidation } from '../actions/common.action';

var vcState = {};
var initialState = {
    section: {},
    question: {}
}

export default function textField(state = initialState, action) {

    state = deepClone(state);
    vcState = state;
    switch(action.type){

        case 'DATA_CHANGE_IN_PICK_RULE':
            state[action.payload.name] = action.payload.value;
            break;
    }
    return state;
}

var deepClone = function(data){
    return JSON.parse(JSON.stringify(data));
}
