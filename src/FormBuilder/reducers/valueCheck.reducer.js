import { deepClone } from '../actions/common.action';

var initialState = {
    operator: '==',
    argument: {
        section: null,
        question: null
    }
}

export default function textField(state = initialState, action) {


    switch (action.type) {

        case 'DATA_CHANGE_IN_VALUE_CHECK':
            state = deepClone(state);
            dataChange(state, action);

            break;

        case 'SAVE_VALUE_CHECK_OPERATOR':
            state = deepClone(state);
            state.operator = action.payload;
            break;

        // reset actions    
        case 'DELETE_VALUE_CHECK_RULE':
            state = deepClone(initialState);
            break;

        case 'CREATE_QUESTION':
            state = deepClone(initialState);
            break;

        case 'UPDATE_QUESTION':
            state = deepClone(initialState);
            break;    

        case 'SET_ACTIVE_QUESTION':
            state = deepClone(state);
            state = getRuleFromQuestion(action.payload.question.valueCheckRuleClient);
            break;

        case 'FIELD_CONFIG_PANEL_SELECT':
            state = deepClone(initialState);
            break;

        case 'CANCEL_FORM':
            state = deepClone(initialState);
            break;    
    }
    return state;
}

function dataChange(state, action) {
    
        let section = deepClone(action.payload.section);
        delete section.child;
        delete section.project;
        state.argument.section = section;
        state.argument.question = optimizeQues(action.payload.question);
    
}

function optimizeQues(ques) {

    console.log('value check ---->> ' + JSON.stringify(ques));
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
// this function is important. rules are set to empty string When user copy a question.
function getRuleFromQuestion(rule) {
    return (rule === null) ? initialState : JSON.parse(rule);
}