import { deepClone } from '../actions/common.action';

var vcState = {};
var initialState = {
    operator: '...',
    argument: {
        first_section: {},
        first_question: {},
        second_section: {},
        second_question: {}
    }
}

export default function textField(state = initialState, action) {

    state = deepClone(state);
    vcState = state;
    switch(action.type){

        case 'DATA_CHANGE_IN_VALUE_CHECK':
            console.log(action);
            state.argument[action.payload.name] = action.payload.data;
            break;

        case 'SAVE_VALUE_CHECK_OPERATOR':
            state.operator = action.payload;
            break;
    }
    return state;
}
