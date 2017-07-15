
import { deepClone } from '../actions/common.action';

var initialState = {
    section: {},
    question: {}
}

export default function textField(state = initialState, action) {


    switch (action.type) {

        case 'DATA_CHANGE_IN_PICK_RULE':
            state = deepClone(state);
            // to avoid copy questions;
            if (action.payload.name === 'section') {
                let section = deepClone(action.payload.value);
                delete section.child
                state['section'] = section;
            }
            else {
                state['question'] = optimizeQues(action.payload.value);
            }
            break;

        case 'SET_ACTIVE_QUESTION':
            state = deepClone(state);
            state = getRuleFromQuestion(action.payload.question.pickAndSuggestRuleClient);
            break;

        // reset actions    
        case 'CREATE_QUESTION':
            state = deepClone(initialState);
            break;

        case 'UPDATE_QUESTION':
            state = deepClone(initialState);
            break;    

        case 'FIELD_CONFIG_PANEL_SELECT':
            state = deepClone(initialState);
            break;

        case 'DELETE_PICK_RULE':
            state = deepClone(initialState);
            break;

        case 'CANCEL_FORM':
            state = deepClone(initialState);
            break;    
    }
    return state;
}

function optimizeQues(ques) {

    let ob = {
        questionId: ques.questionId,
        name: ques.name,
        caption: ques.caption,
        sectionId: ques.sectionId,
        fieldType: {
            fieldTypeName: ques.fieldType.fieldTypeName
        },
    }
    return ob;
}

function getRuleFromQuestion(rule) {
    return (rule === null) ? initialState : JSON.parse(rule);
}
