
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
                let section = deepClone(action.payload.value);
                delete section.child
                state['section'] = section;
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

         case 'DELETE_PICK_RULE':
            state = JSON.parse(JSON.stringify(initialState));
            break;      
    }
    return state;
}
