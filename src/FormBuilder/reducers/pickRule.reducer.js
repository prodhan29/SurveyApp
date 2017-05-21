
import { deepClone } from '../actions/common.action';

var initialState = {
    section: {},
    question: {}
}

export default function textField(state = initialState, action) {

    
    switch(action.type){

        case 'DATA_CHANGE_IN_PICK_RULE':
            state = deepClone(state);
            // to avoid copy questions;
            if(action.payload.name === 'section') {
                var value = {
                    sectionId: action.payload.value.sectionId,
                    name: action.payload.value.name,
                    description: action.payload.value.description,
                    repetitive: action.payload.value.repetitive,
                };
                state['section'] = value;
            }
            else {
                state['question'] = action.payload.value;
            }
            break;

         // reset actions    
         case 'CREATE_QUESTION':
            state = JSON.parse(JSON.stringify(initialState));
            break;   

         case 'FIELD_CONFIG_PANEL_SELECT':
            state = JSON.parse(JSON.stringify(initialState));
            break;   
    }
    return state;
}
