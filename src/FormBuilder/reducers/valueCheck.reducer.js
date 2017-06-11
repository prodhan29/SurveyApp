import { deepClone } from '../actions/common.action';

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

    
    switch(action.type){

        case 'DATA_CHANGE_IN_VALUE_CHECK':
            state = deepClone(state);
            if(action.payload.name === 'first_section' || action.payload.name ==='second_section') {
                let section = deepClone(action.payload.data);
                delete section.child;
            }
            state.argument[action.payload.name] = action.payload.data;
            break;

        case 'SAVE_VALUE_CHECK_OPERATOR':
            state = deepClone(state);
            state.operator = action.payload;
            break;

        // reset actions    
        case 'DELETE_VALUE_CHECK_RULE':
            state = JSON.parse(JSON.stringify(initialState));
            break;   

        case 'CREATE_QUESTION':
            state = JSON.parse(JSON.stringify(initialState));
            break;    

        case 'FIELD_CONFIG_PANEL_SELECT':
            state = JSON.parse(JSON.stringify(initialState));
            break;     
    }
    return state;
}
